import Points from './Points';
import Timer from './Timer';


const p = new Points();
const t = new Timer(60);

document.addEventListener("DOMContentLoaded", function (event) {
    p.makeClickable();
    runGame();
    t.runTimer();
});

function runGame(): void {
    setInterval(() => {
        let selectedNumber = Math.floor(Math.random() * 25),
            elements = document.querySelectorAll('.board .square'),
            element = elements[selectedNumber];

        elements.forEach(((element) => {
            element.classList.remove('active');
        }));

        element.classList.add('active');
    }, 2000);
}