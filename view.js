const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 650;

const BOXES = [
    { x1: 30, y1: 30, x2: 300, y2: 300 },
    { x1: 330, y1: 30, x2: 600, y2: 300 },
    { x1: 630, y1: 30, x2: 900, y2: 300 },

    { x1: 30, y1: 330, x2: 300, y2: 600 },
    { x1: 330, y1: 330, x2: 600, y2: 600 },
    { x1: 630, y1: 330, x2: 900, y2: 600 }
]


function setup() {
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('canvas-container');
    setupPopulation();
}

function draw() {
    background(0);
    frameRate(FPS);

    BOXES.forEach(box => {
        fill(0);
        strokeWeight(3);
        stroke(255);
        rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
        stroke(0);
        strokeWeight(1);
    });

    drawPopulation();

    nextRound();
}

function drawPopulation() {

    for (let i = 0; i < population.length; i++) {
        const person = population[i];

        if (person.status == status.HEALTHY)
            fill(0, 123, 255);
        if (person.status == status.INFECTED) {
            noFill();
            stroke(150, 53, 69);
            ellipse(person.x, person.y, INFECTION_RADIUS, INFECTION_RADIUS);
            stroke(0);
            fill(220, 53, 69);
        }
        if (person.status == status.DECEASED)
            fill(123, 123, 123);
        ellipse(person.x, person.y, 10, 10);
    }
}
