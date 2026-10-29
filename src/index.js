import './style.css';
import Game from './js/Game';

const game = new Game({
  boardEl: document.getElementById('game-board'),
  scoreEl: document.getElementById('score'),
  missEl: document.getElementById('misses'),
  messageEl: document.getElementById('message'),
});

document.getElementById('restart').addEventListener('click', () => game.start());

// Автостарт при загрузке
game.start();