import { loadFile, AudioSource } from "./utils";
import VerticalFrequencyVis from "./VerticalFrequencyVis";

import modSpectrogram from "./modSpectrogram";
import './audio/Odesza-Above_The_Middle.mp3';
import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById('audioElement');
  audioElement.src = "./audio/Odesza-Above_The_Middle.mp3";

  const audioSource = new AudioSource();
  // new BigNerdRanchVis(audioSource.analyser);
  new VerticalFrequencyVis(audioSource.analyser);

  modSpectrogram(audioSource, audioElement);
});

document
  .getElementById('fileInput')
  .addEventListener('change', loadFile);