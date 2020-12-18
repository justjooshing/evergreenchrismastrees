//Hamburger menu visibility toggle
const hamburger = document.getElementById("hamburger-menu");
const fullscreenMenu = document.getElementById("fullscreen-menu");
const links = document.querySelectorAll(".menu-items");

hamburger.addEventListener("click", () => {
  fullscreenMenu.classList.toggle("hidden");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    fullscreenMenu.classList.add("hidden");
  })
);

fullscreenMenu.addEventListener("click", () => {
  fullscreenMenu.classList.add("hidden");
});

//Header disappear on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos + 10 || currentScrollPos <= 30) {
    document.getElementById("header").style.top = "0";
  } else if (prevScrollpos + 5 < currentScrollPos) {
    document.getElementById("header").style.top = "-350px";
  }
  prevScrollpos = currentScrollPos;
};

//Christmas button click
const christmasButton = document.getElementById("christmas-button");

const cursor = snowflakeCursor();
christmasButton.addEventListener("click", () => {
  const caption = document.getElementById("snowflake-caption");
  caption.classList.toggle("pressed");
  if (christmasButton.dataset.snowflake === "disabled") {
    cursor.start();
    christmasButton.dataset.snowflake = "enabled";
  } else {
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
    const oldPosX = cursor.x;
    const oldPosY = cursor.y;
    cursor.x = e.clientX;
    cursor.y = e.clientY + prevScrollpos;
    if (
      cursor.x > oldPosX + 10 ||
      cursor.x + 10 < oldPosX ||
      cursor.y > oldPosY + 10 ||
      cursor.y + 10 < oldPosY
    ) {
      addParticle(cursor.x, cursor.y, possibleEmoji);
    }
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
      this.element.classList.add("new-snowflake");
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

//Days until Christmas
const dateNow = () => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);
  const oneDay = 1000 * 60 * 60 * 24; //ms*s*h*d
  const footer = document.getElementById("days-until");
  if (today.getMonth === 11 && today.getDay > 25) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  if (Math.ceil((christmas.getTime() - today.getTime()) / oneDay) === 0) {
    footer.innerHTML = `🦌🦌🦌🦌🦌🛷 Merry Christmas! Today is the day! 🦌🦌🦌🦌🦌🛷`;
  } else {
    footer.innerHTML = `🎄It is only ${Math.ceil(
      (christmas.getTime() - today.getTime()) / oneDay
    )} days until Christmas 🎄`;
  }
};

dateNow();
