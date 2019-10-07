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
    board = new Board(25);
    points = new Points();
    timer = new Timer(5);
    lives = new Lives();
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
        this.gameCycle();
        this.gameInterval = setInterval(this.gameCycle.bind(this), 2000);
    }

    gameCycle(): void {
        let selectedNumber = Math.floor(Math.random() * 25),
            elements = document.querySelectorAll('#board .square'),
            element = elements[selectedNumber];

        elements.forEach(((element) => {
            element.classList.remove('active');
        }));
        element.classList.add('active');
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

    makeClickable(): void {
        let elements = document.querySelectorAll('#board .square');

        elements.forEach((element: HTMLElement, index: number) => {
            element.addEventListener('click', this.squareOnClick.bind(this));
        });
    }

    private squareOnClick(event: any): void {
        this.points.updatePoints(event);
        this.lives.updateLives();
    }

    startButtonInitialize(): void {
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    resetButtonInitialize(): void {
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
    }

    startGame(): void {
        this.makeClickable();
        this.runGame();
        this.timer.runTimer();
        this.resetButton.disabled = false;
        this.startButton.disabled = true;
    }

    resetGame(): void {
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