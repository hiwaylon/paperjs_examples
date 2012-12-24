test("A mover should change position.", function() {
    var mover = new Mover(new paper.Point(0, 0));
    var expectedPosition = new paper.Point(10, 0);
    mover.applyForce(expectedPosition);
    mover.update();

    // Testing paper.js is... cumbersome.    
    equal(
        mover.position.toString(),
        '{ x: 0, y: 0 }{ x: 0, y: 0 }{ x: 0, y: 0 }{ x: 10, y: 0 }');
    equal(
        mover.position, (
            new paper.Point(0, 0) + new paper.Point(0, 0) +
            new paper.Point(0, 0) + expectedPosition))
});
