const myVideo = document.querySelector("#my-video");
console.log(myVideo);

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

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

//must unmute logic
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

muteUnmuteButton.addEventListener("click", toggleSound);

function toggleSound() {
  if (myVideo.muted === true) {
    myVideo.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    myVideo.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}

//step logic
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

step1Button.addEventListener("click", goToStep1);

function goToStep1() {
  myVideo.currentTime = 5.0;
}

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

step2Button.addEventListener("click", goToStep2);

function goToStep2() {
  myVideo.currentTime = 9.0;
}

//likes logic
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

let likesCount = 0;
const likes = document.querySelector("#likes");
console.log(likes);

heartButton.addEventListener("click", showLikes);

function showLikes() {
  likesCount++;
  console.log(likesCount);
  likes.textContent = likesCount;
}
