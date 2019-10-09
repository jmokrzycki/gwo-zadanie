import { IPoints } from "./Points";

class EndGameSummary {
    private endGameSummaryHTML: HTMLElement = document.getElementById("end-info");
    private endGameSummaryInfoHTML: HTMLSpanElement = this.endGameSummaryHTML.querySelector("span");
    private points: IPoints;

    constructor(points: IPoints) {
        this.points = points;
    }

    show(): void {
        this.endGameSummaryHTML.classList.remove("hidden");
        this.endGameSummaryInfoHTML.innerHTML = this.points.getPoints().toString();
    }

    hide(): void {
        this.endGameSummaryHTML.classList.add("hidden");
    }
}

export default EndGameSummary;