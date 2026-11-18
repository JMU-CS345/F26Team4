class PlayerView {
  draw(player) {
    if (player.mageClass === "mind") {
      fill(175,76,76);
    }
    else if (player.mageClass === "ice") {
      fill(88,248,253);
    }
    else {
      fill(255,0,0);
    }
    circle(player.xpos, player.ypos, player.radius * 2);
  }
}