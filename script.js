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
    document.getElementById("bg-music").play().catch(e => console.log("Audio play prevented"));
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

function resizeCanvas() {
  canvas.width = window.innerWidth;
  // Canvas takes up most of the screen so the tree can grow tall
  canvas.height = window.innerHeight * 0.85; 
}

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
  
  // Starts at bottom middle of the canvas
  drawBranch(canvas.width / 2, canvas.height, canvas.height * 0.22, 0, 7);
}
