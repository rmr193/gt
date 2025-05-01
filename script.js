const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = 2;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -15 - 10
    };
    this.gravity = 0.3;
    this.lifeSpan = false;
  }

  update() {
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.lifeSpan === false) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    if (this.y <= canvas.height / 3) {
      this.lifeSpan = true;
      this.explode();
    }
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      const particle = new Particle(this.x, this.y);
      particles.push(particle);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3
    };
    this.lifeSpan = 100;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.lifeSpan -= 1;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    if (firework.lifeSpan === true) {
      fireworks.splice(index, 1);
    }
  });

  particles.forEach((particle, index) => {
    particle.update();
    if (particle.lifeSpan <= 0) {
      particles.splice(index, 1);
    }
  });
}

window.addEventListener('click', (e) => {
  const firework = new Firework();
  fireworks.push(firework);
});

let particles = [];

animate();
