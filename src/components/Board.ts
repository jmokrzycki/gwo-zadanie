import { IPoints } from "./Points";
import { ILives } from "./Lives";

class Board {
    private squaresAmount: number;
    private boardHTML: HTMLElement = document.getElementById("board");
    private squaresHTML: any;
    private points: IPoints;
    private lives: ILives;
    private gameInterval: any;
    private deactivateSquareAndTakeLifeTimeout: any;
    private firstCycle: any;
    private activeSquare: any;

    constructor(points: IPoints, lives: ILives, squaresAmount: number = 25) {
        this.squaresAmount = squaresAmount;
        this.points = points;
        this.lives = lives;
        this.squareOnClick = this.squareOnClick.bind(this);
    }

    generateSquares(): void {
        for (let i = this.squaresAmount; i--; i >= 0) {
            const square = document.createElement("div");
            square.className += "square";
            this.boardHTML.appendChild(square);
        }
        this.squaresHTML = this.boardHTML.querySelectorAll(".square");
    }

    makeSquaresClickable(): void {
        this.squaresHTML.forEach((element: HTMLElement) => {
            element.addEventListener("click", this.squareOnClick);
        });
    }

    boardCycle(): void {
        const selectedNumber = Math.floor(Math.random() * this.squaresAmount);

        this.activeSquare = this.squaresHTML[selectedNumber];
        this.activeSquare.classList.add("active");
        this.deactivateSquareAndTakeLifeTimeout = setTimeout(
            this.deactivateSquareAndTakeLife.bind(this),
            2000
        );
    }

    private deactivateSquareAndTakeLife() {
        if (!this.isSquareClicked() && !this.firstCycle) {
            this.lives.takeLife();
        }
        this.squaresHTML.forEach(((square) => {
            square.classList.remove("clicked");
        }));
        this.squaresHTML.forEach(((square) => {
            square.classList.remove("active");
        }));
    }

    isSquareClicked(): boolean {
        return this.boardHTML.querySelectorAll(".square.clicked").length === 1;
    }

    startBoardCycle(): void {
        this.firstCycle = true;
        this.boardCycle();
        this.firstCycle = false;
        this.gameInterval = setInterval(this.boardCycle.bind(this), 5000);
    }

    resetBoardCycle(): void {
        clearInterval(this.gameInterval);
        clearTimeout(this.deactivateSquareAndTakeLifeTimeout);
    }

    makeSquaresUnclickable(): void {
        this.squaresHTML.forEach((element: HTMLElement) => {
            element.removeEventListener("click", this.squareOnClick);
        });
    }

    private squareOnClick(event: any): void {
        this.points.updatePoints(event);
        this.lives.updateLives(event);
        if (event.target.classList.contains("active")) {
            event.target.classList.add("clicked");
        }
    }

    resetSquares(): void {
        this.squaresHTML.forEach(((element) => {
            element.classList.remove("active");
        }));
        this.makeSquaresUnclickable();
    }
}

export default Board;