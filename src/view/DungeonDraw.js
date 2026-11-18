class DungeonView {
    constructor() {
        this.currentRoomId = null;
        this.cameraX = null;
        this.cameraY = null;
        this.exploredRoomIds = new Set();
        this.traversedConnections = new Set();
    }

    draw(dungeon, geometry, player, playerView, walls) {

        if (!dungeon || !Array.isArray(dungeon.rooms) || dungeon.rooms.length < 2 ||
            !Array.isArray(dungeon.connections) ||
            !geometry || !geometry.positions || !Array.isArray(geometry.tunnels) ||
            geometry.tunnels.length !== dungeon.connections.length ||
            !Number.isFinite(geometry.width) || geometry.width <= 0 ||
            !Number.isFinite(geometry.height) || geometry.height <= 0 ||
            !player || !playerView ||
            !Array.isArray(walls)) {
            throw new RangeError("The dungeon view requires rooms, connections, positioned tunnels, valid dimensions, a player, and walls");
        }

        for (const room of dungeon.rooms) {
            if (!geometry.positions[room.id]) {
                throw new RangeError(`Dungeon room ${room.id} has no world position`);
            }
        }

        const enteredRoom = this.findPlayerRoom(dungeon, geometry, player);
        if (enteredRoom) {
            if (this.currentRoomId && this.currentRoomId !== enteredRoom.id) {
                const traversedConnection = dungeon.connections.find((connection) =>
                    connection.fromRoomId === this.currentRoomId &&
                        connection.toRoomId === enteredRoom.id ||
                    connection.fromRoomId === enteredRoom.id &&
                        connection.toRoomId === this.currentRoomId
                );
                if (traversedConnection) {
                    this.traversedConnections.add(traversedConnection);
                }
            }
            this.currentRoomId = enteredRoom.id;
            this.exploredRoomIds.add(enteredRoom.id);
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

        this.drawMinimap(dungeon, geometry, cameraRoom);
    }

    drawMinimap(dungeon, geometry, cameraRoom) {
        const margin = 12;
        const panelWidth = Math.max(1, Math.min(240, width - margin * 2));
        const panelHeight = Math.max(1, Math.min(180, height - margin * 2));
        const padding = 8;
        const mapScale = Math.min(
            (panelWidth - padding * 2) / geometry.width,
            (panelHeight - padding * 2) / geometry.height
        );
        const mapWidth = geometry.width * mapScale;
        const mapHeight = geometry.height * mapScale;
        const panelX = width - panelWidth - margin;
        const panelY = margin;
        const mapX = panelX + (panelWidth - mapWidth) / 2;
        const mapY = panelY + (panelHeight - mapHeight) / 2;

        push();
        noStroke();
        fill(17, 23, 34, 220);
        rect(panelX, panelY, panelWidth, panelHeight, 8);

        fill(167, 181, 202);
        for (let index = 0; index < dungeon.connections.length; index += 1) {
            const connection = dungeon.connections[index];
            const fromExplored = this.exploredRoomIds.has(connection.fromRoomId);
            const toExplored = this.exploredRoomIds.has(connection.toRoomId);
            const traversed = this.traversedConnections.has(connection);
            if (!fromExplored && !toExplored && !traversed) {
                continue;
            }
            const tunnel = geometry.tunnels[index];
            const fromRoom = dungeon.rooms.find((room) => room.id === connection.fromRoomId);
            const toRoom = dungeon.rooms.find((room) => room.id === connection.toRoomId);

            const horizontal = tunnel.width >= tunnel.height;
            const fromPosition = geometry.positions[fromRoom.id];
            const toPosition = geometry.positions[toRoom.id];
            const fromCoordinate = horizontal
                ? fromPosition.x + fromRoom.width / 2
                : fromPosition.y + fromRoom.height / 2;
            const toCoordinate = horizontal
                ? toPosition.x + toRoom.width / 2
                : toPosition.y + toRoom.height / 2;
            const fullyRevealed = traversed || fromExplored && toExplored;
            const revealStart = fromExplored
                ? fromCoordinate <= toCoordinate
                : toCoordinate <= fromCoordinate;
            const tunnelX = tunnel.x + (
                !fullyRevealed && horizontal && !revealStart ? tunnel.width / 2 : 0
            );
            const tunnelY = tunnel.y + (
                !fullyRevealed && !horizontal && !revealStart ? tunnel.height / 2 : 0
            );
            const tunnelWidth = fullyRevealed
                ? tunnel.width
                : horizontal ? tunnel.width / 2 : tunnel.width;
            const tunnelHeight = fullyRevealed
                ? tunnel.height
                : horizontal ? tunnel.height : tunnel.height / 2;
            rect(
                mapX + tunnelX * mapScale,
                mapY + tunnelY * mapScale,
                Math.max(2, tunnelWidth * mapScale),
                Math.max(2, tunnelHeight * mapScale)
            );
        }

        fill(167, 181, 202);
        for (const room of dungeon.rooms) {
            if (!this.exploredRoomIds.has(room.id)) {
                continue;
            }
            const position = geometry.positions[room.id];
            rect(
                mapX + position.x * mapScale,
                mapY + position.y * mapScale,
                Math.max(1, room.width * mapScale),
                Math.max(1, room.height * mapScale)
            );
        }

        const playerRoomPosition = geometry.positions[cameraRoom.id];
        fill(0, 100, 255);
        circle(
            mapX + (playerRoomPosition.x + cameraRoom.width / 2) * mapScale,
            mapY + (playerRoomPosition.y + cameraRoom.height / 2) * mapScale,
            7
        );
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
