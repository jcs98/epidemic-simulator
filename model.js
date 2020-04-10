let PHI = 0.1;
let PIH = 0.1;
let REPULSE = 0.1;
let FPS = 12;


let paused = false;
let days;
const POP_SIZE = 1000;
let population;

const directions = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT" };



function setupPopulation() {
    days = 0;

    population = [];

    for (let i = 0; i < POP_SIZE; i++) {
        let boxNo = i % BOXES.length;
        population[i] = createVector(randomIntFromRange(BOXES[boxNo].x1, BOXES[boxNo].x2),
            randomIntFromRange(BOXES[boxNo].y1, BOXES[boxNo].y2));
    }

    // Start with pause
    if (!paused)
        togglePause();
}

function nextRound() {
    days++;
    console.log(days);

    moveRandomly(population);
}

function moveRandomly(pop) {
    for (let i = 0; i < POP_SIZE; i++) {
        let boxNo = i % BOXES.length;
        let dir = Object.keys(directions)[randomIntFromRange(0, 3)];
        move(pop[i], dir, BOXES[boxNo]);
    }
}

function move(person, direction, box) {
    let newX = -1, newY = -1;

    if (direction === directions.UP) {
        newX = person.x;
        newY = person.y - 3;
    }

    if (direction === directions.DOWN) {
        newX = person.x;
        newY = person.y + 3;
    }

    if (direction === directions.LEFT) {
        newX = person.x - 3;
        newY = person.y;
    }

    if (direction === directions.RIGHT) {
        newX = person.x + 3;
        newY = person.y;
    }

    if (newX > box.x1 && newX < box.x2 && newY > box.y1 && newY < box.y2) {
        person.x = newX;
        person.y = newY;
    }

}
