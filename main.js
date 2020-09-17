const landingPage = document.querySelector('[data-page="landingPage"]');
const communityEngagement = document.querySelector(
  '[data-page="communityEngagement"]'
);
const contactUs = document.querySelector('[data-page="contactUs"]');
const moreInformation = document.querySelector('[data-page="moreInformation"]');

//Hamburger menu visibility toggle
const hamburger = document.getElementById("hamburger-menu");
const dropmenu = document.getElementById("dropmenu");
const links = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  dropmenu.classList.toggle("hidden");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    dropmenu.classList.add("hidden");
  })
);

//Header disappear on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos + 10 || currentScrollPos <= 30) {
    document.getElementById("header").style.top = "0";
  } else if (prevScrollpos + 5 < currentScrollPos) {
    document.getElementById("header").style.top = "-300px";
  }
  prevScrollpos = currentScrollPos;
};

//Image slideshow
if (landingPage || communityEngagement) {
  const slides = document.querySelectorAll(".slideshowImages");
  slides.forEach((slide) => {
    slide.style.display = "unset";
  });
  let slideIndex = 0;
  if (communityEngagement) {
    const schoolCaption = document.getElementById("schoolCaption");
    let schoolCaptionIndex = 0;
    const schoolCaptionArray = [
      "Chelsea Heights Primary School – 2019 Tree",
      "Edithvale Primary School with Presents Families collected for the families. – 2019 Tree",
      "Nepean School – 2019 Tree",
      "St Joseph’s Primary School – 2019 Tree",
    ];
    setInterval(() => {
      schoolCaptionIndex++;
      if (schoolCaptionIndex === schoolCaptionArray.length) {
        schoolCaptionIndex = 0;
      }
      schoolCaption.innerHTML = schoolCaptionArray[schoolCaptionIndex];
    }, 5000);
  }

  setInterval(() => {
    slides.forEach((slide) => {
      slide.style.opacity = 0;
    });
    slideIndex++;
    if (slideIndex === slides.length) {
      slideIndex = 0;
    }
    slides[slideIndex].style.opacity = 1;
    console.log(slideIndex);
  }, 5000);
}

//Change innerHTML with school tree slideshow

//Christmas button click
const christmasButton = document.getElementById("christmasButton");
const cursor = snowflakeCursor();

christmasButton.addEventListener("click", () => {
  christmasButton.classList.toggle("pressed");
  if (christmasButton.dataset.snowflake === "disabled") {
    christmasButton.innerHTML =
      "<div>Christmas</div><div>Magic</div><div>Off</div>";
    cursor.start();
    christmasButton.dataset.snowflake = "enabled";
  } else {
    christmasButton.innerHTML =
      "<div>Christmas</div><div>Magic</div><div>On</div>";
    cursor.stop();
    christmasButton.dataset.snowflake = "disabled";
  }
});

function snowflakeCursor() {
  const possibleEmoji = "❄️";
  let width = window.innerWidth;
  let height = window.innerHeight;
  const cursor = {
    x: width,
    y: height,
  };
  const particles = [];
  const velocity = 0;

  function start() {
    bindEvents();
    loop();
  }

  // Bind events that are needed
  function bindEvents() {
    document.addEventListener("mousemove", onMouseMove, true);
    window.addEventListener("resize", onWindowResize, true);
  }

  function stop() {
    document.removeEventListener("mousemove", onMouseMove, true);
    window.removeEventListener("resize", onWindowResize, true);
  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY + prevScrollpos;
    addParticle(cursor.x, cursor.y, possibleEmoji);
  }

  function addParticle(x, y, character) {
    const particle = new Particle();
    particle.init(x, y, character);
    particles.push(particle);
  }

  function updateParticles() {
    //Updated
    for (let particle of particles) {
      particle.update();
    }

    //Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }

  //Particles
  function Particle() {
    // Init, and set properties
    this.init = function (x, y, character) {
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1 + Math.random(),
      };

      this.lifeSpan = 120 + Math.floor(Math.random() * 60); //ms

      this.position = {
        x: x,
        y: y,
      };

      this.element = document.createElement("span");
      this.element.innerHTML = character;
      this.element.classList.add("newSnowflake");
      this.update();

      document.body.appendChild(this.element);
    };

    this.update = function () {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 10;
      this.velocity.y -= Math.random() / 30;

      this.lifeSpan--;

      this.element.style.transform = `
        translate3d(${this.position.x}px, ${this.position.y}px, 0)
        scale(${this.lifeSpan / 80})
        rotate(${this.lifeSpan}deg)`;
    };

    this.die = function () {
      this.element.parentNode.removeChild(this.element);
    };
  }

  return { start, stop };
}

const dateNow = () => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);
  const oneDay = 1000 * 60 * 60 * 24; //ms*s*h*d
  const footer = document.getElementById("daysUntil");
  if (today.getMonth === 11 && today.getDay > 25) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  if (Math.ceil((christmas.getTime() - today.getTime()) / oneDay) === 0) {
    footer.innerHTML = `🦌🦌🦌🦌🦌🛷 Merry Christmas! Today is the day! 🦌🦌🦌🦌🦌🛷`;
  } else {
    footer.innerHTML = `🎄🎄It is only ${Math.ceil(
      (christmas.getTime() - today.getTime()) / oneDay
    )} days until Christmas 🎄🎄`;
  }
};

dateNow();
