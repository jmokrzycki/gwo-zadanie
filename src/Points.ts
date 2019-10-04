import Lives from './Lives';

class Points {
    private points: number = 0;
    private l = new Lives(3);

    getPoints(): number {
        return this.points;
    }

    makeClickable(): void {
        let elements = document.querySelectorAll('.board .square');

        elements.forEach((element: HTMLElement, index: number) => {
            element.addEventListener('click', this.squareOnClick.bind(this));
        });
    }

    private squareOnClick(event: any): void {
        let list = event.target.classList,
            element = document.querySelector('#points-info span');
        this.calculatePoints(list);
        this.l.updateLives();
        element.innerHTML = this.points.toString();
    }

    private calculatePoints(list: any): void {
        list.contains('active') ? ++this.points : --this.points;
    }
}

export default Points;