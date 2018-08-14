import chroma from "chroma-js";
import * as d3 from "d3";

class VerticalFrequencyVis {
  constructor(analyser, options = {}) {
    // initialize D3 chart space.
    this.analyser = analyser;
    this.height = options.height || '500';
    this.width = options.width || '200';
    this.barPadding = options.barPadding || '1';
    this.bars = options.bars || 100 || analyser.frequencyBinCount;

    this.svg = d3.select('#verticalFrequencyVis')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    // declare number of bars
    this.frequencyData = new Uint8Array(this.bars);

    // used for color distribution
    this.chromaScale = new chroma
      .scale(['#000000', '#ff0000', '#ffff00', '#ffffff'])
      .domain([0, 300])
      .mode('rgb');

    // create initial D3 chart.
    this.svg.selectAll('rect')
      .data(this.frequencyData)
      .enter()
      .append('rect')
      .attr('y', (d, i) => i * (this.height / this.frequencyData.length))
      .attr('height', (this.height / this.frequencyData.length) - this.barPadding);

    //since renderChart is a recursive class method, make static reference to class;
    this.renderChart = this.renderChart.bind(this);
    // Run loop
    this.renderChart();
  }

  renderChart() {
    // Continuously loop and update chart with frequency data.
    window.requestAnimationFrame(this.renderChart);

    // Copy frequency data to this.frequencyData array.
    this.analyser.getByteFrequencyData(this.frequencyData);

    // Update d3 chart with new data.
    this.svg.selectAll('rect')
      .data(this.frequencyData)
      .attr('x', (d) => this.width - d)
      .attr('width', (d) => d)
      .attr('fill', (d) => this.chromaScale(d));
  }
};

export default VerticalFrequencyVis;