let currentFrame = 0;
let playInterval = null;
let intervalSpeed = 300;
let currentFrames = typeof alternateFrames !== "undefined" ? alternateFrames : []; // Default to alternateFrames

function showFrame() {
  document.getElementById("frame").innerHTML = currentFrames[currentFrame];
  if (window.MathJax) {
    MathJax.typeset();
  }
}

function startPlaying() {
  playInterval = setInterval(function () {
    currentFrame = (currentFrame + 1) % currentFrames.length;
    showFrame();
  }, intervalSpeed);
}

function stopPlaying() {
  clearInterval(playInterval);
  playInterval = null;
}

document.addEventListener("DOMContentLoaded", function () {
  showFrame();

  document.getElementById("playBtn").addEventListener("click", function () {
    if (playInterval) {
      stopPlaying();
      this.textContent = "Play";
    } else {
      this.textContent = "Pause";
      startPlaying();
    }
  });

  document.getElementById("resetBtn").addEventListener("click", function () {
    currentFrame = 0;
    showFrame();
  });

  document.getElementById("leftBtn").addEventListener("click", function () {
    currentFrame =
      (currentFrame - 1 + currentFrames.length) % currentFrames.length;
    showFrame();
  });

  document.getElementById("rightBtn").addEventListener("click", function () {
    currentFrame = (currentFrame + 1) % currentFrames.length;
    showFrame();
  });

  document
    .getElementById("intervalInput")
    .addEventListener("change", function () {
      intervalSpeed = Math.max(50, Number(this.value));
      if (playInterval) {
        stopPlaying();
        document.getElementById("playBtn").textContent = "Play";
      }
    });

  document
    .getElementById("shortenedBtn")
    .addEventListener("click", function () {
      currentFrame = 0;
      if (typeof alternateFrames !== "undefined") {
        currentFrames = alternateFrames;
        showFrame();
      }
    });

  document
    .getElementById("originalBtn")
    .addEventListener("click", function () {
      currentFrame = 0;
      currentFrames = frames;
      showFrame();
    });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    currentFrame = (currentFrame + 1) % currentFrames.length;
    showFrame();
  } else if (e.key === "ArrowLeft") {
    currentFrame =
      (currentFrame - 1 + currentFrames.length) % currentFrames.length;
    showFrame();
  }
});
