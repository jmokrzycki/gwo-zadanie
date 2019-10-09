import { IPoints } from "./Points";
import { ILives } from "./Lives";

class Board {
    private squaresAmount: number;
    private boardHTML: HTMLElement = document.getElementById("board");
    private squaresHTML: any;
    private points: IPoints;
    private lives: ILives;
    private gameInterval: any;

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

    boardCycle(firstRun: boolean = false): void {
        let selectedNumber = Math.floor(Math.random() * this.squaresAmount),
            element = this.squaresHTML[selectedNumber];

        this.squaresHTML.forEach(((element) => {
            element.classList.remove("active");
        }));
        if (!this.checkSquareIsClicked() && !firstRun) {
            this.lives.takeLife();
        }
        this.squaresHTML.forEach(((element) => {
            element.classList.remove("clicked");
        }));
        element.classList.add("active");
    }

    checkSquareIsClicked(): boolean {
        return this.boardHTML.querySelectorAll(".square.clicked").length === 1;
    }

    startBoardCycle(): void {
        this.boardCycle(true);
        this.gameInterval = setInterval(this.boardCycle.bind(this), 2000);
    }

    resetBoardCycle(): void {
        clearInterval(this.gameInterval);
    }

    makeSquaresUnclickable(): void {
        this.squaresHTML.forEach((element: HTMLElement) => {
            element.removeEventListener("click", this.squareOnClick);
        });
    }

    squareOnClick(event: any): void {
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