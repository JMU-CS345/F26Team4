function setPos(entity, x, y, level, xKey = "x", yKey = "y") {
    if (!level.canOccupyCircle(x, y, entity.radius)) {
        throw new RangeError("Entity cannot occupy the requested position");
    }

    entity[xKey] = x;
    entity[yKey] = y;
}

function moveEntity(entity, dx, dy, level, xKey = "x", yKey = "y") {
    const distance = Math.hypot(dx, dy);
    if (distance === 0) {
        return;
    }

    dx /= distance;
    dy /= distance;

    const nextX = entity[xKey] + dx * entity.speed;
    if (level.canOccupyCircle(nextX, entity[yKey], entity.radius)) {
        entity[xKey] = nextX;
    }

    const nextY = entity[yKey] + dy * entity.speed;
    if (level.canOccupyCircle(entity[xKey], nextY, entity.radius)) {
        entity[yKey] = nextY;
    }
}
