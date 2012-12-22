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

    this.MAXIMUM_SPEED = 3;
    this.SIZE = 5;
};

Mover.prototype.update = function(acceleration) {
    this.velocity += acceleration;

    // Constrains speed.
    if (this.velocity.length > this.MAXIMUM_SPEED) {
        this.velocity.length = this.MAXIMUM_SPEED;
    }

    this.position += this.velocity;
};

var mover = new Mover();

// TODO: Demo specific stuff. Encapsulate in a Renderable to be reused?
// Mover contains a renderable?
var circle = Path.Circle(mover.position, mover.SIZE)
circle.fillColor = "orange";

// Create a point-text item at {x: 30, y: 30}:
var text = new PointText(new Point(30, 30));
text.fillColor = 'black';

var ACCELERATION_BOUND = 5;

function onFrame(event) {
    var accelerationDirection = new Point(randomInt(-1, 1), randomInt(-1, 1));
    var acceleration = accelerationDirection * randomInt(0, ACCELERATION_BOUND);
    mover.update(acceleration);

    // TODO: Demo specific stuff.
    //Should prolly be in other encapsulations to be resued by other demos.
    circle.position = wrap(mover.position);

    // Set the content of the text item.
    text.content = "x: " + mover.position.x + ", y: " + mover.position.y + "\nv: " + mover.velocity + "\na: " + acceleration;
}
