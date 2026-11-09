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
}