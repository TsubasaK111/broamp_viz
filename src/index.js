// not used in this file and is referenced in index.html, but we need this to have webpack pack the audio file.
import './audio/Odesza-Above_The_Middle.mp3';

import bigNerdRanchVis from "./bigNerdRanchVis";
import { timeSpectrogram } from "./timeSpectrogram";
import { getAudioAnalyzer } from "./timeSpectrogram";

import sampleGraph from "./sampleGraph";
import salesGraph from "./salesGraph";
import loadFile from "./loadFile";

document.addEventListener("DOMContentLoaded", () => {
  const analyzer = getAudioAnalyzer();
  bigNerdRanchVis(analyzer);
  sampleGraph();
  // salesGraph();
  timeSpectrogram(analyzer);
});

document.getElementById('fileInput').addEventListener('change', loadFile);