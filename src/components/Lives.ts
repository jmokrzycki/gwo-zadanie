import { IGame } from "../components/Game";

class Lives {
    private livesAmount: number;
    private livesHTML: HTMLElement = document.getElementById('lives-info');
    private livesInfoHTML: HTMLElement = this.livesHTML.querySelector('span');
    private observers: IGame[] = [];

    constructor(livesAmount: number = 3) {
        this.livesAmount = livesAmount;
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
        return this.livesAmount;
    }

    updateLives(): void {
        this.livesAmount--;
        this.showActualLives();
        if (this.livesAmount === 0) {
            this.notify();
        }
    }

    resetLives(): void {
        this.livesAmount = 0;
        this.livesInfoHTML.innerHTML = '-';
    }

    showActualLives(): void {
        this.livesInfoHTML.innerHTML = this.livesAmount.toString();
    }
}

export default Lives;