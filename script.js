const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 20;
const word = "TE AMO";
ctx.font = `${fontSize}px monospace`;

const textWidth = ctx.measureText(word).width;
const columns = Math.floor(canvas.width / textWidth);
const drops = Array(columns).fill(0);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff007f"; // Rosa fuerte
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const x = i * textWidth;
    const y = drops[i] * fontSize;

    ctx.fillText(word, x, y);

    if (Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  updateParticles();
  drawParticles();
}

setInterval(draw, 50);

///////////////////////////
// 🎆 Fuegos artificiales
///////////////////////////

let particles = [];

function createFirework(x, y) {
  const particleCount = 40;
  const speed = 2 + Math.random() * 2;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    particles.push({
      x,
      y,
      vx,
      vy,
      alpha: 1,
      radius: 2 + Math.random() * 2,
    });
  }
}

function updateParticles() {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;
  });
  particles = particles.filter((p) => p.alpha > 0);
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
    ctx.fill();
  });
}

canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Mostrar "TE AMO" grande
  ctx.font = "40px monospace";
  ctx.fillStyle = "#ff69b4";
  ctx.fillText("Te amo", x - 60, y);

  // Después de un momento, lanzar fuegos artificiales
  setTimeout(() => {
    createFirework(x, y);
  }, 300);
});
