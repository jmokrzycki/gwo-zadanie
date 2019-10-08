import { IPoints } from './Points';
import { ILives } from './Lives';

class Board {
    private squaresAmount: number;
    private boardHTML: HTMLElement = document.getElementById('board');
    private squaresHTML: any;
    private points: IPoints;
    private lives: ILives;

    constructor(squaresAmount: number = 25, points: IPoints, lives: ILives) {
        this.squaresAmount = squaresAmount;
        this.points = points;
        this.lives = lives;
        this.squareOnClick = this.squareOnClick.bind(this);
    }

    generateSquares(): void {
        for (; this.squaresAmount--; this.squaresAmount >= 0) {
            const square = document.createElement("div");
            square.className += 'square';
            this.boardHTML.appendChild(square);
        }
        this.squaresHTML = this.boardHTML.querySelectorAll('.square');
    }

    makeSquaresClickable(): void {
        this.squaresHTML.forEach((element: HTMLElement) => {
            element.addEventListener('click', this.squareOnClick);
        });
    }

    boardCycle(): void {
        let selectedNumber = Math.floor(Math.random() * 25),
            elements = document.querySelectorAll('#board .square'),
            element = elements[selectedNumber];

        elements.forEach(((element) => {
            element.classList.remove('active');
        }));
        element.classList.add('active');
    }



    makeSquaresUnclickable(): void {
        this.squaresHTML.forEach((element: HTMLElement) => {
            element.removeEventListener('click', this.squareOnClick);
        });
    }

    squareOnClick(event: any): void {
        this.points.updatePoints(event);
        this.lives.updateLives(event);
    }

    resetSquares(): void {
        this.squaresHTML.forEach(((element) => {
            element.classList.remove('active');
        }));
        this.makeSquaresUnclickable();
    }
}

export default Board;