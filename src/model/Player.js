class Player {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.radius = 15;
    this.speed = 3;
  }

  move(dx, dy) {
    // Normalize diagonal movement so it isn't faster.
    const distance = Math.hypot(dx, dy);
    if (distance > 0) {
      dx /= distance;
      dy /= distance;
    }

    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }
}