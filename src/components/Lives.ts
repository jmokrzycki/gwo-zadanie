import { IGame } from "../components/Game";
import { ILostLifeInfo } from './LostLifeInfo';

export interface ILives {
    updateLives(event: any): any;
    takeLife(): any;
}

class Lives {
    private livesInitial: number;
    private livesLeft: number;
    private livesHTML: HTMLElement = document.getElementById("lives-info");
    private livesInfoHTML: HTMLElement = this.livesHTML.querySelector("span");
    private observers: IGame[] = [];
    private lostLifeInfo: ILostLifeInfo;

    constructor(lostLifeInfo: ILostLifeInfo, livesInitial: number = 3) {
        this.livesInitial = livesInitial;
        this.livesLeft = livesInitial;
        this.lostLifeInfo = lostLifeInfo;
    }

    addObserver(observer: IGame): void {
        this.observers.push(observer);
    }

    private notify(): void {
        this.observers.forEach((observer) => {
            observer.endGame();
        });
    }

    updateLives(event: any): void {
        if (!event.target.classList.contains("active")) {
            this.takeLife();
        }
    }

    takeLife(): void {
        this.livesLeft--;
        this.showActualLives();
        if (this.livesLeft === 0) {
            this.notify();
        } else {
            this.lostLifeInfo.show();
        }
    }

    resetLives(): void {
        this.livesLeft = this.livesInitial;
        this.livesInfoHTML.innerHTML = "-";
    }

    showActualLives(): void {
        this.livesInfoHTML.innerHTML = this.livesLeft.toString();
    }
}

export default Lives;