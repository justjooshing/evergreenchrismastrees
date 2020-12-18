const communityEngagement = document.querySelector(
  '[data-page="community-engagement"]'
);

const slides = document.querySelectorAll(".slideshow-images");
slides.forEach((slide) => {
  slide.style.display = "block";
});
let slideIndex = 0;

//Change caption
if (communityEngagement) {
  const schoolCaptions = document.querySelectorAll(".school-captions");
  schoolCaptions.forEach((caption) => {
    caption.style.display = "block";
  });
  let schoolCaptionIndex = 0;
  setInterval(() => {
    schoolCaptions.forEach((caption) => {
      caption.style.opacity = 0;
    });
    schoolCaptionIndex++;
    if (schoolCaptionIndex === schoolCaptions.length) {
      schoolCaptionIndex = 0;
    }
    schoolCaptions[schoolCaptionIndex].style.opacity = 1;
  }, 5000);
}

//Change slides
setInterval(() => {
  slides.forEach((slide) => {
    slide.style.opacity = 0;
  });
  slideIndex++;
  if (slideIndex === slides.length) {
    slideIndex = 0;
  }
  slides[slideIndex].style.opacity = 1;
}, 5000);
