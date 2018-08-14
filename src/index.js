// not used in this file and is referenced in index.html, but we need this to have webpack pack the audio file.
import './audio/Odesza-Above_The_Middle.mp3';

import { loadFile, AudioSource } from "./utils";

import bigNerdRanchVis from "./bigNerdRanchVis";
import modSpectrogram from "./modSpectrogram";
import dirksenSpectrogram from "./dirksenSpectrogram";

// import Spectrogram from "./vlandhamSpectrogram";

document.addEventListener("DOMContentLoaded", () => {

  const audioElement = document.getElementById('audioElement');
  const audioMachine = new AudioSource();
  bigNerdRanchVis(audioMachine.analyser);
  modSpectrogram(audioMachine, audioElement);

  // dirksenSpectrogram();

  // const vlandhamSpectrogram = new Spectrogram(
  //   "./audio/Odesza-Above_The_Middle.mp3",
  //   "#vlandHamSpectrogram",
  //   audioMachine.analyser,
  //   audioMachine.context.sampleRate
  // );
  // vlandhamSpectrogram.setupVisual();
});

document.getElementById('fileInput').addEventListener('change', loadFile);