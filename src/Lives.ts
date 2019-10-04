class Lives {
    livesAmount: number;

    constructor(livesAmount: number = 1) {
        this.livesAmount = livesAmount;
    }

    getLives(): number {
        return this.livesAmount;
    }

    updateLives() {
        let element = document.querySelector('#lives-info span');

        this.livesAmount--;
        element.innerHTML = this.livesAmount.toString();
    }
}

export default Lives;