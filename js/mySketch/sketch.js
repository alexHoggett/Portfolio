var swarm = [];
var checkCount = 0;
var friction = 0.99;

var avoidRadius = 20;//15
var avoidStrength = 0.1;//0.15

var cohereRadius = 120;//30
var cohereStrength = 0.1;//0.05

var alignRadius = 60;//40
var alignStrength = 0.1;//0.01

function setup() {
    let myContainer = document.querySelector('.header__sketch');
    let myHeight = myContainer.clientHeight;
    let myWidth = windowWidth; // a quick fix here, clientWidth was offsetting the canvas
    canvas = createCanvas(myWidth, myHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-2");
    canvas.style("position", "absolute");
    canvas.elt.style.position = "fixed";
    background('#E4572E');

    // Create agents
    for (var i = 0; i < 1000; i++) {
        // initialise with random position & velocity
        let x = random(width);
        let y = random(height);

        let newAgent = new Agent(x, y, random(-1, 1), random(-1, 1));
        swarm.push(newAgent);
    }
}

function draw() {
    background('#E4572E');
    for (agent of swarm) {
        agent.draw();

        checkCount++;
        if (checkCount > 50) {
            checkCount = 0;
            agent.calcMovement();
        }
        agent.move();
    }
}

function windowResized() {
    let myContainer = document.querySelector('.header');
    let myHeight = myContainer.clientHeight;
    let myWidth = myContainer.clientWidth;
    resizeCanvas(myWidth, myHeight);
}
