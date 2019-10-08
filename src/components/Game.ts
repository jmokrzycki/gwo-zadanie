import Points from './Points';
import Timer from './Timer';
import Board from './Board';
import Lives from './Lives';

export interface IGame {
    init(): void;
    runGame(): void;
    endGame(): void;
}

class Game implements IGame {
    points = new Points();
    timer = new Timer(5);
    lives = new Lives();
    board = new Board(25, this.points, this.lives);
    private startButton: any = document.getElementById('start');
    private resetButton: any = document.getElementById('reset');
    private endHTML: HTMLElement = document.getElementById('end-info');
    private endInfoHTML: HTMLSpanElement = this.endHTML.querySelector('span');
    private gameInterval: any;

    init(): void {
        this.board.generateSquares();

        this.lives.addObserver(this);
        this.timer.addObserver(this);

        this.startButtonInitialize();
        this.resetButtonInitialize();
    }

    runGame(): void {
        this.points.showActualPoints();
        this.lives.showActualLives();
        this.board.boardCycle();
        this.gameInterval = setInterval(this.board.boardCycle.bind(this), 2000);
    }

    endGame(): void {
        this.showGameSummary();
        this.resetGame()
    }

    showGameSummary(): void {
        this.endHTML.classList.remove("hidden");
        this.endInfoHTML.innerHTML = this.points.getPoints().toString();
    }

    hideGameSummary(): void {
        this.endHTML.classList.add("hidden");
    }

    startButtonInitialize(): void {
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    resetButtonInitialize(): void {
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
    }

    startGame(): void {
        this.hideGameSummary();
        this.board.makeSquaresClickable();
        this.runGame();
        this.timer.runTimer();
        this.resetButton.disabled = false;
        this.startButton.disabled = true;
    }

    resetGame(): void {
        this.board.makeSquaresUnclickable();
        this.timer.resetTimer();
        this.points.resetPoints();
        this.lives.resetLives();
        this.board.resetSquares();
        clearInterval(this.gameInterval);
        this.resetButton.disabled = true;
        this.startButton.disabled = false;
    }
}

export default Game;