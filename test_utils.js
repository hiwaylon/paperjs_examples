test("It should reverse the velocity if the y position is at zero.", function() {
    var velocity = new Point(0, 10);
    var position = new Point(0, 0);
    var radius = 16;

    var originalVelocityY = velocity.y;

    bounceAtTop(position, velocity, radius);

    strictEqual(velocity.y, -originalVelocityY);
    strictEqual(position.y, radius);
});

test("It should reverse the velocity if the x position is at zero.", function() {
    var velocity = new Point(10, 0);
    var position = new Point(0, 0);
    var radius = 16;

    var originalVelocityX = velocity.x;

    bounceAtLeft(position, velocity, radius);

    strictEqual(velocity.x, -originalVelocityX);
    strictEqual(position.x, radius);
});

test("It should reverse the velocity if the x position is at width minus radius.", function() {
    var velocity = new Point(100, 0);
    var position = new Point(98, 0);
    var radius = 16;
    var width = 100;
    var widthLessRadius = width - radius;

    var originalVelocityX = velocity.x;

    bounceAtWidth(position, velocity, radius, width);

    strictEqual(velocity.x, -originalVelocityX);
    strictEqual(position.x, widthLessRadius);
});
