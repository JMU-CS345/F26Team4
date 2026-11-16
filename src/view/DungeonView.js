class DungeonView {
    draw(dungeon, geometry, player, playerView, walls) {
        if (!dungeon || !Array.isArray(dungeon.rooms) || dungeon.rooms.length < 2 ||
            !geometry || !geometry.positions || !Array.isArray(geometry.tunnels) ||
            !player || !playerView ||
            !Array.isArray(walls)) {
            throw new RangeError("The dungeon view requires rooms, positioned tunnels, a player, and walls");
        }

        for (const room of dungeon.rooms) {
            if (!geometry.positions[room.id]) {
                throw new RangeError(`Dungeon room ${room.id} has no world position`);
            }
        }

        const mapWidth = geometry.width;
        const mapHeight = geometry.height;
        const margin = Math.max(8, Math.min(80, width * 0.04, height * 0.12));
        const zoom = Math.max(0.01, Math.min(
            (width - margin) / mapWidth,
            (height - margin) / mapHeight
        ));
        const offsetX = (width - mapWidth * zoom) / 2;
        const offsetY = (height - mapHeight * zoom) / 2;

        push();
        translate(offsetX, offsetY);
        scale(zoom);
        for (const tunnel of geometry.tunnels) {
            this.drawTunnel(tunnel);
        }
        for (const room of dungeon.rooms) {
            this.drawRoom(room, geometry.positions[room.id], zoom);
        }
        this.drawWalls(walls);
        playerView.draw(player);
        pop();
    }

    drawTunnel(tunnel) {
        const { x, y, width: tunnelLength, height: tunnelWidth } = tunnel;

        noStroke();
        fill(49, 62, 82);
        rect(x, y, tunnelLength, tunnelWidth);
    }

    drawRoom(room, position, zoom) {
        const { x, y } = position;

        noStroke();
        fill(49, 62, 82);
        rect(x, y, room.width, room.height);

        room.barrelSpawnPoints.forEach((point) => this.drawMarker(point, x, y, "barrel", zoom));
        room.enemySpawnPoints.forEach((point) => this.drawMarker(point, x, y, "enemy", zoom));
        room.specialSpawnPoints.forEach((point) => this.drawMarker(point, x, y, "special", zoom));
        if (room.chestSpawnPoint) {
            this.drawMarker(room.chestSpawnPoint, x, y, "chest", zoom);
        }
        if (room.minibossSpawnPoint) {
            const minibossSize = room.gridCellSize / 1.5;
            noStroke();
            fill(239, 68, 68);
            circle(
                x + room.minibossSpawnPoint.x,
                y + room.minibossSpawnPoint.y,
                minibossSize
            );
        }
    }

    drawWalls(walls) {
        noStroke();
        fill(167, 181, 202);
        for (const wall of walls) {
            rect(wall.xpos, wall.ypos, wall.width, wall.height);
        }
    }

    drawMarker(point, roomX, roomY, type, zoom) {
        const x = roomX + point.x;
        const y = roomY + point.y;
        const size = Math.max(8, Math.min(16, 12 / zoom));
        noStroke();
        if (type === "barrel") {
            fill(213, 153, 85);
            rect(x - size / 2, y - size / 2, size, size);
        } else {
            const markerColor = type === "enemy"
                ? color(251, 113, 133)
                : type === "special"
                    ? color(255, 221, 0)
                    : color(192, 132, 252);
            fill(markerColor);
            circle(x, y, size);
        }
    }
}
