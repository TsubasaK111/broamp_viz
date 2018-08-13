import bigNerdRanchVis from "./bigNerdRanchVis";
import sampleGraph from "./sampleGraph";
import salesGraph from "./salesGraph";
import loadFile from "./loadFile";

document.addEventListener("DOMContentLoaded", () => {
  bigNerdRanchVis();
  sampleGraph();
  salesGraph();
});

document.getElementById('fileInput').addEventListener('change', loadFile);