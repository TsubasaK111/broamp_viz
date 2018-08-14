import * as d3 from "d3";

const bigNerdRanchVis = (analyser) => {
  // initialize D3 chart space.
  const svgHeight = '200';
  const svgWidth = '600';
  const barPadding = '1';
  const svg = d3.select('#bigNerdRanchVis')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

  // const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  const frequencyData = new Uint8Array(100);

  // Create our initial D3 chart.
  svg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (svgWidth / frequencyData.length))
    .attr('width', (svgWidth / frequencyData.length) - barPadding);

  // Continuously loop and update chart with frequency data.
  const renderChart = () => {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg.selectAll('rect')
      .data(frequencyData)
      .attr('y', (d) => svgHeight - d)
      .attr('height', (d) => d)
      .attr('fill', (d) => `rgb(${d * 0.5},0,0)`);
  }

  // Run loop
  renderChart();
};

export default bigNerdRanchVis;