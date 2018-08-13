
// not used in this file and is referenced in index.html, but we need this to have webpack pack the audio file.
import './audio/Odesza-Above_The_Middle.mp3';

const bigNerdRanchVis = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById('audioElement');
  const audioSrc = audioContext.createMediaElementSource(audioElement);
  const analyser = audioContext.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioContext.destination);

  // initialize D3 chart space.
  const svgHeight = '300';
  const svgWidth = '1200';
  const barPadding = '1';
  const svg = d3.select('#bigNerdRanchVis')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

  // const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  const frequencyData = new Uint8Array(200);

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
      .attr('fill', (d) => 'rgb(0, 0, ' + d + ')');
  }

  // Run the loop
  renderChart();
};

export default bigNerdRanchVis;