console.log('le mover')
var Mover = function(position) {
    this.position = position || new Point(view.center);
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
