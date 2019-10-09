import { IGame } from "../components/Game";

class Timer {
    private elapsedSeconds: number = 0;
    private timeLimit: number;
    private timeHTML: HTMLElement = document.getElementById("time-info");
    private timeInfoHTML: HTMLElement = this.timeHTML.querySelector("span");
    private timeInterval: any;
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
        this.timeCycle();
        this.timeInterval = setInterval(this.timeCycle.bind(this), 1000);
    }

    private timeCycle(): void {
        if (this.elapsedSeconds === this.timeLimit) {
            this.notify();
        }
        this.timeInfoHTML.innerHTML = this.elapsedSeconds.toString();
        this.elapsedSeconds++;
    }

    resetTimer(): void {
        clearInterval(this.timeInterval);
        this.elapsedSeconds = 0;
        this.timeInfoHTML.innerHTML = "-";
    }
}

export default Timer;