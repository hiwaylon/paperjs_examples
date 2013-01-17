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

Mover.prototype.display = function() {
    var from = this.position;

    this.velocityLine.segments[0].point = from;
    this.velocityLine.segments[1].point = from + (this.velocity * 80);
};

var MINIMUM_MASS = 1;
var MAXIMUM_MASS = 5;
var NUMBER_OF_ENTITIES = 5;
var entities = [];
for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
    var randomMass = randomFloat(MINIMUM_MASS, MAXIMUM_MASS);
    var mover = new Mover(randomMass, new Point(randomInt(0, view.viewSize.width), randomInt(0, view.viewSize.height * 0.5)));

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

var Fluid = function(x, y, width, height, c) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.c = c;

    var point = new Point(this.x, this.y);
    var size = new Size(this.width, this.height);
    this.fluid = new Path.Rectangle(point, size);
    this.fluid.fillColor = new GrayColor(0.09);
    this.fluid.opacity = 0.7;
};

Fluid.prototype.drag = function(mover) {
    var bottomOfMover = mover.position.clone();
    bottomOfMover.y += mover.size;

    if (!this._contains(bottomOfMover)) {
        return;
    }

    var speed = mover.velocity.length;
    var dragnitude = this.c * speed * speed;
    var drag = mover.velocity.normalize(-dragnitude);

    mover.applyForce(drag);
};

Fluid.prototype._contains = function(point) {
    if (this.fluid.hitTest(point)) {
        return true;
    }

    return false;
};

var FLUID_C = 0.2;
var FLUID = new Fluid(0, view.viewSize.height * 0.667, view.viewSize.width, view.viewSize.height, FLUID_C);

var FRICTION_FORCE = 0.05;
var GRAVITY_FORCE = new Point(0, 0.1);

function onFrame(event) {
    // TODO: How to update movers differently? Delegate to eavh a call to
    // update which will be delegeted again internally to an UpdateStrategy
    // which is injected on construction.
    // TODO: Should use underscore.each.
    // _.each(movers, function(mover) {...});
    for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
        // Clear output so that it can be easilly added.
        entities[i].info.content = "";

        var mover = entities[i].mover;

        // Seems like this friction should only affect x, otherwise we are
        // doubling gravity like forces. Alternatively, we could model a fluid
        // (air) more correctlt to create a drag.
        var friction = mover.velocity.normalize();
        friction *= -1;
        friction *= FRICTION_FORCE;
        mover.applyForce(friction);

        mover.applyForce(GRAVITY_FORCE * mover.mass);

        FLUID.drag(mover);

        // Keep entites in the window.
        handleEdges(mover, view.viewSize.width, view.viewSize.height);

        mover.update();

        // Draw (a circle for the) entity.
        var circle = entities[i].circle;
        entities[i].circle.position = mover.position;
        mover.display();

        // Text output.
        entities[i].info.position = mover.position;
        entities[i].info.content += "m: " + mover.mass;
        entities[i].info.content += "\nv: " + mover.velocity;
    }
}
