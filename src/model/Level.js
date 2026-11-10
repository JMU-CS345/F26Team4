class Level {
  constructor(width, height, walls = []) {
    this.width = width;
    this.height = height;
    this.walls = walls;
  }

  canOccupyCircle(x, y, radius) {
    const outsideLevel =
      x - radius < 0 ||
      x + radius > this.width ||
      y - radius < 0 ||
      y + radius > this.height;

    if (outsideLevel) {
      return false;
    }

    return !this.walls.some((wall) =>
      wall.collidesWithCircle(x, y, radius)
    );
  }
}