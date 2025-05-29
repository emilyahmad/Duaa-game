const game = document.getElementById('game');
const duaa = document.getElementById('duaa');
const scoreDisplay = document.getElementById('score');
let score = 0;
let duaaX = window.innerWidth / 2;

// arrow key movements duaa is going to kill me lmfao
document.addEventListener('keydown', (e) => {
  const step = 60;
  if (e.key === 'ArrowLeft') duaaX -= step;
  if (e.key === 'ArrowRight') duaaX += step;

  duaaX = Math.max(0, Math.min(game.clientWidth - 80, duaaX));
  duaa.style.left = duaaX + 'px';
});
function createItem() {
    const item = document.createElement('div');
    item.classList.add('falling');
    item.style.left = Math.random() * (game.clientWidth - 40) + 'px';
  
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
  
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement('img');
    img.src = randomImage;
    img.classList.add('falling-img');
  
    item.appendChild(img);
    game.appendChild(item);
  
    const interval = setInterval(() => {
      const itemRect = item.getBoundingClientRect();
      const duaaRect = duaa.getBoundingClientRect();
  
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
  
      if (itemRect.top >= game.clientHeight) {
        game.removeChild(item);
        clearInterval(interval);
        score -= 1;
        scoreDisplay.textContent = 'Score: ' + score;
        if (score < -3) {
          alert('be better');
          location.reload();
        }
      }
    }, 50);
  }
  setInterval(createItem, 1000);
const music = document.getElementById('bg-music');
// music starts after key pressed -> autoplays
//how do i monetize this 😈 ugh i should've made the variable names stupid
document.addEventListener('keydown', () => {
  if (music.paused) {
    music.play().catch(e => console.log('Autoplay blocked:', e));
  }
});
