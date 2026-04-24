function checkWeather() {
  let body = document.querySelector("body");
  let outer = document.querySelector("outer");
  const myTemp = document.querySelector("#myTemp");
  console.log(myTemp.value);
  let temp = myTemp.value;

  if (temp < 10) {
    console.log("it is quite cold today");
    body.style.backgroundColor = "grey";
  } else if (temp >= 10 && temp < 20) {
    console.log("it is a nice weather today");
    body.style.backgroundColor = "pink";
  } else if (temp >= 20 && temp < 30) {
    console.log("it is quite warm today");
    body.style.backgroundColor = "orange";
  } else if (temp >= 30 && temp < 50) {
    console.log("it is burning hot");
  }
}
