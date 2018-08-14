import chroma from "chroma-js";
import * as d3 from "d3";

class DynamicSpectrogram {
  constructor(audioSource, audioElement, options = {}) {
    this.audioElement = audioElement;
    this.audioContext = audioSource.context;
    this.analyser = audioSource.analyser;
    this.height = options.height || '500';
    this.width = options.width || '500';

    // get the context from the canvas to draw on
    this.d3Canvas = d3.select('#spectrogramVis')
      .append('canvas')
      .attr("id", "spectrogramCanvas")
      .attr('width', this.width)
      .attr('height', this.height);

    this.canvasContext = this.d3Canvas.node().getContext("2d");

    // create a temp canvas that we will use for copying
    this.tempCanvas = document.createElement("canvas");
    this.tempContext = this.tempCanvas.getContext("2d");
    this.tempCanvas.width = this.width;
    this.tempCanvas.height = this.height;

    // used for color distribution
    this.chromaScale = new chroma
      .scale(['#000000', '#ff0000', '#ffff00', '#ffffff'])
      .domain([0, 300])
      .mode('rgb');

    this.setupAudioProcessor();

    this.analyser.connect(this.audioProcessor);

    this.loadSound(this.audioElement.src);
  }

  setupAudioProcessor() {
    // setup a javascript node
    this.audioProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    this.audioProcessor.connect(this.audioContext.destination);

    // when javascript node is called, 
    // use information from analyzer node to draw volume
    this.audioProcessor.onaudioprocess = () => {
      // get the average for the first channel
      const array = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(array);

      // draw the spectrogram
      if (this.audioElement.playbackState == this.audioElement.PLAYING_STATE) {
        this.drawSpectrogram(array);
      }
    }
  }
  // load the specified sound
  loadSound(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = () => {
      // decode the data
      this.audioContext.decodeAudioData(request.response, (buffer) => {
        // TODO: when the audio is decoded play the sound
      }, (error) => console.log(error));
    }

    request.send();
  }

  drawSpectrogram(array) {
    // copy the current canvas onto the temp canvas
    const canvas = document.getElementById("spectrogramCanvas");

    this.tempContext.drawImage(canvas, 0, 0, this.width, this.height);

    array.forEach((value, i) => {
      // draw each pixel with the specific color
      this.canvasContext.fillStyle = this.chromaScale(value);
      // draw the line at the right side of the canvas
      this.canvasContext.fillRect(this.width - 1, this.height - i, 1, 1);
    });

    // set translate on the canvas
    this.canvasContext.translate(-1, 0);
    // draw the copied image
    this.canvasContext.drawImage(this.tempCanvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    // reset the transformation matrix
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default DynamicSpectrogram;