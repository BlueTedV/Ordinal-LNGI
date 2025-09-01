let currentFrame = 0;
let playInterval = null;

function showFrame() {
  document.getElementById("frame").innerHTML = frames[currentFrame];
  if (window.MathJax) {
    MathJax.typeset();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showFrame();

  document.getElementById("playBtn").addEventListener("click", function () {
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
      this.textContent = "Play";
    } else {
      this.textContent = "Pause";
      playInterval = setInterval(function () {
        currentFrame = (currentFrame + 1) % frames.length;
        showFrame();
      }, 300);
    }
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    currentFrame = (currentFrame + 1) % frames.length;
    showFrame();
  } else if (e.key === "ArrowLeft") {
    currentFrame = (currentFrame - 1 + frames.length) % frames.length;
    showFrame();
  }
});
