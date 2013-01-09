var SIZE_SCALE = 9;

var Mover = function(mass, position) {
    this.position = position || new Point(view.center);

    // NOTE: A Point created with an x, y of 0, 0 is unusable as it leaves
    // internals undefined resulting in many Point operations to fail
    // (undefined and NaN). This could probably use a patch to the project. 
    this.velocity = new Point({"length": 0.01, "angle": 0});
    this.acceleration = new Point(0, 0);
    this.mass = mass;

    this.size = mass * SIZE_SCALE;
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

var MINIMUM_MASS = 1;
var MAXIMUM_MASS = 5;
var NUMBER_OF_ENTITIES = 5;
var entities = [];
for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
    var randomMass = randomFloat(MINIMUM_MASS, MAXIMUM_MASS);
    var mover = new Mover(randomMass, new Point(randomInt(0, view.viewSize.width), 0));

    var circle = Path.Circle(mover.position, mover.size);
    circle.fillColor = new GrayColor(Math.random());
    circle.strokeColor = "black";
    circle.strokeWidth = 2;

    var info = new PointText(mover.position);
    info.fillColor = "black";

    var entity = {
        "mover": mover,
        "circle": circle,
        "info": info,
    };

    entities.push(entity);
}

var perlin = new SimplexNoise();
var tx = 0;
var ty = 10000;

var WIND_FORCE = new Point(0.01, 0);
var GRAVITY_FORCE = new Point(0, 0.1);
var FRICTION_FORCE = 0.05;

function onFrame(event) {
    // TODO: How to update movers differently? Delegate to eavh a call to
    // update which will be delegeted again internally to an UpdateStrategy
    // which is injected on construction.
    // TODO: Should use underscore.each.
    // _.each(movers, function(mover) {...});
    for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
        // Clear output so that it can be easilly appeneded.
        entities[i].info.content = "";

        var mover = entities[i].mover;

        // Compute friction. In Paper.js, the normalize method on a Point will
        // create a copy of the Point being normalized. Thus a copy does not
        // need to be made explicitly.
        var friction = mover.velocity.normalize();
        friction *= -1;
        friction *= FRICTION_FORCE;

        mover.applyForce(friction);
        mover.applyForce(WIND_FORCE);
        mover.applyForce(GRAVITY_FORCE * mover.mass);

        // TODO: Demo specifics.
        handleEdges(mover, view.viewSize.width, view.viewSize.height);

        entities[i].mover.update();

        var circle = entities[i].circle;
        entities[i].circle.position = mover.position;

        entities[i].info.position = mover.position;
        entities[i].info.content += "m: " + mover.mass;
        entities[i].info.content += "\nv: " + mover.velocity;
        entities[i].info.content += "\nf: " + friction;
    }

    // Set the content of the text item.
    // text.content = "p: " + circle.position + "\na: " + mover.acceleration + "\nv: " + mover.velocity + "\ns: " + mover.velocity.length;

    tx += 0.01;
    ty += 0.01;
}
