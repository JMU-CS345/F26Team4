class DungeonView {
    draw(dungeon, geometry, player, playerView, walls) {
        if (!dungeon || dungeon.rooms.length !== 2 || dungeon.connections.length !== 1 ||
            !geometry || !geometry.positions || !geometry.tunnel || !player || !playerView ||
            !Array.isArray(walls)) {
            throw new RangeError("The connected-room view requires exactly two rooms and one connection");
        }

        const connection = dungeon.connections[0];
        const fromRoom = dungeon.rooms.find((room) => room.id === connection.fromRoomId);
        const toRoom = dungeon.rooms.find((room) => room.id === connection.toRoomId);
        if (!fromRoom || !toRoom ||
            connection.fromSide !== "east" || connection.toSide !== "west") {
            throw new RangeError("The connected-room view requires rooms joined east to west");
        }

        const fromTunnel = fromRoom.tunnels.find((tunnel) => tunnel.side === connection.fromSide);
        const toTunnel = toRoom.tunnels.find((tunnel) => tunnel.side === connection.toSide);
        if (!fromTunnel || !toTunnel ||
            !geometry.positions[fromRoom.id] || !geometry.positions[toRoom.id]) {
            throw new RangeError("Connected rooms must contain the selected tunnel sides");
        }

        const fromPosition = geometry.positions[fromRoom.id];
        const toPosition = geometry.positions[toRoom.id];
        const openingCenterY = fromPosition.y + fromTunnel.y + fromTunnel.height / 2;
        const targetOpeningCenterY = toPosition.y + toTunnel.y + toTunnel.height / 2;
        if (openingCenterY !== targetOpeningCenterY ||
            geometry.tunnel.x !== fromPosition.x + fromRoom.width ||
            geometry.tunnel.x + geometry.tunnel.width !== toPosition.x ||
            geometry.tunnel.y + geometry.tunnel.height / 2 !== openingCenterY ||
            geometry.tunnel.height !== fromTunnel.height ||
            geometry.tunnel.height !== toTunnel.height) {
            throw new RangeError("Connected room openings and tunnel must align");
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
        this.drawTunnel(geometry.tunnel, zoom);
        this.drawRoom(fromRoom, fromPosition, zoom);
        this.drawRoom(toRoom, toPosition, zoom);
        this.drawWalls(walls);
        playerView.draw(player);
        pop();
    }

    drawTunnel(tunnel, zoom) {
        const { x, y, width: tunnelLength, height: tunnelWidth } = tunnel;
        const midpoint = x + tunnelLength / 2;

        noStroke();
        fill(21, 78, 78);
        rect(x, y, tunnelLength / 2, tunnelWidth);
        fill(27, 93, 91);
        rect(midpoint, y, tunnelLength / 2, tunnelWidth);

        noFill();
        stroke(84, 214, 194);
        strokeWeight(3 / Math.max(zoom, 0.01));
        rect(x, y, tunnelLength, tunnelWidth);
        drawingContext.setLineDash([8, 8]);
        line(midpoint, y + 10, midpoint, y + tunnelWidth - 10);
        drawingContext.setLineDash([]);
    }

    drawRoom(room, position, zoom) {
        const { x, y } = position;
        const cell = room.gridCellSize;

        noStroke();
        fill(49, 62, 82);
        rect(x, y, room.width, room.height);

        stroke(69, 84, 107);
        strokeWeight(1 / zoom);
        for (let gridX = 1; gridX < room.gridSize.width; gridX += 1) {
        line(x + gridX * cell, y, x + gridX * cell, y + room.height);
        }
        for (let gridY = 1; gridY < room.gridSize.height; gridY += 1) {
        line(x, y + gridY * cell, x + room.width, y + gridY * cell);
        }

        noFill();
        stroke(226, 234, 245);
        strokeWeight(3 / zoom);
        rect(x, y, room.width, room.height);

        room.barrelSpawnPoints.forEach((point) => this.drawMarker(point, x, y, "barrel", zoom));
        room.enemySpawnPoints.forEach((point) => this.drawMarker(point, x, y, "enemy", zoom));
        room.specialSpawnPoints.forEach((point) => this.drawMarker(point, x, y, "special", zoom));
        if (room.chestSpawnPoint) {
            this.drawMarker(room.chestSpawnPoint, x, y, "chest", zoom);
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
            fill(type === "enemy" ? color(251, 113, 133) : color(192, 132, 252));
            circle(x, y, size);
        }
    }
}
