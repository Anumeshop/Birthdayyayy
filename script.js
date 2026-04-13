const correctCode = "0421";
const birthDate = new Date("2010-04-21T00:00:00");
const input = document.getElementById("code-input");
const enterBtn = document.getElementById("enter-btn");
const yaThichaBtn = document.getElementById("ya-thicha-btn");
const scroller = document.getElementById("scroller");

// Login Logic
input.addEventListener("input", () => {
  enterBtn.disabled = input.value.length !== 4;
});

enterBtn.onclick = () => {
  if (input.value === correctCode) {
    document.getElementById("bg-music").play().catch(e => console.log("Audio play prevented by browser"));
    document.getElementById("lobby-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    resizeCanvas();
    startTreeAnimation();
  } else {
    alert("Wrong code! 🌸");
  }
};

// Magazine Toggle
yaThichaBtn.onclick = () => document.getElementById("magazine-section").classList.remove("hidden");
document.getElementById("back-btn").onclick = () => document.getElementById("magazine-section").classList.add("hidden");

// Limited Swipe Logic (1 Page at a time)
let isScrolling = false;
scroller.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;
  if (e.deltaX > 0) {
    scroller.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  } else {
    scroller.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  }
  setTimeout(() => { isScrolling = false; }, 600);
  e.preventDefault();
}, { passive: false });

// Birthday Timer
setInterval(() => {
  const diff = new Date() - birthDate;
  document.getElementById("days").innerText = Math.floor(diff / 86400000);
  document.getElementById("hours").innerText = String(Math.floor(diff / 3600000 % 24)).padStart(2, "0");
  document.getElementById("minutes").innerText = String(Math.floor(diff / 60000 % 60)).padStart(2, "0");
  document.getElementById("seconds").innerText = String(Math.floor(diff / 1000 % 60)).padStart(2, "0");
}, 1000);

// Tree Drawing Logic
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// UPDATE: Fixed resize logic so canvas doesn't overlap header/button on mobile
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  // Reduced from 0.7 to 0.55 so the tree fits safely between the timer and the button
  canvas.height = window.innerHeight * 0.55; 
}

// Ensure canvas resizes if user rotates their phone
window.addEventListener('resize', () => {
    if(!document.getElementById("main-content").classList.contains("hidden")) {
        resizeCanvas();
    }
});

function startTreeAnimation() {
  function drawBranch(x, y, len, angle, width) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#ff8fab";
    ctx.lineWidth = width;
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 10) {
      ctx.fillStyle = "#ffb3c6";
      ctx.beginPath();
      ctx.arc(0, -len, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      yaThichaBtn.style.display = "block"; 
      return;
    }

    ctx.restore();
    setTimeout(() => {
      const nx = x + Math.sin(angle * Math.PI / 180) * len;
      const ny = y - Math.cos(angle * Math.PI / 180) * len;
      drawBranch(nx, ny, len * 0.78, angle + 25, width * 0.7);
      drawBranch(nx, ny, len * 0.78, angle - 25, width * 0.7);
    }, 150);
  }
  // Draw starting slightly higher up from the very bottom of the canvas
  drawBranch(canvas.width / 2, canvas.height * 0.95, canvas.height * 0.22, 0, 7);
                                                                 }
