var SIZE_SCALE = 9;

var Mover = function(mass, position) {
    this.position = position || new Point(view.center);
    this.velocity = new Point(0, 0);
    this.acceleration = new Point(0, 0);
    this.mass = mass;

    this.MAXIMUM_SPEED = 3;
    this.size = mass * SIZE_SCALE;
};

Mover.prototype.applyForce = function(force) {
    var forceByMass = force / this.mass;
    this.acceleration += forceByMass;
};

Mover.prototype.update = function() {
    this.velocity = this.velocity + this.acceleration;

    // Constrains speed.
    if (this.velocity.length > this.MAXIMUM_SPEED) {
        this.velocity.length = this.MAXIMUM_SPEED;
    }

    this.position += this.velocity;

    this.acceleration.x = 0;
    this.acceleration.y = 0;
};

var MINIMUM_MASS = 1;
var MAXIMUM_MASS = 10 - MINIMUM_MASS;
var NUMBER_OF_ENTITIES = 5;
var entities = [];
for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
    var randomMass = (Math.random() * MAXIMUM_MASS) + MINIMUM_MASS;
    var mover = new Mover(randomMass, new Point(randomInt(0, view.viewSize.width), 0));

    var circle = Path.Circle(mover.position, mover.size);
    circle.fillColor = new RgbColor(Math.random(), Math.random(), Math.random());
    circle.strokeColor = "black";
    circle.strokeWidth = 2;

    var info = new PointText(mover.position);
    info.fillColor = "black";
    info.content = i + "\n" + mover.mass;

    var entity = {
        "mover": mover,
        "circle": circle,
        "info": info,
    };

    entities.push(entity);
}

// Create a point-text item at {x: 30, y: 30}:
// var text = new PointText(new Point(30, 30));
// text.fillColor = "black";

var perlin = new SimplexNoise();

var tx = 0, ty = 10000;

var WIND_FORCE = new Point(0.01, 0);
var GRAVITY_FORCE = new Point(0, 0.15);

function onFrame(event) {
    // TODO: How to update movers differently? Delegate to eavh a call to
    // update which will be delegeted again internally to an UpdateStrategy
    // which is injected on construction.
    // TODO: Should use underscore.each.
    // _.each(movers, function(mover) {...});
    for (var i = 0; i < NUMBER_OF_ENTITIES; i++) {
        var mover = entities[i].mover;

        entities[i].mover.applyForce(WIND_FORCE);
        mover.applyForce(GRAVITY_FORCE * mover.mass);

        entities[i].mover.update();

        // TODO: Demo specifics.
        bounceAtTop(mover.position, mover.velocity, mover.size);
        bounceAtLeft(mover.position, mover.velocity, mover.size);
        bounceAtWidth(mover.position, mover.velocity, mover.size, view.viewSize.width);
        bounceAtBottom(mover.position, mover.velocity, mover.size, view.viewSize.height);

        var circle = entities[i].circle;
        entities[i].circle.position = mover.position;

        entities[i].info.position = mover.position;
        entities[i].info.content = "m: " + mover.mass;
    }

    // Set the content of the text item.
    // text.content = "p: " + circle.position + "\na: " + mover.acceleration + "\nv: " + mover.velocity + "\ns: " + mover.velocity.length;

    tx += 0.01;
    ty += 0.01;
}
