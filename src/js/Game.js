import Field from './Field';
import Goblin from './Goblin';
import Scoreboard from './Scoreboard';

const STEP_MS = 1000;
const MAX_MISSES = 5;

export default class Game {
  constructor({ boardEl, scoreEl, missEl, messageEl }) {
    this.field = new Field(boardEl);
    this.goblin = new Goblin(this.field);
    this.scoreboard = new Scoreboard(scoreEl, missEl, MAX_MISSES);
    this.messageEl = messageEl;

    this.hitInTime = false;
    this.running = false;
    this.intervalId = null;

    this.onGoblinClick = this.onGoblinClick.bind(this);
    this.goblin.element.addEventListener('click', this.onGoblinClick);
  }

  start() {
    this.stop();
    this.hitInTime = false;
    this.scoreboard.reset();
    this.messageEl.textContent = '';
    this.running = true;

    this.goblin.showRandom();
    this.intervalId = setInterval(() => this.tick(), STEP_MS);
  }

  // Каждую секунду: если не попали — промах; затем гоблин уходит в новую клетку
  tick() {
    if (!this.running) return;

    if (!this.hitInTime) {
      this.scoreboard.addMiss();
      if (this.scoreboard.isGameOver()) {
        this.end();
        return;
      }
    }

    this.hitInTime = false;
    this.goblin.showRandom();
  }

  onGoblinClick() {
    if (!this.running || this.hitInTime) return;
    this.hitInTime = true;
    this.scoreboard.addPoint();
    this.goblin.hide();
  }

  end() {
    this.running = false;
    this.stop();
    this.goblin.hide();
    this.messageEl.textContent =
      `Игра окончена! Ваш счёт: ${this.scoreboard.score}`;
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}