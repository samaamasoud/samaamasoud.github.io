const album = document.querySelectorAll(".list");
console.log(album);

const audioPlayer = document.querySelector(".audio-track");
console.log(audioPlayer);

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

const nextButton = document.querySelector("#next-button");
const nextImg = document.querySelector("#next-img");

const prevButton = document.querySelector("#previous-button");
const prevImg = document.querySelector("#previous-img");

const trackName = document.querySelector(".song-name");

const albumName = document.querySelector(".albumname");

// song titles

let currentTrack = 0;
highlightTrack();
// so that by default the first track on the tracklist is highlighted
audioPlayer.src = album[currentTrack].dataset.src;

console.log(album[0].dataset.src);

function setTrack(index) {
  currentTrack = index;

  audioPlayer.src = album[currentTrack].dataset.src;
  audioPlayer.play();

  // UI sync (ALL in one place)
  highlightTrack();
  trackName.textContent = album[currentTrack].dataset.name;
  progress.style.width = "0%";
  // to make tracklist highlight and the song name change automatically as the songs change
}
// let trackIndex = 0;
// loadTrack(tracks[trackIndex])
// // updating song title and tracklist highlight
// function loadTrack (track) {
//   trackName.innerText = track
//   audioPlayer.src = '${track}.mp3'
// }

album.forEach((track, index) => {
  track.addEventListener("click", () => {
    setTrack(index);
    //  currentTrack = index;
    // audioPlayer.src = track.dataset.src;
    // audioPlayer.play();
    // highlightTrack();
    // trackName.textContent = track.dataset.name;
    // console.log(track.dataset.src);
  });
});

playPauseButton.addEventListener("click", toggleMusic);
function toggleMusic() {
  if (audioPlayer.paused === true || audioPlayer.ended === true) {
    audioPlayer.play();
    playPauseImg.src = "pause-icon.png";
  } else {
    audioPlayer.pause();
    playPauseImg.src = "play-icon.png";
  }
}
audioPlayer.addEventListener("play", toggleIcon);
audioPlayer.addEventListener("pause", toggleIcon);
audioPlayer.addEventListener("ended", toggleIcon);
function toggleIcon() {
  if (audioPlayer.paused) {
    playPauseImg.src = "play-icon.png";
  } else {
    playPauseImg.src = "pause-icon.png";
  }
}
// switching between song automatically

audioPlayer.addEventListener("ended", () => {
  let next = currentTrack + 1;

  if (next >= album.length) {
    next = 0;
  }

  setTrack(next);
});

const vinyl = document.querySelector(".vinyl-album");

audioPlayer.addEventListener("play", () => {
  vinyl.classList.add("play"); //start spinning
});
audioPlayer.addEventListener("pause", () => {
  vinyl.classList.remove("play");
});

nextButton.addEventListener("click", () => {
  let next = currentTrack + 1;

  if (next >= album.length) {
    next = 0;
  }

  setTrack(next);
});

prevButton.addEventListener("click", () => {
  let prev = currentTrack - 1;

  if (prev < 0) {
    prev = album.length - 1;
  }

  setTrack(prev);
});

function highlightTrack() {
  album.forEach((track) => track.classList.remove("active"));

  album[currentTrack].classList.add("active");
}
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const current = document.querySelector("#current");
const duration = document.querySelector("#duration");

//getting the time converted from seconds to minutes
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (seconds < 10) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
}

// setting up a real time update of current time
audioPlayer.addEventListener("timeupdate", () => {
  current.textContent = formatTime(audioPlayer.currentTime);
});

// song total duration
audioPlayer.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audioPlayer.duration);
});

// progress bar
audioPlayer.addEventListener("timeupdate", () => {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = percent + "%";
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;

  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
});

const lyricsTrackIndex = 3;

const lyricsSegments = [
  { start: 1, end: 2.5, text: "You're all alone, huh?" },
  { start: 2.7, end: 4.15, text: "Like me, Blondie" },
  { start: 4.4, end: 6, text: "We're all alone in the world.." },
];
const lyricsOverlay = document.querySelector("#lyrics-overlay");
audioPlayer.addEventListener("timeupdate", () => {
  if (currentTrack !== lyricsTrackIndex) {
    lyricsOverlay.textContent = "";
    lyricsOverlay.style.opacity = "0";
    return;
  }
  const t = audioPlayer.currentTime;

  const currentLine = lyricsSegments.find(
    (seg) => t >= seg.start && t < seg.end,
  );
  if (currentLine) {
    lyricsOverlay.textContent = currentLine.text;
    lyricsOverlay.style.opacity = "1";
  } else {
    lyricsOverlay.style.opacity = "0";
  }
});
