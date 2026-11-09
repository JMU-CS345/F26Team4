class WallView {
  draw(wall) {
    fill(80);
    rect(wall.x, wall.y, wall.width, wall.height);
  }
}