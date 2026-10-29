export default class Field {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.cells = [];
    this.build();
  }

  build() {
    this.container.innerHTML = '';
    this.cells = [];
    for (let i = 0; i < this.size * this.size; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = String(i);
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getCell(index) {
    return this.cells[index];
  }

  // Случайный индекс клетки, отличный от exclude
  getRandomIndex(exclude = -1) {
    if (this.cells.length <= 1) return 0;
    let index;
    do {
      index = Math.floor(Math.random() * this.cells.length);
    } while (index === exclude);
    return index;
  }
}