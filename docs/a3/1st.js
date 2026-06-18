// Used AI to help write the JS and troubleshooting
// context: this project is an interactive scroll-based storytelling experience about the architectural evolution of the pyramids of Egypt.

// made a parallax with columns of hieroglyphs that move at different speeds when scrolling to create a sense of depth
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY; // saving the number of pixels scrolled to use for the animation
  const columns = document.querySelectorAll(".glyphs-img");
  // used a modern arrow function inside forEach array.
  // i'm using this to replace the old 'for' loops which made the animation look cleaner
  columns.forEach((column) => {
    // to make it run the code for each column individually
    const speed = parseFloat(column.getAttribute("data-speed")); // applying different speeds for each column

    const yPos = scrollTop * speed; // determining the vertical movement by multiplying the amount of pixels scrolled by the speed
    column.style.transform = `translate3d(0, ${yPos}px, 0)`; // i used this instead of a translateY to use GPU acceleration to create a smoother animation, which is crucial for my context
  });
});

// this section is for making animated text reveals triggered by scroll only when user enters the viewport. i made this choice to enhance the storytelling and make it feel like a whole experience rather than just scrolling through a webpage.
const observerOptions = {
  // configuration settings for the ineractive observer
  root: null, // telling the browser to look at the entire screen
  threshold: 0.4, // to trigger the text animation when 40% of it is visible
};

const interactiveObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // looking inside the target container for elements with the class animated-text
    const panels = entry.target.querySelectorAll(".animated-text");

    // checking if the container is 40% visible at the moment an adding the reveal CSS class if yes so that the CSS applies the animation
    if (entry.isIntersecting) {
      panels.forEach((panel) => {
        panel.classList.add("reveal");
      });
      // this is to make the animation reversable as it makes it disappear again once the user scrolls away, and this is to make the interactivity feel consistent
    } else {
      panels.forEach((panel) => {
        panel.classList.remove("reveal");
      });
    }
  });
}, observerOptions);

const targetSections = document.querySelectorAll(".transition");
targetSections.forEach((target) => interactiveObserver.observe(target));

// this section is for creating an animation of a step pyramid being assembled. i made this animation to demonstrate the text that explains how the pyramid was built using 6 mastabas. i drew the sketch myself

const scrollZone = document.querySelector(".scroll-zone");
const layers = document.querySelectorAll(".step-pyramid-layer");
function updatePyramid() {
  // to constantly update the animation as the user scrolls based on progress by telling the browser the number of pixels the container has moved
  const rect = scrollZone.getBoundingClientRect();
  const totalDuration = rect.height - window.innerHeight;
  const scrolledPastTop = -rect.top + 300;

  // progress is calculated between 0 to 1 to prevent the pyramid animation from glitching if the user scrolls too fast
  let progress = scrolledPastTop / totalDuration;
  progress = Math.max(0, Math.min(1, progress));

  // this is to ensure that each layer falls into place only one at a time
  const layersToShow = Math.floor(progress * (layers.length + 1));

  // comparing scroll progress to the layer-to-show position makes the animation look dynamic. this animation is also reversable
  layers.forEach((layer, index) => {
    if (index < layersToShow) {
      layer.classList.add("reveal");
    } else {
      layer.classList.remove("reveal");
    }
  });

  // to make the page less cluttered and overwhelming, i split the text into 2 with the other half revealing mid scroll
  const midScrollText = document.querySelector(
    ".section2-story2 p.mid-scroll-text",
  );
  if (progress >= 0.5) {
    midScrollText.classList.add("reveal");
  } else {
    midScrollText.classList.remove("reveal");
  }
}

// this section is to make sure the animation only happens when the user is actually viewing the section. Also, by removing the event listener when not viewing the section, it's saving the computer's battery and CPU, which also makes the webpage way faster and smoother, which is crucial for such a storytelling webpage.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", updatePyramid);
        updatePyramid();
      } else {
        window.removeEventListener("scroll", updatePyramid);
      }
    });
  },
  {
    threshold: 0,
  },
);

if (scrollZone) {
  observer.observe(scrollZone);
}
