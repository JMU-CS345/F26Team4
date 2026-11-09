class WallView {
  draw(wall) {
    fill(80);
    rect(wall.xpos, wall.ypos, wall.width, wall.height);
  }
}