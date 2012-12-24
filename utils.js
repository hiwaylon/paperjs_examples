var bounceAtTop = function(position, velocity, radius) {
    if (position.y < radius) {
        velocity.y *= -1;
        position.y = radius;
    }
};

var bounceAtLeft = function(position, velocity, radius) {
    if (position.x < radius) {
        velocity.x *= -1;
        position.x = radius;
    }
};

var bounceAtWidth = function(position, velocity, radius, width) {
    var widthLessRadius = width - radius;
    if (position.x > widthLessRadius) {
        velocity.x *= -1;
        position.x = widthLessRadius;
    }
};
