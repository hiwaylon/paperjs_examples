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
    this.acceleration = new Point(0, 0);

    this.MAXIMUM_SPEED = 4;
    this.SIZE = 16;
};

Mover.prototype.applyForce = function(force) {
    this.acceleration += force;
};

Mover.prototype.update = function() {
    this.velocity += this.acceleration;

    // Constrains speed.
    if (this.velocity.length > this.MAXIMUM_SPEED) {
        this.velocity.length = this.MAXIMUM_SPEED;
    }

    this.position += this.velocity;
    this.acceleration = new Point(0, 0);
};

var mover = new Mover();

// TODO: Demo specific stuff. Encapsulate in a Renderable to be reused?
// Mover contains a renderable?
var circle = Path.Circle(mover.position, mover.SIZE)
circle.fillColor = "orange";

// Create a point-text item at {x: 30, y: 30}:
var text = new PointText(new Point(30, 30));
text.fillColor = "black";

var perlin = new SimplexNoise();

var tx = 0, ty = 10000;

function onFrame(event) {
    var wind = new Point(perlin.noise(tx, 0), 0);
    wind *= 1;
    mover.applyForce(wind);

    var heliumForce = new Point(0, -1);
    mover.applyForce(heliumForce);

    // Set the content of the text item.
    text.content = "p: " + circle.position + "\nv: " + mover.velocity + "\nw: " + wind + "\ns: " + mover.velocity.length;

    mover.update();

    // TODO: Demo specific stuff.
    //Should prolly be in other encapsulations to be resued by other demos.
    // mover.position = wrap(mover.position);
    bounceAtTop(mover.position, mover.velocity, mover.SIZE);
    bounceAtLeft(mover.position, mover.velocity, mover.SIZE);
    bounceAtWidth(mover.position, mover.velocity, mover.SIZE, view.viewSize.width)
    circle.position = mover.position;

    text.content += "\npn: " + perlin.noise(tx, ty);

    tx += 0.01;
    ty += 0.01;
}
