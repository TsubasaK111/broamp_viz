const togglePlay = (event) => {
  const buttonEl = event.target;
  console.log(buttonEl.text);
  const audioEl = document.getElementById("audioElement");
  audioEl.controls = true;
  if (audioEl.paused) {
    buttonEl.textContent = "⏸";
    audioEl.play()
  } else {
    buttonEl.textContent = "▶️";
    audioEl.pause();
  }
};

export default togglePlay;