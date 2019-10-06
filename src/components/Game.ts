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
    b = new Board(25);
    p = new Points();
    t = new Timer(5);
    l = new Lives();
    private endHTML: HTMLElement = document.getElementById('end-info');
    private endInfoHTML: any = this.endHTML.querySelector('span');

    init() {
        this.b.generateSquares();

        this.makeClickable();

        this.runGame();
        this.t.runTimer();

        this.l.addObserver(this);
        this.t.addObserver(this);
    }

    runGame(): void {
        setInterval(() => {
            let selectedNumber = Math.floor(Math.random() * 25),
                elements = document.querySelectorAll('#board .square'),
                element = elements[selectedNumber];

            elements.forEach(((element) => {
                element.classList.remove('active');
            }));

            element.classList.add('active');
        }, 2000);
    }

    endGame() {
        this.endHTML.classList.remove("hidden");
        this.endInfoHTML.innerHTML = this.p.getPoints();
    }

    makeClickable(): void {
        let elements = document.querySelectorAll('#board .square');

        elements.forEach((element: HTMLElement, index: number) => {
            element.addEventListener('click', this.squareOnClick.bind(this));
        });
    }

    private squareOnClick(event: any): void {
        this.p.updatePoints(event);
        this.l.updateLives();
    }
}

export default Game;