export default class Scoreboard {
  constructor(scoreEl, missEl, maxMisses = 5) {
    this.scoreEl = scoreEl;
    this.missEl = missEl;
    this.maxMisses = maxMisses;
    this.score = 0;
    this.misses = 0;
    this.render();
  }

  addPoint() {
    this.score += 1;
    this.render();
  }

  addMiss() {
    this.misses += 1;
    this.render();
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.render();
  }

  isGameOver() {
    return this.misses >= this.maxMisses;
  }

  render() {
    this.scoreEl.textContent = String(this.score);
    this.missEl.textContent = `${this.misses} / ${this.maxMisses}`;
  }
}