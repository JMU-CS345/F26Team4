class Player {
  constructor(x, y, radius = 15, speed = 3) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  move(dx, dy, level) {
    // Normalize diagonal movement so it is not faster.
    const distance = Math.hypot(dx, dy);
    if (distance > 0) {
      dx /= distance;
      dy /= distance;
    }

    // Move one axis at a time to allow sliding along walls.
    const nextX = this.x + dx * this.speed;
    if (level.canOccupyCircle(nextX, this.y, this.radius)) {
      this.x = nextX;
    }

    const nextY = this.y + dy * this.speed;
    if (level.canOccupyCircle(this.x, nextY, this.radius)) {
      this.y = nextY;
    }
  }
}