class PlayerView {
  draw(player) {
    fill(0, 100, 255);
    circle(player.xpos, player.ypos, player.radius * 2);
  }
}