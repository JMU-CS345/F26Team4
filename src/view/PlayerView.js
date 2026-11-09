class PlayerView {
  draw(player) {
    fill(0, 100, 255);
    circle(player.x, player.y, player.radius * 2);
  }
}