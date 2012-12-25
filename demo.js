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
    this.velocity = this.velocity + this.acceleration;

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
    mover.applyForce(new Point(0.01, 0));
    mover.applyForce(new Point(0, 0.01));
    mover.update();

    // TODO: Demo specifics.
    bounceAtTop(mover.position, mover.velocity, mover.SIZE);
    bounceAtLeft(mover.position, mover.velocity, mover.SIZE);
    bounceAtWidth(mover.position, mover.velocity, mover.SIZE, view.viewSize.width)
    bounceAtBottom(mover.position, mover.velocity, mover.SIZE, view.viewSize.height)

    // Set the content of the text item.
    text.content = "p: " + circle.position + "\na: " + mover.acceleration + "\nv: " + mover.velocity + "\ns: " + mover.velocity.length;

    circle.position = mover.position;

    tx += 0.01;
    ty += 0.01;
}
