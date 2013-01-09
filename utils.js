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

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

var show = true;
var frame = 0;
var FRAME = 250;

function applyEdgeForces(mover, height) {
    var distanceToBottom = height - mover.position.y;

    frame++; 
    if (distanceToBottom <= mover.size) {
        // var pushBack = mover.velocity.length;
        // var pushBackForce = mover.velocity.negate().multiply(pushBack);
        // mover.applyForce(pushBackForce);
        mover.velocity = mover.velocity.multiply(-1);
        mover.position.y = height - mover.size;
    }
    // if (show && frame === FRAME) {
    //     console.log(mover.velocity);
    //     console.log(mover.velocity.length);
    //     console.log(pushBack);
    //     console.log(pushBackForce);

    //     show = false;
    // }
    // console.log(frame);
}

function handleEdges(mover, width, height) {
    bounceAtTop(mover.position, mover.velocity, mover.size);
    bounceAtLeft(mover.position, mover.velocity, mover.size);
    bounceAtWidth(mover.position, mover.velocity, mover.size, width);
    bounceAtBottom(mover.position, mover.velocity, mover.size, height);
};