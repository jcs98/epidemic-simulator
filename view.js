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

    drawPopulation();

    nextRound();
}

function drawPopulation() {
    fill(0, 123, 255);

    for (let i = 0; i < population.length; i++) {
        ellipse(population[i].x, population[i].y, 10, 10);
    }
}
