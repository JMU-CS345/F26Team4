class WorldObject {
    constructor({
        name,
        xpos = 0,
        ypos = 0,
        width,
        height,
        collidable = true,
        interactable = false
    } = {}) {
        if (!name) {
            throw new TypeError("WorldObject requires a name");
        }
        if (!Number.isFinite(xpos) || !Number.isFinite(ypos)) {
            throw new TypeError("WorldObject position must be finite numbers");
        }
        if (!Number.isFinite(width) || width <= 0 ||
            !Number.isFinite(height) || height <= 0) {
            throw new RangeError("WorldObject width and height must be positive numbers");
        }

        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.collidable = collidable;
        this.interactable = interactable;
    }

    collidesWithCircle(circleX, circleY, radius) {
        const closestX = Math.max(this.xpos, Math.min(circleX, this.xpos + this.width));
        const closestY = Math.max(this.ypos, Math.min(circleY, this.ypos + this.height));
        const distanceX = circleX - closestX;
        const distanceY = circleY - closestY;

        return distanceX * distanceX + distanceY * distanceY < radius * radius;
    }
}

class Wall extends WorldObject {
    constructor(x, y, width, height) {
        super({
            name: "Wall",
            xpos: x,
            ypos: y,
            width,
            height
        });
    }
}