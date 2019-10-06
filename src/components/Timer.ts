import { IGame } from "../components/Game";

class Timer {
    private elapsedSeconds: number = 0;
    private timeLimit: number;
    private timeHTML: HTMLElement = document.getElementById('time-info');
    private timeInfoHTML: HTMLElement = this.timeHTML.querySelector('span');
    private observers: IGame[] = [];

    constructor(timeLimit: number = 60) {
        this.timeLimit = timeLimit;
    }

    addObserver(observer: IGame): void {
        this.observers.push(observer);
    }

    private notify(): void {
        this.observers.forEach((observer) => {
            observer.endGame();
        });
    }

    runTimer(): void {
        setInterval(() => {
            this.elapsedSeconds++;
            this.timeInfoHTML.innerHTML = this.elapsedSeconds.toString();
            if (this.elapsedSeconds === this.timeLimit) {
                this.notify();
            }
        }, 1000);
    }
}

export default Timer;