class Board {
    private squaresAmount: number;
    private boardHTML: HTMLElement = document.getElementById('board');
    private squaresHTML: any;
    constructor(squaresAmount: number = 25) {
        this.squaresAmount = squaresAmount;
    }

    generateSquares(): void {
        for (; this.squaresAmount--; this.squaresAmount >= 0) {
            const square = document.createElement("div");
            square.className += 'square';
            this.boardHTML.appendChild(square);
        }
        this.squaresHTML = this.boardHTML.querySelectorAll('.square')
    }

    resetSquares(): void {
        this.squaresHTML.forEach(((element) => {
            element.classList.remove('active');
        }));
    }
}

export default Board;