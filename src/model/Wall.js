class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  collidesWithCircle(circleX, circleY, radius) {
    const closestX = Math.max(this.x, Math.min(circleX, this.x + this.width));
    const closestY = Math.max(this.y, Math.min(circleY, this.y + this.height));
    const distanceX = circleX - closestX;
    const distanceY = circleY - closestY;

    return distanceX * distanceX + distanceY * distanceY < radius * radius;
  }
}