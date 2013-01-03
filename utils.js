var bounceAtTop = function(position, velocity, radius) {
    if (position.y < radius) {
        velocity.y *= -1;
        position.y = radius;
    }
};

var bounceAtBottom = function(position, velocity, radius, height) {
    var heightLessRadius = height - radius;
    if (position.y > heightLessRadius) {
        velocity.y *= -1;
        position.y = heightLessRadius;
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
