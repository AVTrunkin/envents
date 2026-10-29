import goblinImg from '../img/goblin.png';

export default class Goblin {
  constructor(field) {
    this.field = field;
    this.currentIndex = -1;
    this.element = this.create();
  }

  create() {
    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'Гоблин';
    img.classList.add('goblin', 'hidden');
    return img;
  }

  // Показать в случайной клетке (не той же самой)
  showRandom() {
    const nextIndex = this.field.getRandomIndex(this.currentIndex);
    // Меняем родителя через appendChild — узел сам покидает старую клетку
    this.field.getCell(nextIndex).appendChild(this.element);
    this.element.classList.remove('hidden');
    this.currentIndex = nextIndex;
  }

  // Гоблин пропадает из ячейки (после попадания)
  hide() {
    this.element.classList.add('hidden');
  }
}