const game = document.getElementById('game');
const duaa = document.getElementById('duaa');
const scoreDisplay = document.getElementById('score');
const music = document.getElementById('bg-music');
const pauseToggle = document.getElementById('pause-toggle');

let score = 0;
let duaaX = window.innerWidth / 2;
let isPaused = false;

const fallingItems = [];

document.addEventListener('keydown', (e) => {
  const step = 60;
  if (e.key === 'ArrowLeft') duaaX -= step;
  if (e.key === 'ArrowRight') duaaX += step;

  duaaX = Math.max(0, Math.min(game.clientWidth - 80, duaaX));
  duaa.style.left = duaaX + 'px';

  if (music.paused) {
    music.play().catch(e => console.log('Autoplay blocked:', e));
  }
});

class FallingItem {
  constructor() {
    this.item = document.createElement('div');
    this.item.classList.add('falling');
    this.item.style.left = Math.random() * (game.clientWidth - 40) + 'px';

    const images = [
      'images/amoogus.png',
      'images/bearPunching.png',
      'images/dharmindra.png',
      'images/duaaSlide.png',
      'images/ohioCore.png',
      'images/pookie.png',
      'images/twoPants.png',
      'images/youLikeJazz1.png'
    ];

    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.classList.add('falling-img');
    this.item.appendChild(img);

    game.appendChild(this.item);
    this.y = 0;
    this.speed = 2 + Math.random() * 3;
    this.rafId = null;

    this.update = this.update.bind(this);
    this.start();
  }

  start() {
    this.rafId = requestAnimationFrame(this.update);
  }

  update() {
    if (isPaused) return; // stops the animation loop when paused

    this.y += this.speed;
    this.item.style.top = this.y + 'px';

    const itemRect = this.item.getBoundingClientRect();
    const duaaRect = duaa.getBoundingClientRect();

    if (
      itemRect.bottom >= duaaRect.top &&
      itemRect.left < duaaRect.right &&
      itemRect.right > duaaRect.left
    ) {
      game.removeChild(this.item);
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
      return;
    }

    if (itemRect.top >= game.clientHeight) {
      game.removeChild(this.item);
      score--;
      scoreDisplay.textContent = 'Score: ' + score;
      if (score < -500) {
        alert('be better');
        location.reload();
      }
      return;
    }

    this.rafId = requestAnimationFrame(this.update); // continue if not paused
  }

  pause() {
    cancelAnimationFrame(this.rafId);
  }

  resume() {
    this.start(); // restart from current y
  }
}

// spawn falling items every sec
setInterval(() => {
  if (!isPaused) {
    const item = new FallingItem();
    fallingItems.push(item);
  }
}, 1000);

// pause/resume logic
pauseToggle.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseToggle.src = isPaused ? 'panelImages/play.png' : 'panelImages/pause.png';

  if (isPaused) {
    console.log('Game paused!');
    fallingItems.forEach(item => item.pause());
  } else {
    console.log('Game resumed!');
    fallingItems.forEach(item => item.resume());
  }
});
