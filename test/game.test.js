/**
 * @jest-environment jsdom
 */
import Field from '../src/js/Field';
import Goblin from '../src/js/Goblin';
import Scoreboard from '../src/js/Scoreboard';
import Game from '../src/js/Game';

function setupDom() {
  document.body.innerHTML = `
    <div id="game-board"></div>
    <b id="score">0</b>
    <b id="misses">0</b>
    <div id="message"></div>
  `;
}

describe('Field', () => {
  test('создаёт 16 клеток', () => {
    const board = document.createElement('div');
    const field = new Field(board);
    expect(field.cells).toHaveLength(16);
    expect(board.children).toHaveLength(16);
  });

  test('getRandomIndex не возвращает исключённый индекс', () => {
    const field = new Field(document.createElement('div'));
    for (let i = 0; i < 100; i += 1) {
      expect(field.getRandomIndex(5)).not.toBe(5);
    }
  });
});

describe('Goblin', () => {
  let board;

  beforeEach(() => {
    board = document.createElement('div');
    document.body.append(board);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('showRandom помещает гоблина в клетку', () => {
    const field = new Field(board);
    const goblin = new Goblin(field);
    goblin.showRandom();

    expect(goblin.element.parentElement.classList.contains('cell')).toBe(true);
    // ищем внутри поля, а не по всему документу
    expect(board.querySelectorAll('.goblin')).toHaveLength(1);
  });
});

describe('Scoreboard', () => {
  test('считает очки и промахи', () => {
    setupDom();
    const sb = new Scoreboard(
      document.getElementById('score'),
      document.getElementById('misses'),
      5,
    );
    sb.addPoint();
    sb.addMiss();
    expect(sb.score).toBe(1);
    expect(sb.misses).toBe(1);
    expect(document.getElementById('score').textContent).toBe('1');
  });
});

describe('Game', () => {
  beforeEach(() => {
    setupDom();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const createGame = () =>
    new Game({
      boardEl: document.getElementById('game-board'),
      scoreEl: document.getElementById('score'),
      missEl: document.getElementById('misses'),
      messageEl: document.getElementById('message'),
    });

  test('клик по гоблину добавляет балл', () => {
    const game = createGame();
    game.start();
    game.goblin.element.dispatchEvent(new MouseEvent('click'));
    expect(game.scoreboard.score).toBe(1);
  });

  test('игра завершается после 5 промахов', () => {
    const game = createGame();
    game.start();
    jest.advanceTimersByTime(1000 * 5);
    expect(game.scoreboard.misses).toBe(5);
    expect(game.running).toBe(false);
    expect(document.getElementById('message').textContent).toContain('окончена');
  });
});