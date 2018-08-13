import * as d3 from "d3";

export const getAudioAnalyzer = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById('audioElement');
  const audioSrc = audioContext.createMediaElementSource(audioElement);
  const analyser = audioContext.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(audioContext.destination);
  audioSrc.connect(analyser);
  return analyser;
}

export const timeSpectrogram = (analyser) => {

  analyser.smoothingTimeConstant = 0;
  analyser.fftSize = 1024;

  // initialize D3 chart space.
  const svgHeight = '200';
  const svgWidth = '600';
  const barPadding = '0';
  const svg = d3.select('#timeSpectrogram')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

  const frequencyData = new Uint8Array(600);
  // const frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Create our initial D3 chart.
  svg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (svgWidth / frequencyData.length))
    .attr('width', (svgWidth / frequencyData.length) - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg.selectAll('rect')
      .data(frequencyData)
      .attr('y', (d) => svgHeight - d)
      .attr('height', (d) => d)
      .attr('fill', (d) => `rgb(${d*0.5},0,0)`);
  }

  // Run loop
  renderChart();
};

// export default timeSpectrogram;