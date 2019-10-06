class Board {
    private squaresAmount: number;
    private boardHTML: HTMLElement = document.getElementById('board');

    constructor(squaresAmount: number = 25) {
        this.squaresAmount = squaresAmount;
    }

    generateSquares() {
        for (; this.squaresAmount--; this.squaresAmount >= 0) {
            const square = document.createElement("div");
            square.className += 'square';
            this.boardHTML.appendChild(square);
        }
    }
}

export default Board;