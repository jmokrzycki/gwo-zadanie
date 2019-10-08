import Points from './Points';
import Timer from './Timer';
import Board from './Board';
import Lives from './Lives';
import EndGameSummary from './EndGameSummary';

export interface IGame {
    endGame(): void;
}

class Game implements IGame {
    points = new Points();
    timer = new Timer(5);
    lives = new Lives();
    board = new Board(25, this.points, this.lives);
    endGameSummary = new EndGameSummary(this.points);
    private startButton: any = document.getElementById('start');
    private resetButton: any = document.getElementById('reset');
    private gameInterval: any;

    init(): void {
        this.startButtonInitialize();
        this.resetButtonInitialize();
        this.board.generateSquares();
        this.lives.addObserver(this);
        this.timer.addObserver(this);
    }

    startButtonInitialize(): void {
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    resetButtonInitialize(): void {
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
    }

    startGame(): void {
        this.endGameSummary.hide();
        this.timer.runTimer();
        this.points.showActualPoints();
        this.lives.showActualLives();
        this.board.boardCycle();
        this.board.makeSquaresClickable();
        this.gameInterval = setInterval(this.board.boardCycle.bind(this), 2000);
        this.resetButton.disabled = false;
        this.startButton.disabled = true;
    }

    resetGame(): void {
        this.timer.resetTimer();
        this.points.resetPoints();
        this.lives.resetLives();
        this.board.resetSquares();
        this.board.makeSquaresUnclickable();
        clearInterval(this.gameInterval);
        this.resetButton.disabled = true;
        this.startButton.disabled = false;
    }

    endGame(): void {
        this.endGameSummary.show();
        this.resetGame()
    }
}

export default Game;