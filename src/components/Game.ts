import Points from "./Points";
import Timer from "./Timer";
import Board from "./Board";
import Lives from "./Lives";
import EndGameSummary from "./EndGameSummary";
import LostLifeInfo from './LostLifeInfo';

export interface IGame {
    endGame(): void;
}

class Game implements IGame {
    private lostLifeInfo = new LostLifeInfo();
    private points = new Points();
    private timer = new Timer();
    private lives = new Lives(this.lostLifeInfo);
    private endGameSummary = new EndGameSummary(this.points);
    private board = new Board(this.points, this.lives, 25);
    private startButton: any = document.getElementById("start");
    private resetButton: any = document.getElementById("reset");

    init(): void {
        this.startButtonInitialize();
        this.resetButtonInitialize();
        this.board.generateSquares();
        this.lives.addObserver(this);
        this.timer.addObserver(this);
    }

    private startButtonInitialize(): void {
        this.startButton.addEventListener("click", this.startGame.bind(this));
    }

    private resetButtonInitialize(): void {
        this.resetButton.addEventListener("click", this.resetGame.bind(this));
    }

    startGame(): void {
        this.endGameSummary.hide();
        this.timer.runTimer();
        this.points.showActualPoints();
        this.lives.showActualLives();
        this.board.startBoardCycle();
        this.board.makeSquaresClickable();
        this.resetButton.disabled = false;
        this.startButton.disabled = true;
    }

    resetGame(): void {
        this.timer.resetTimer();
        this.points.resetPoints();
        this.lives.resetLives();
        this.board.resetSquares();
        this.board.makeSquaresUnclickable();
        this.board.resetBoardCycle();
        this.resetButton.disabled = true;
        this.startButton.disabled = false;
    }

    endGame(): void {
        this.lostLifeInfo.clearHideInfoTimeouts();
        this.endGameSummary.show();
        this.resetGame()
    }
}

export default Game;