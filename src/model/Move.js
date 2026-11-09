function moveEntity(entity, dx, dy, level) {
    if (!entity || !Number.isFinite(dx) || !Number.isFinite(dy)) {
        throw new TypeError("Movement requires an entity and finite direction values");
    }
    if (!level || typeof level.canOccupyCircle !== "function") {
        throw new TypeError("Movement requires a level with circle collision checks");
    }

    const distance = Math.hypot(dx, dy);
    if (distance === 0) {
        return;
    }

    dx = (dx / distance) * entity.speed;
    dy = (dy / distance) * entity.speed;

    const nextX = entity.x + dx;
    if (level.canOccupyCircle(nextX, entity.y, entity.radius)) {
        entity.x = nextX;
    }

    const nextY = entity.y + dy;
    if (level.canOccupyCircle(entity.x, nextY, entity.radius)) {
        entity.y = nextY;
    }
}

class MovableEntity {
    constructor(x, y, radius = 15, speed = 3) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new TypeError("Entity position must be finite numbers");
        }
        if (!Number.isFinite(radius) || radius <= 0) {
            throw new RangeError("Entity radius must be a positive number");
        }
        if (!Number.isFinite(speed) || speed < 0) {
            throw new RangeError("Entity speed must be a non-negative number");
        }

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }

    get xpos() {
        return this.x;
    }

    set xpos(value) {
        this.x = value;
    }

    get ypos() {
        return this.y;
    }

    set ypos(value) {
        this.y = value;
    }

    move(dx, dy, level) {
        moveEntity(this, dx, dy, level);
    }
}