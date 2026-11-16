class PlayerController {
  constructor(player) {
    this.player = player;
  }

  update(level) {
    let dx = 0;
    let dy = 0;

    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) dx -= 1; // A / left
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) dx += 1; // D / right
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) dy -= 1; // W / up
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) dy += 1; // S / down
    //if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.player.health -=1; to test health and mana bar uncomment these.
    //if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.player.mana -=1;
    this.player.move(dx, dy, level);
  }
}