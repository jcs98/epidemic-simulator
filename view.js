const CANVAS_WIDTH = 950;
const CANVAS_HEIGHT = 650;

const MOBILE_CANVAS_WIDTH = 330;
const MOBILE_CANVAS_HEIGHT = 330;

const colors = { HEALTHY: "rgb(0, 123, 255)", INFECTED: "rgb(220, 53, 69)", DECEASED: "rgb(123, 123, 123)" }

const BOXES = [
    { x1: 30, y1: 30, x2: 300, y2: 300 },
    { x1: 330, y1: 30, x2: 600, y2: 300 },
    { x1: 630, y1: 30, x2: 900, y2: 300 },

    // { x1: 30, y1: 330, x2: 300, y2: 600 },
    { x1: 330, y1: 330, x2: 600, y2: 600 },
    { x1: 630, y1: 330, x2: 900, y2: 600 }
]

const HOSPITAL = { x1: 30 + 20, y1: 330 + 20, x2: 300 - 20, y2: 600 - 20 };


function setup() {
    console.log($(window).width());

    let canvas;
    if (onMobile()) {
        canvas = createCanvas(MOBILE_CANVAS_WIDTH, MOBILE_CANVAS_HEIGHT);
        BOXES.splice(4, 1);
        BOXES.splice(2, 1);
    }
    else {
        canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    canvas.parent("canvas-container");
    setGraphOptions();
    setupControls();
    setupPopulation();
}

function draw() {
    if (onMobile()) {
        scale(0.5);
    }

    background(0);
    frameRate(FPS);

    fill(0);
    strokeWeight(3);
    stroke(255);

    BOXES.forEach(box => {
        rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);

        // central location
        rect(
            (box.x1 + box.x2) / 2 - 10,
            (box.y1 + box.y2) / 2 - 10,
            ((box.x1 + box.x2) / 2 + 10) - ((box.x1 + box.x2) / 2 - 10),
            ((box.y1 + box.y2) / 2 + 10) - ((box.y1 + box.y2) / 2 - 10)
        );
    });

    rect(HOSPITAL.x1, HOSPITAL.y1, HOSPITAL.x2 - HOSPITAL.x1, HOSPITAL.y2 - HOSPITAL.y1);

    nextRound();
    drawPopulation();
}

function drawPopulation() {
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < population.length; i++) {
        const person = population[i];

        if (person.status == status.INFECTED) {
            noFill();
            stroke(color("rgb(220, 53, 69)"));
            ellipse(person.x, person.y, INFECTION_RADIUS, INFECTION_RADIUS);
            stroke(0);
        }

        fill(color(colors[person.status]))
        ellipse(person.x, person.y, 10, 10);

        // if (i == travelPlan.personIndex) {
        //     fill(138, 43, 226);
        //     ellipse(person.x, person.y, 10, 10);
        // }
    }
}

function setGraphOptions() {
    Highcharts.setOptions({
        chart: {
            backgroundColor: "#000"
        },
        title: {
            style: { color: '#bbb' }
        },
        credits: { enabled: false },
        yAxis: { gridLineColor: '#333' },
        legend: {
            itemStyle: { color: '#bbb' },
            itemHoverStyle: { color: '#FFF' },
            itemHiddenStyle: { color: '#606063' }
        }
    });
}

function drawGraph() {
    const graph = {};
    graph.title = { text: "Epidemic Statistics" };

    graph.xAxis = { categories: daysData };
    graph.yAxis = {
        title: { text: "Number of cases" }
    };

    graph.series = [
        {
            name: "Healthy",
            data: healthyData,
            color: colors[status.HEALTHY]
        },
        {
            name: "Infected",
            data: infectedData,
            color: colors[status.INFECTED]
        },
        {
            name: "Deceased",
            data: deceasedData,
            color: colors[status.DECEASED]
        }
    ];

    graph.plotOptions = {
        series: {
            marker: {
                enabled: false,
                symbol: "circle"
            },
            animation: false
        }
    };

    $("#graph-container").highcharts(graph);
}
