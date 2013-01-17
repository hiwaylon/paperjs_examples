var Mover = function(mass, position) {
    var SIZE_SCALE = 9;
    var to;

    this.position = position || new Point(view.center);

    // NOTE: A Point created with an x, y of 0, 0 is unusable as it leaves
    // internals undefined resulting in many Point operations to fail
    // (undefined and NaN). This could probably use a patch to the project. 
    this.velocity = new Point({"length": 1, "angle": 90});
    this.acceleration = new Point({"length": 0, "angle": 90});
    this.mass = mass;

    this.size = mass * SIZE_SCALE;

    to = this.position.add(this.velocity);
    this.velocityLine = new Path.Line(this.position, to);
    this.velocityLine.strokeColor = "red";
};

Mover.prototype.applyForce = function(force) {
    var forceByMass = force / this.mass;
    this.acceleration += forceByMass;
};

Mover.prototype.update = function() {
    this.velocity = this.velocity + this.acceleration;

    this.position += this.velocity;

    this.acceleration.x = 0;
    this.acceleration.y = 0;
};

Mover.prototype.display = function(renderable, drawVelocity) {
    renderable.position = this.position;

    if (drawVelocity) {
        var from = this.position;
        this.velocityLine.segments[0].point = from;
        this.velocityLine.segments[1].point = from + (this.velocity * 80);
    }
};

var MINIMUM_MASS = 1;
var MAXIMUM_MASS = 5;
var NUMBER_OF_ENTITIES = 1;
var entities = [];
for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
    var randomMass = randomFloat(MINIMUM_MASS, MAXIMUM_MASS);
    var mover = new Mover(randomMass);

    var circle = Path.Circle(mover.position, mover.size);
    circle.fillColor = new GrayColor(Math.random());
    circle.strokeColor = "black";
    circle.strokeWidth = 2;

    var info = new PointText(mover.position);
    info.fillColor = "black";

    var entity = {
        "mover": mover,
        "circle": circle,
        "info": info
    };

    entities.push(entity);
}

var frameCount = 0;
var frameInfo = new PointText(10, 10);
frameInfo.fillColor = "black";
var TWO_PI = Math.PI * 2;

var initialXPositions = [];
for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
    initialXPositions[i] = entities[i].mover.position.x;
}

function onFrame(event) {
    for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
        // Clear output so that it can be easilly added.
        entities[i].info.content = "";

        var mover = entities[i].mover;
        var period = 120;
        var amplitude = 200;
        var deltaX = amplitude * Math.cos(TWO_PI * frameCount / period);
        mover.position.x = deltaX;
        mover.position.x += initialXPositions[i];

        // Draw (a circle for the) entity.
        var circle = entities[i].circle;
        mover.display(circle, false);
    }
    frameCount += 1;
    frameInfo.content = "f: " + frameCount + "\ndX: " + deltaX + "\np: " + mover.position;
}
