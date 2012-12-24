// a window contstrainer
if (walker.position.x > view.viewSize.width - 1) {
    walker.position.x = view.viewSize.width - 1;
}
else if (walker.position.x < 1) {
    walker.position.x = 0;
}

if (walker.position.y > view.viewSize.height - 1) {
    walker.position.y = view.viewSize.height - 1; 
}
else if (walker.position.y < 1) {
    walker.position.y = 0;
}

<script type="text/paperscript" canvas="canvas">
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var Walker = function() {
        this.position = new Point(view.center);
        this.SIZE = 3;
    };

    Walker.prototype.draw = function() {
        var circle = Path.Circle(new Point(this.position), this.SIZE);
        circle.fillColor = "black";
    };

    var SPEED = 3;

    var walker = new Walker();

    function onFrame(event) {
        var randomVelocity = new Point(randomInt(-SPEED, SPEED), randomInt(-SPEED, SPEED));

        walker.position += randomVelocity;

        walker.draw();
    }

    // Reposition the paths whenever the window is resized:
    function onResize(event) {
    }
</script>
