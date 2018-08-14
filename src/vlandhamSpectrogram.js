import * as d3 from "d3";

class Spectrogram {
  constructor(filename, selector, analyser, contextSampleRate, options = {}) {
    this.selector = selector;
    this.filename = filename;
    this.options = options;
    this.contextSampleRate = contextSampleRate;

    this.sampleSize = options.sampleSize || 512;
    this.decRange = [-80.0, 80.0];

    this.width = options.width || 900;
    this.height = options.height || 440;
    this.margin = options.margin || {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };

    this.colorScheme = options.colorScheme || ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'];

    this.zoomScale = 1;

    this.analyser = analyser;
    // this.analyser = this.context.createAnalyser();

    // Create a ScriptProcessorNode with a bufferSize of this.sampleSize and a single input and output channel
    // this.scriptNode = this.context.createScriptProcessor(this.sampleSize, 1, 1);

    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.data = [];

    this.isPlaying = false;
    this.isLoaded = false;
    this.startTime = 0;
    // this.startOffset = 0;
    this.count = 0;
    this.curSec = 0;
    this.maxCount = 0;
  }

  getBinFrequency(index) {
    const nyquist = this.contextSampleRate / 2;
    const freq = index / this.freqs.length * nyquist;
    return freq;
  }


  setupVisual() {

    // const contextSampleRate = this.context.sampleRate;

    console.log(`sampleRate`, this.contextSampleRate);

    // can configure these from the options
    this.timeRange = [0, this.buffer.duration];
    var maxFrequency = this.options.maxFrequency || this.getBinFrequency(this.analyser.frequencyBinCount / 2);
    var minFrequency = this.options.minFrequency || this.getBinFrequency(0);
    this.freqRange = [minFrequency, maxFrequency];

    this.svg = d3.select(this.selector).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.canvas = d3.select(this.selector).append("canvas")
      .attr("class", "vis_canvas")
      .attr("width", this.width + this.margin.left)
      .attr("height", this.height + this.margin.top)
      .style("padding", d3.map(this.margin).values().join("px ") + "px");

    this.progressLine = this.svg.append("line");

    var that = this;
    var button_id = this.selector + "_button";
    this.button = d3.select(this.selector).append("button")
      .style("margin-top", this.height + this.margin.top + this.margin.bottom + 20 + "px")
      .attr("id", button_id)
      .text("analyze")
      .on("click", function () {
        that.togglePlayback();
      });

    var freqs = [];
    for (i = 64; i < this.analyser.frequencyBinCount; i += 64) {
      freqs.push(d3.round(this.getBinFrequency(i), 4));
    }

    this.freqSelect = d3.select(this.selector).append("select")
      .style("margin-top", this.height + this.margin.top + this.margin.bottom + 20 + "px")
      .style("margin-left", "20px")
      .on("change", function () {
        var newFreq = this.options[this.selectedIndex].value
        console.log(newFreq);
        that.yScale.domain([0, newFreq]);
        that.draw();
      });

    this.freqSelect.selectAll('option')
      .data(freqs).enter()
      .append("option")
      .attr("value", function (d) { return d; })
      .attr("selected", function (d, i) { return (d == 11047) ? "selected" : null; })
      .text(function (d) { return d3.round(d / 1000) + "k"; });

    this.maxCount = (this.contextSampleRate / this.sampleSize) * this.buffer.duration;

    this.xScale = d3.scale.linear()
      .domain(this.timeRange)
      .range([0, this.width]);

    this.yScale = d3.scale.linear()
      .domain(this.freqRange)
      .range([this.height, 0]);

    this.zScale = d3.scale.linear()
      .domain(this.decRange)
      .range(["white", "black"])
      .interpolate(d3.interpolateLab);

    var commasFormatter = d3.format(",.1f");
    this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom")
      .tickSize(-this.height - 15)
      .tickPadding(10)
      .tickFormat(function (d) { return commasFormatter(d) + "s"; });

    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left")
      .tickSize(-this.width - 10, 0, 0)
      .tickPadding(10)
      .tickFormat(function (d) { return d3.round(d / 1000, 0) + "k"; });

    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (this.height + 10) + ")")
      .call(this.xAxis);

    this.svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (-10) + ",0)")
      .call(this.yAxis)
  }
}

export default Spectrogram;