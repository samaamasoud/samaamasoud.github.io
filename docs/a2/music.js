// selecting all track items in the playlist
const album = document.querySelectorAll(".list");
console.log(album);

// audio element used to play the music
const audioPlayer = document.querySelector(".audio-track");
console.log(audioPlayer);

// play/pause button and icons
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// next and previous buttons and icons
const nextButton = document.querySelector("#next-button");
const nextImg = document.querySelector("#next-img");
const prevButton = document.querySelector("#previous-button");
const prevImg = document.querySelector("#previous-img");

// song title and album name display
const trackName = document.querySelector(".song-name");
const albumName = document.querySelector(".albumname");

// song titles

let currentTrack = 0;
highlightTrack();

// so that by default the first track on the tracklist is highlighted
audioPlayer.src = album[currentTrack].dataset.src;
console.log(album[0].dataset.src);

// function to switch songs and update UI
function setTrack(index) {
  currentTrack = index;

  audioPlayer.src = album[currentTrack].dataset.src;
  audioPlayer.play();

  // UI sync
  highlightTrack();
  trackName.textContent = album[currentTrack].dataset.name;
  // reset progress bar
  progress.style.width = "0%";
}

// click event for each track in playlist
album.forEach((track, index) => {
  track.addEventListener("click", () => {
    setTrack(index);
  });
});

// play/pause toggle button
playPauseButton.addEventListener("click", toggleMusic);

// handles play/pause logic
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

// keeps play/pause icon in sync with audio state
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

// vinyl spin animation reference
const vinyl = document.querySelector(".vinyl-album");

// start spinning vinyl on play
audioPlayer.addEventListener("play", () => {
  vinyl.classList.add("play"); //start spinning
});

// stop spinning vinyl on pause
audioPlayer.addEventListener("pause", () => {
  vinyl.classList.remove("play");
});

// next song button
nextButton.addEventListener("click", () => {
  let next = currentTrack + 1;
  if (next >= album.length) {
    next = 0;
  }
  setTrack(next);
});

// previous song button
prevButton.addEventListener("click", () => {
  let prev = currentTrack - 1;
  if (prev < 0) {
    prev = album.length - 1;
  }
  setTrack(prev);
});

// to make tracklist highlight and the song name change automatically as the songs change
function highlightTrack() {
  album.forEach((track) => track.classList.remove("active"));
  album[currentTrack].classList.add("active");
}

// progress bar elements
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

// allows clicking on progress bar to jump to different parts of the audio
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
});

// only enable lyrics for one specific track because only one track has lyrics
const lyricsTrackIndex = 3;

// timed lyric segments
const lyricsSegments = [
  { start: 1, end: 2.5, text: "You're all alone, huh?" },
  { start: 2.7, end: 4.15, text: "Like me, Blondie" },
  { start: 4.4, end: 6, text: "We're all alone in the world.." },
];

// lyrics display element
const lyricsOverlay = document.querySelector("#lyrics-overlay");

// update lyrics based on current audio time
audioPlayer.addEventListener("timeupdate", () => {
  // hide lyrics if not correct track
  if (currentTrack !== lyricsTrackIndex) {
    lyricsOverlay.textContent = "";
    lyricsOverlay.style.opacity = "0";
    return;
  }
  const t = audioPlayer.currentTime;

  // find matching lyric line based on time
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
