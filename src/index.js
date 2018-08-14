import { loadFile, AudioSource } from "./utils";
import bigNerdRanchVis from "./bigNerdRanchVis";
import modSpectrogram from "./modSpectrogram";

import './audio/Odesza-Above_The_Middle.mp3';

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById('audioElement');
  audioElement.src = "./audio/Odesza-Above_The_Middle.mp3";

  const audioSource = new AudioSource();
  bigNerdRanchVis(audioSource.analyser);
  modSpectrogram(audioSource, audioElement);
});

document
  .getElementById('fileInput')
  .addEventListener('change', loadFile);