console.log('le demo')

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
    // mover.applyForce(new Point(0.01, 0));
    // mover.update();

    // TODO: Demo specifics.
    // bounceAtTop(mover.position, mover.velocity, mover.SIZE);
    // bounceAtLeft(mover.position, mover.velocity, mover.SIZE);
    // bounceAtWidth(mover.position, mover.velocity, mover.SIZE, view.viewSize.width)
    // bottom

    // Set the content of the text item.
    text.content = "p: " + circle.position + "\nv: " + mover.velocity + "\ns: " + mover.velocity.length;

    circle.position = mover.position;

    tx += 0.01;
    ty += 0.01;
}
