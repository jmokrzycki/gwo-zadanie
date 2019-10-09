export interface ILostLifeInfo {
    show(): void;
    hide(): void;
}

class LostLifeInfo {
    private endGameSummaryHTML: HTMLElement = document.getElementById("game-info");
    private endGameSummaryInfoHTML: HTMLSpanElement = this.endGameSummaryHTML.querySelector("span");
    private hideLostLifeTimeoutsList: any[] = [];

    clearHideInfoTimeouts() {
        this.hideLostLifeTimeoutsList.forEach((lostLifeTimeout) => {
            clearTimeout(lostLifeTimeout);
        });
        this.hideLostLifeTimeoutsList = [];
    }

    show(): void {
        this.endGameSummaryHTML.classList.remove("hidden");
        this.endGameSummaryInfoHTML.innerHTML = "Straciłeś życie";
        this.hideLostLifeTimeoutsList.push(
            setTimeout(this.hide.bind(this), 1000)
        );
    }

    hide(): void {
        this.endGameSummaryHTML.classList.add("hidden");
    }
}

export default LostLifeInfo;