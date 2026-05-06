// first find to the audio element so that we can control it from here //

const airportAudio = document.querySelector("#airport-audio");
const s = "123456";
const i = 123456;

s == i;

s === i;
console.log(s + s);
console.log(i + i);

// let us access the video too
const myVideo = document.querySelector("#my-video");

// similarly access the play button
const playButton = document.querySelector("#play-button");

playButton.addEventListener("click", homar);

function homar() {
  airportAudio.play();
}

// similarly access the pause button
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  const a = 1;
  // airportAudio.pause();
  if (airportAudio.paused == false) {
    airportAudio.pause();
    msg.textContent = "audio is paused";
  }
}

a;

// similarly access the pop button
const popAudio = document.querySelector("#pop-audio");
console.log(popAudio);
const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", makeItPop);
function makeItPop() {
  popAudio.play();
}

// access the play pause button
const playPauseButton = document.querySelector("#play-pause-btn");
console.log(playPauseButton);

//access the image
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// add a click event listener to the button
playPauseButton.addEventListener("click", toggleVideo);

function toggleVideo() {
  if (myVideo.paused === true || myVideo.ended === true) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}
