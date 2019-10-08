export interface IPoints {
    updatePoints(event: any): void;
    getPoints(): number;
}

class Points {
    private points: number = 0;
    private pointsHTML: HTMLElement = document.getElementById('points-info');
    private pointsInfoHTML: HTMLElement = this.pointsHTML.querySelector('span');

    getPoints(): number {
        return this.points;
    }

    updatePoints(event: any): void {
        this.calculatePoints(event);
        this.showActualPoints();
    }

    private calculatePoints(event: any): void {
        event.target.classList.contains('active') ? ++this.points : --this.points;
    }

    resetPoints(): void {
        this.points = 0;
        this.pointsInfoHTML.innerHTML = '-';
    }

    showActualPoints(): void {
        this.pointsInfoHTML.innerHTML = this.points.toString();
    }
}

export default Points;