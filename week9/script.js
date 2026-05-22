const myButton = document.querySelector("#my-button");
console.log(myButton);
myButton.addEventListener("click", doJump);
const duck = document.querySelector("#duck");
console.log(duck);

let clicked = false;

function doJump() {
  // clicked = true;
  console.log(clicked);
  if (clicked) {
    clicked = false;
    duck.style.translate = "0px 0px";
  } else {
    duck.style.translate = "0px -60px";
    clicked = true;
  }
}
function flyHigh() {
  duck.style.translate = ``;
}
