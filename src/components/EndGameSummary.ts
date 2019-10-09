import { IPoints } from "./Points";

class EndGameSummary {
    private endGameSummaryHTML: HTMLElement = document.getElementById("game-info");
    private endGameSummaryInfoHTML: HTMLSpanElement = this.endGameSummaryHTML.querySelector("span");
    private points: IPoints;

    constructor(points: IPoints) {
        this.points = points;
    }

    show(): void {
        const pointsAmount = this.points.getPoints(),
            summary = `Gra zakończona. Zdobyte punky: ${pointsAmount}`;

        this.endGameSummaryHTML.classList.remove("hidden");
        this.endGameSummaryInfoHTML.innerHTML = summary;
    }

    hide(): void {
        this.endGameSummaryHTML.classList.add("hidden");
    }
}

export default EndGameSummary;