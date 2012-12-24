function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var wrap = function(position) {
    var newPosition = new Point(position);

    if (position.x > view.viewSize.width) {
        newPosition.x = position.x - view.viewSize.width;
    }
    else if (position.x < 0) {
        newPosition.x = view.viewSize.width - position.x;
    }

    if (position.y > view.viewSize.height) {
        newPosition.y = position.y - view.viewSize.height;
    }
    else if (position.y < 0) {
        newPosition.y = view.viewSize.height - position.y;
    }

    return newPosition;
};

var Mover = function() {
    this.position = new Point(view.center);
    this.velocity = new Point(0, 0);

    this.MAXIMUM_SPEED = 4;
    this.SIZE = 16;
};

Mover.prototype.update = function(acceleration) {
    this.velocity += acceleration;

    // Constrains speed.
    if (this.velocity.length > this.MAXIMUM_SPEED) {
        this.velocity.length = this.MAXIMUM_SPEED;
    }

    this.position += this.velocity;
};

var perlin = new SimplexNoise();

var NUMBER_OF_MOVERS = 79;
var movers = [];
var circles = [];
for (var i = 0; i < NUMBER_OF_MOVERS; ++i) {
    var mover = new Mover();
    mover.position.x = randomInt(0, view.viewSize.width);
    mover.position.y = randomInt(0, view.viewSize.height);
    movers.push(mover);

    var circle = Path.Circle(mover.position, mover.SIZE);
    circle.fillColor = "orange";
    circles.push(circle);
}

var ACCELERATION_BOUND = 0.5;
var tx = 0, ty = 10000;

function onFrame(event) {
    for (var i = 0; i < NUMBER_OF_MOVERS; ++i) {
        var accelerationDirection = new Point(perlin.noise(tx, 0), perlin.noise(0, ty));
        var acceleration = accelerationDirection.normalize(ACCELERATION_BOUND);
        movers[i].update(acceleration);

        // TODO: Demo specific stuff.
        //Should prolly be in other encapsulations to be resued by other demos.
        movers[i].position = wrap(movers[i].position)
        circles[i].position = movers[i].position;

        tx += 1;
        ty += 1;
    }
}
