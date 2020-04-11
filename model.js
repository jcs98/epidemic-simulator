let PHI = 0.01;
const INFECTION_RADIUS = 20;

let PID = 0.4;
const INFECTION_DAYS = 280;

let REPULSE = 0.1;
let FPS = 12;


let paused = false;
let days;
const POP_SIZE = 600;
let population;

const directions = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT" };
const DIRECTION_CHANGE_PROB = 0.3;
const status = { HEALTHY: "HEALTHY", INFECTED: "INFECTED", DECEASED: "DECEASED" };

let travelPlan = { personIndex: -1, destinationX: -1, destinationY: -1 };
let PTRAVEL = 0.7;

function setupPopulation() {
    days = 0;

    population = [];

    for (let i = 0; i < POP_SIZE; i++) {
        let boxNo = i % BOXES.length;
        population[i] = createVector(randomIntFromRange(BOXES[boxNo].x1, BOXES[boxNo].x2),
            randomIntFromRange(BOXES[boxNo].y1, BOXES[boxNo].y2));
        let dir = Object.keys(directions)[randomIntFromRange(0, 3)];
        population[i].dir = dir;
        population[i].status = status.HEALTHY;
        population[i].box = BOXES[boxNo];
    }

    // Randomly infect one
    let p = population[floor(random(POP_SIZE))];
    p.status = status.INFECTED;
    p.infectedDays = 0;

    // Start with pause
    if (!paused)
        togglePause();
}

function nextRound() {
    days++;
    console.log(days);

    for (let i = 0; i < population.length; i++) {
        let person = population[i];

        // if infected -> infect nearby, try to heal
        if (person.status == status.INFECTED) {
            person.infectedDays++;
            infectNearby(person);
            tryToHeal(person);
        }

        // if not deceased, move randomly
        if (person.status !== status.DECEASED) {
            // randomly change direction
            if (random() < DIRECTION_CHANGE_PROB) {
                let dir = Object.keys(directions)[randomIntFromRange(0, 3)];
                person.dir = dir;
            }

            move(person, person.dir, person.box);
        }
    }

    // random migrations
    migrate();
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

function infectNearby(infected) {
    population.forEach(person => {
        if (person.status == status.HEALTHY
            && dist(infected.x, infected.y, person.x, person.y) <= INFECTION_RADIUS) {
            if (random() < PHI) {
                person.status = status.INFECTED;
                person.infectedDays = 0;
            }
        }
    });
}

function tryToHeal(person) {
    if (person.infectedDays > INFECTION_DAYS) {
        if (random() < PID)
            person.status = status.DECEASED;
        else
            person.status = status.HEALTHY;
    }
}

function migrate() {
    if (travelPlan.personIndex < 0) {
        // if noone migrating, pick someone randomly to migrate with certain probability
        if (random() < PTRAVEL) {
            let personI = floor(random(POP_SIZE));
            if (population[personI].status !== status.DECEASED) {
                let newBox = BOXES[floor(random(BOXES.length))];
                population[personI].box = newBox;

                travelPlan.personIndex = personI;
                travelPlan.destinationX = floor((newBox.x1 + newBox.x2) / 2);
                travelPlan.destinationY = floor((newBox.y1 + newBox.y2) / 2);
            }
        }
    }
    else {
        // move the currently migrating person towards destination
        let moved = false;
        let person = population[travelPlan.personIndex];
        if (person.x + 20 < travelPlan.destinationX) {
            person.x += 10;
            moved = true;
        }
        if (person.x - 20 > travelPlan.destinationX) {
            person.x -= 10;
            moved = true;
        }
        if (person.y + 20 < travelPlan.destinationY) {
            person.y += 10;
            moved = true;
        }
        if (person.y - 20 > travelPlan.destinationY) {
            person.y -= 10;
            moved = true;
        }

        // reached destination
        if (!moved)
            travelPlan.personIndex = -1;
    }
}
