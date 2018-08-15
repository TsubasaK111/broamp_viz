import { loadFile, AudioSource } from "./utils";
import VerticalFrequencyVis from "./verticalFrequencyVis";
import DynamicSpectrogram from "./dynamicSpectrogram";
// import gkheadCanvas from "./gkheadCanvas";

import './audio/Odesza-Above_The_Middle.mp3';
import './style.css';
import './pong.svg';

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById('audioElement');
  audioElement.src = "./audio/Odesza-Above_The_Middle.mp3";

  const audioSource = new AudioSource();
  new VerticalFrequencyVis(audioSource.analyser);
  new DynamicSpectrogram(audioSource, audioElement);
  // gkheadCanvas();
});

document
  .getElementById('fileInput')
  .addEventListener('change', loadFile);