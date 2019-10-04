class Timer {
    private elapsedSeconds: number = 0;
    private timeLimit: number;

    constructor(timeLimit: number = 30) {
        this.timeLimit = timeLimit;
    }

    runTimer(): void {
        let element = document.querySelector('#time-info span');

        setInterval(() => {
            this.elapsedSeconds++;
            element.innerHTML = this.elapsedSeconds.toString();
        }, 1000);
    }
}

export default Timer;