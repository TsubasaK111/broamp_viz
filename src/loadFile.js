const loadFile = (event) => {
  const audioFile = event.target.files[0];

  if (!audioFile) throw Error("no file chosen");

  const audioEl = document.getElementById("audioElement");

  // listen for event
  const fr = new FileReader();
  fr.onload = (event) => { audioEl.src = event.target.result; };

  // trigger event
  fr.readAsDataURL(audioFile);

  console.log(document.getElementById("audioElement").src);
}

export default loadFile;