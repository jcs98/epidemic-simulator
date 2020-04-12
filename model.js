let PHI = 0.03;
const INFECTION_RADIUS = 20;

let PID = 0.2;
const INFECTION_DAYS = 280;

let REPULSE = 0.1;
let FPS = 12;


let paused = false;
let days;
const POP_SIZE = 300;
let population;

const directions = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT" };
const DIRECTION_CHANGE_PROB = 0.3;
const status = { HEALTHY: "HEALTHY", INFECTED: "INFECTED", DECEASED: "DECEASED" };

let travelPlan = { personIndex: -1, destinationX: -1, destinationY: -1 };
let PTRAVEL = 0.7;

// for graph
let daysData;
let healthyData;
let infectedData;
let deceasedData;

function setupPopulation() {
    days = 0;

    population = [];

    daysData = [];
    healthyData = [];
    infectedData = [];
    deceasedData = [];

    for (let i = 0; i < POP_SIZE; i++) {
        let boxNo = i % BOXES.length;
        population[i] = createVector(randomIntFromRange(BOXES[boxNo].x1, BOXES[boxNo].x2),
            randomIntFromRange(BOXES[boxNo].y1, BOXES[boxNo].y2));
        let dir = Object.keys(directions)[randomIntFromRange(0, 3)];
        population[i].dir = dir;
        population[i].status = status.HEALTHY;
        population[i].box = BOXES[boxNo];
    }

    updateStats();

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

        if (person.status !== status.DECEASED) {
            if (random() < REPULSE) {
                person.dir = getSafestDirection(person);
            }
            // randomly change direction
            else if (random() < DIRECTION_CHANGE_PROB) {
                let dir = Object.keys(directions)[randomIntFromRange(0, 3)];
                person.dir = dir;
            }

            move(person, person.dir, person.box);
        }
    }

    // random migrations
    migrate();

    updateStats();
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

// returns the direction opposite to the closest neighbor
function getSafestDirection(person) {
    let leftClosest = 999, rightClosest = 999, upClosest = 999, downClosest = 999;

    population.forEach(p => {
        if (person.box === p.box) {
            let d = dist(person.x, person.y, p.x, p.y);
            if (p.x < person.x && leftClosest > d)
                leftClosest = d;
            if (p.x > person.x && rightClosest > d)
                rightClosest = d;
            if (p.y > person.y && upClosest > d)
                upClosest = d;
            if (p.y < person.y && downClosest > d)
                downClosest = d;
        }
    });

    let closest = leftClosest;
    let safestDir = directions.RIGHT;
    if (rightClosest < closest) {
        closest = rightClosest;
        safestDir = directions.LEFT;
    }
    if (upClosest < closest) {
        closest = upClosest;
        safestDir = directions.DOWN;
    }
    if (downClosest < closest) {
        closest = downClosest;
        safestDir = directions.UP;
    }

    return safestDir;
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

function updateStats() {
    let healthyCount = 0;
    let infectedCount = 0;
    let deceasedCount = 0;

    population.forEach(person => {
        if (person.status == status.HEALTHY)
            healthyCount++;
        if (person.status == status.INFECTED)
            infectedCount++;
        if (person.status == status.DECEASED)
            deceasedCount++;
    });

    if (days % 50 === 0 || infectedCount <= 0) {
        daysData.push(days);
        healthyData.push(healthyCount);
        infectedData.push(infectedCount);
        deceasedData.push(deceasedCount);
        drawGraph();

        if (infectedCount <= 0) {
            // epidemic eradicated
            togglePause();
        }
    }

}
