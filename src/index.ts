

document.addEventListener("DOMContentLoaded", function (event) {
    makeClickable();

    runGame(25);
});

function makeClickable(): void {
    var elements = document.querySelectorAll('.board .square');
    elements.forEach((element, index) => {
        element.addEventListener('click', squareOnClick);
    });
}

function squareOnClick(event) {
    let list = event.target.classList;

    if (list.contains('active')) {
        return;
    }
}



function runGame(amountOfSquares) {
    setInterval(() => {
        var selectedNumber = Math.floor(Math.random() * amountOfSquares);
        var elements = document.querySelectorAll('.board .square');

        elements.forEach(((element) => {
            element.classList.remove('active');
        }));
        var element = document.querySelectorAll('.board .square')[selectedNumber];
        element.classList.add('active');
    }, 2000);
}