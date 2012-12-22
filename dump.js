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
