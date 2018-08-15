import AudioSource from "./utils/audioSource";
import loadFile from "./utils/loadFile";
import togglePlay from "./utils/togglePlay";

import VerticalFrequencyVis from "./verticalFrequencyVis";
import DynamicSpectrogram from "./dynamicSpectrogram";
// import gkheadCanvas from "./gkheadCanvas";

import './audio/Odesza-Above_The_Middle.mp3';
import './style.css';
import './pong.svg';

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById('audioElement');
  audioElement.src = "./audio/Odesza-Above_The_Middle.mp3";
  audioElement.controls = true;
  audioElement.volume = 0.7; //don't destroy your speakers bro

  const audioSource = new AudioSource();
  new VerticalFrequencyVis(audioSource.analyser);
  new DynamicSpectrogram(audioSource, audioElement);
  // gkheadCanvas();
});

document
  .getElementById('fileInput')
  .addEventListener('change', loadFile);

// document
//   .getElementById('togglePlayButton')
//   .addEventListener('click', togglePlay);