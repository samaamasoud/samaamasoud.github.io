// Used AI to help write the JS and troubleshooting

// this block is for creating a sliding reveal of the bent pyramid. i chose this way to animate it because the section focuses on how the construction didn't go as planned and they changed the inclination angle halfway through
window.addEventListener("scroll", () => {
  const section = document.querySelector(".bent-pyramid-section");
  const image = document.querySelector(".img-reveal");
  const story1 = document.querySelector(".bent-pyramid-story1");
  const story2 = document.querySelector(".bent-pyramid-story2");

  //   this is to make sure the animation doesn't run unless the section is visible on screen
  if (!section || !image) return;

  // same as for the step pyramid, this prevents glitches if the user scrolls too fast but calculating the scroll progress as a decimal from 0 to 1
  let progress = (scrollTop - sectionTop) / sectionHeight;
  progress = Math.max(0, Math.min(1, progress)); // Keep between boundaries

  //   reversing the progress percentage so that the mask clips from 100% to 0 revealing the image
  // i chose a clip path polygon to create a clean sweeping effect.
  const maskPercentage = 100 - progress * 100;
  image.style.clipPath = `polygon(0% ${maskPercentage}%, 100% ${maskPercentage}%, 100% 100%, 0% 100%)`;

  // this block uses page tracking to ensure the text change and the mask reveal align perfectly. since the section is about a construction error, the text changes right when the bending is visible in the image to a text explainig the context, which makes following the story easier.
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;
  const scrollTop = window.scrollY;
  if (progress < 0.5) {
    story1.classList.add("active");
    story2.classList.remove("active");
  } else {
    story1.classList.remove("active");
    story2.classList.add("active");
  }
});

// this block is for animating the red pyramid section. this section shows the image of the red pyramid rising from the botton to do a mini "grand reveal" since it was the first ever suscessful pyramid, being the closest thing to the great pyramid
// used a css custom property (--scroll-progress) so that it reads the user's scroll data and use it for animations
window.addEventListener("scroll", () => {
  const container = document.querySelector(".red-pyramid-section");
  if (!container) return;

  const distanceFromTop = window.scrollY - container.offsetTop;

  const totalScrollableSpace = container.scrollHeight - window.innerHeight;

  let progress = distanceFromTop / totalScrollableSpace;
  progress = Math.max(0, Math.min(1, progress));
  document.documentElement.style.setProperty("--scroll-progress", progress);
});

// i had an issue where the interaction wouldn't work at all even though there were no typos, i found out that the script can execute too early? adding this line tells the browser to load the entire HTML before running the script. i used Gemini for this.
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.querySelector("#bg-music");
  const mutedBtn = document.querySelector(".audio-toggle");

  //this is a safety check to ensure the audio variable exists and if it's missing it doesn't sun the code
  if (!bgMusic || !mutedBtn) {
    console.error(
      "Setup Error: Could not find .audio-toggle or #bg-music in your HTML.",
    );
    return;
  }

  console.log("Success: Audio elements successfully found by querySelector.");

  // this block is for the background music and handling browser blocking autoplay sound
  //   if the browser blocks the sound it catches the error, mutes the sound, and changes the button icon
  bgMusic
    .play()
    .then(() => {
      console.log("Autoplay active: Background music playing.");
      mutedBtn.classList.remove("muted");
    })
    .catch((error) => {
      console.warn(
        "Autoplay blocked by browser. Swapping UI to muted state until clicked.",
      );
      bgMusic.pause(); // ensure states stay locked
      mutedBtn.classList.add("muted");
    });

  //   i have a mute/unmute button contantly visible on screen to make it easy to turn off the music, but it's playing by default
  // this checks the playback state and updates the button accordingly to keep the sound and button in sync
  mutedBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        bgMusic.muted = false;
        mutedBtn.classList.remove("muted");
        console.log("User action: Audio playing, unmuted.");
      });
    } else {
      bgMusic.muted = !bgMusic.muted;

      if (bgMusic.muted) {
        mutedBtn.classList.add("muted");
        console.log("User action: Audio muted.");
      } else {
        mutedBtn.classList.remove("muted");
        console.log("User action: Audio unmuted.");
      }
    }
  });

  //   this block is for the final section; the great pyramid.
  // i wanted this section to look cinematic and feel like a grand reveal mimicing a lighting-up state
  const targetSection = document.querySelector(".great-pyramid-section");
  // again, using an intersection observer to trigger the animation once the user is 30% into the section by setting the threshold to 0.3
  if (targetSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // i added a 1 second 'timeout' delay before adding the reveal class
            // to give the user a moment to read the titles before the pyramid is visible, this is for adding a cinematic effect and also because the title is on top of the pyramid whuch can mke it hard to read because of poor contrast
            // so adding this delay helps
            setTimeout(() => {
              targetSection.classList.add("reveal");
            }, 1000);
            // this prevents repeating the animation whenever the user scrolls back to keep it clean
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );
    observer.observe(targetSection);
  }
});
