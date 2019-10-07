class Points {
    private points: number = 0;
    private pointsHTML: HTMLElement = document.getElementById('points-info');
    private pointsInfoHTML: HTMLElement = this.pointsHTML.querySelector('span');

    getPoints(): number {
        return this.points;
    }

    updatePoints(event: any): void {
        let eventTarget = event.target;
        this.calculatePoints(eventTarget);
        this.pointsInfoHTML.innerHTML = this.points.toString();
    }

    private calculatePoints(eventTarget: any): void {
        eventTarget.classList.contains('active') ? ++this.points : --this.points;
    }

    resetPoints(): void {
        this.points = 0;
        this.pointsInfoHTML.innerHTML = '-';
    }
}

export default Points;