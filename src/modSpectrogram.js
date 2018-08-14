
const modSpectrogram = (audioMachine, audioElement) => {
  const context = audioMachine.context;
  const analyser = audioMachine.analyser;

  let javascriptNode;

  // get the context from the canvas to draw on
  const canvasContext = $("#modCanvas").get()[0].getContext("2d");

  // create a temp canvas we use for copying
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = 800;
  tempCanvas.height = 512;

  // used for color distribution
  const hot = new chroma
    .scale(['#000000', '#ff0000', '#ffff00', '#ffffff'])
    .domain([0, 300])
    .mode('rgb')

  // load the sound
  setupAudioNodes();

  loadSound(audioElement.src);

  function setupAudioNodes() {
    // setup a javascript node
    javascriptNode = context.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    javascriptNode.connect(context.destination);
    // setup a analyzer
    analyser.connect(javascriptNode);
  }

  const onError = (e) => { console.log(e) };

  // load the specified sound
  function loadSound(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = () => {
      // decode the data
      context.decodeAudioData(request.response, (buffer) => {
        // TODO: when the audio is decoded play the sound
      }, onError);
    }

    request.send();
  }

  // when the javascript node is called
  // we use information from the analyzer node
  // to draw the volume
  javascriptNode.onaudioprocess = () => {
    // get the average for the first channel
    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    // draw the spectrogram
    if (audioElement.playbackState == audioElement.PLAYING_STATE) {
      drawSpectrogram(array);
    }
  }

  function drawSpectrogram(array) {
    // copy the current canvas onto the temp canvas
    const canvas = document.getElementById("modCanvas");

    tempCtx.drawImage(canvas, 0, 0, 800, 512);

    array.forEach((value, i) => {
      // draw each pixel with the specific color
      canvasContext.fillStyle = hot(value);
      // draw the line at the right side of the canvas
      canvasContext.fillRect(800 - 1, 512 - i, 1, 1);
    });

    // set translate on the canvas
    canvasContext.translate(-1, 0);
    // draw the copied image
    canvasContext.drawImage(tempCanvas, 0, 0, 800, 512, 0, 0, 800, 512);
    // reset the transformation matrix
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default modSpectrogram;