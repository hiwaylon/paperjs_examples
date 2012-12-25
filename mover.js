var Mover = function() {
    this.position = new Point(paper.view.center);
    this.velocity = new Point(0, 0);
    this.acceleration = new Point(0, 0);

    this.MAXIMUM_SPEED = 4;
    this.SIZE = 16;
};

Mover.prototype.applyForce = function(force) {
    this.acceleration += force;
};

Mover.prototype.update = function() {
    // console.log(this.acceleration.x);
    console.log(this.velocity.x);
    console.log(this.position.x);
    this.velocity = this.velocity + this.acceleration;

    // Constrains speed.
    // if (this.velocity.length > this.MAXIMUM_SPEED) {
    //     this.velocity.length = this.MAXIMUM_SPEED;
    // }

    // console.log(this.position.x);
    // this.position += this.velocity;

    // this.acceleration = new Point(0, 0);
};
