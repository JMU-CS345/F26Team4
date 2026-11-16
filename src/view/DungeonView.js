class DungeonView {
    constructor() {
        this.currentRoomId = null;
        this.cameraX = null;
        this.cameraY = null;
    }

    draw(dungeon, geometry, player, playerView, walls) {
        if (!dungeon || !Array.isArray(dungeon.rooms) || dungeon.rooms.length < 2 ||
            !Array.isArray(dungeon.connections) ||
            !geometry || !geometry.positions || !Array.isArray(geometry.tunnels) ||
            geometry.tunnels.length !== dungeon.connections.length ||
            !player || !playerView ||
            !Array.isArray(walls)) {
            throw new RangeError("The dungeon view requires rooms, connections, positioned tunnels, a player, and walls");
        }

        for (const room of dungeon.rooms) {
            if (!geometry.positions[room.id]) {
                throw new RangeError(`Dungeon room ${room.id} has no world position`);
            }
        }

        const enteredRoom = this.findPlayerRoom(dungeon, geometry, player);
        if (enteredRoom) {
            this.currentRoomId = enteredRoom.id;
        }
        const cameraRoom = dungeon.rooms.find((room) => room.id === this.currentRoomId) ||
            dungeon.rooms[0];
        const roomPosition = geometry.positions[cameraRoom.id];
        const roomCenterX = roomPosition.x + cameraRoom.width / 2;
        const roomCenterY = roomPosition.y + cameraRoom.height / 2;
        const targetX = roomCenterX + (player.xpos - roomCenterX) * 0.1;
        const targetY = roomCenterY + (player.ypos - roomCenterY) * 0.1;
        if (this.cameraX === null || this.cameraY === null) {
            this.cameraX = targetX;
            this.cameraY = targetY;
        } else {
            this.cameraX += (targetX - this.cameraX) * 0.08;
            this.cameraY += (targetY - this.cameraY) * 0.08;
        }

        const zoom = 1.5;

        push();
        translate(width / 2, height / 2);
        scale(zoom);
        translate(-this.cameraX, -this.cameraY);
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

    findPlayerRoom(dungeon, geometry, player) {
        const room = dungeon.rooms.find((candidate) => {
            const position = geometry.positions[candidate.id];
            return player.xpos >= position.x &&
                player.xpos <= position.x + candidate.width &&
                player.ypos >= position.y &&
                player.ypos <= position.y + candidate.height;
        });
        if (room) {
            return room;
        }

        for (let index = 0; index < dungeon.connections.length; index += 1) {
            const tunnel = geometry.tunnels[index];
            if (player.xpos < tunnel.x || player.xpos > tunnel.x + tunnel.width ||
                player.ypos < tunnel.y || player.ypos > tunnel.y + tunnel.height) {
                continue;
            }

            const connection = dungeon.connections[index];
            const fromRoom = dungeon.rooms.find((candidate) =>
                candidate.id === connection.fromRoomId
            );
            const toRoom = dungeon.rooms.find((candidate) =>
                candidate.id === connection.toRoomId
            );
            if (!fromRoom || !toRoom) {
                throw new RangeError("Dungeon connections must reference existing rooms");
            }

            const distanceToRoom = (candidate) => {
                const position = geometry.positions[candidate.id];
                const dx = Math.max(position.x - player.xpos, 0,
                    player.xpos - position.x - candidate.width);
                const dy = Math.max(position.y - player.ypos, 0,
                    player.ypos - position.y - candidate.height);
                return dx * dx + dy * dy;
            };
            return distanceToRoom(fromRoom) <= distanceToRoom(toRoom)
                ? fromRoom
                : toRoom;
        }

        return null;
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
