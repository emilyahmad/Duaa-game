const game = document.getElementById('game');
const duaa = document.getElementById('duaa');
const scoreDisplay = document.getElementById('score');
let score = 0;
let duaaX = window.innerWidth / 2;

// Move Duaa left/right using arrow keys
document.addEventListener('keydown', (e) => {
  const step = 60;
  if (e.key === 'ArrowLeft') duaaX -= step;
  if (e.key === 'ArrowRight') duaaX += step;

  // Keep inside bounds
  duaaX = Math.max(0, Math.min(game.clientWidth - 80, duaaX));
  duaa.style.left = duaaX + 'px';
});

// Falling items logic
const emojis = ['💅', '📱', '💸', '🧃', '👛', '💖'];

function createItem() {
  const item = document.createElement('div');
  item.classList.add('falling');
  item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  item.style.left = Math.random() * (game.clientWidth - 40) + 'px';

  game.appendChild(item);

  const interval = setInterval(() => {
    const itemRect = item.getBoundingClientRect();
    const duaaRect = duaa.getBoundingClientRect();

    // Collision detection
    if (
      itemRect.bottom >= duaaRect.top &&
      itemRect.left < duaaRect.right &&
      itemRect.right > duaaRect.left
    ) {
      game.removeChild(item);
      clearInterval(interval);
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
    }

    // Missed
    if (itemRect.top >= game.clientHeight) {
      game.removeChild(item);
      clearInterval(interval);
      score -= 1;
      scoreDisplay.textContent = 'Score: ' + score;
      if (score < -3) {
        alert('Duaa dropped too many things 😢');
        location.reload();
      }
    }
  }, 50);
}

// Game loop
setInterval(createItem, 1000);
