import * as d3 from "d3";

class BigNerdRanchVis {
  constructor(analyser) {
    // initialize D3 chart space.
    this.svgHeight = '200';
    this.svgWidth = '600';
    this.barPadding = '1';
    this.analyser = analyser;

    this.svg = d3.select('#bigNerdRanchVis')
      .append('svg')
      .attr('height', this.svgHeight)
      .attr('width', this.svgWidth);

    // this.frequencyData = new Uint8Array(analyser.frequencyBinCount);
    this.frequencyData = new Uint8Array(100);
    
    // Create our initial D3 chart.
    this.svg.selectAll('rect')
      .data(this.frequencyData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (this.svgWidth / this.frequencyData.length))
      .attr('width', (this.svgWidth / this.frequencyData.length) - this.barPadding);

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
      .attr('y', (d) => this.svgHeight - d)
      .attr('height', (d) => d)
      .attr('fill', (d) => `rgb(${d * 0.5},0,0)`);
  }
};

export default BigNerdRanchVis;