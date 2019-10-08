import { IGame } from "../components/Game";

export interface ILives {
    updateLives(event: any): any;
}

class Lives {
    private livesInitial: number;
    private livesLeft: number;
    private livesHTML: HTMLElement = document.getElementById('lives-info');
    private livesInfoHTML: HTMLElement = this.livesHTML.querySelector('span');
    private observers: IGame[] = [];

    constructor(livesInitial: number = 3) {
        this.livesInitial = livesInitial;
        this.livesLeft = livesInitial;
    }

    addObserver(observer: IGame): void {
        this.observers.push(observer);
    }

    private notify(): void {
        this.observers.forEach((observer) => {
            observer.endGame();
        });
    }

    getLives(): number {
        return this.livesLeft;
    }

    updateLives(event: any): void {
        if (!event.target.classList.contains('active')) {
            this.livesLeft--;
        }
        this.showActualLives();
        if (this.livesLeft === 0) {
            this.notify();
        }
    }

    resetLives(): void {
        this.livesLeft = this.livesInitial;
        this.livesInfoHTML.innerHTML = '-';
    }

    showActualLives(): void {
        this.livesInfoHTML.innerHTML = this.livesLeft.toString();
    }
}

export default Lives;