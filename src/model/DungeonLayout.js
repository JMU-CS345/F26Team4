function createDungeonRoomInstance({
    id,
    layout,
    gridX,
    gridY,
    tunnelSides,
    generatedData = {}
} = {}) {
    if (typeof id !== "string" || id.length === 0) {
        throw new TypeError("Dungeon room instances require an id");
    }
    if (!Number.isInteger(gridX) || !Number.isInteger(gridY)) {
        throw new TypeError("Dungeon room grid positions must be integers");
    }
    if (!generatedData || typeof generatedData !== "object" || Array.isArray(generatedData)) {
        throw new TypeError("Dungeon room generatedData must be an object");
    }
    const enemies = generatedData.enemies === undefined ? [] : generatedData.enemies;
    const chestContents = generatedData.chestContents === undefined ? [] : generatedData.chestContents;
    const other = generatedData.other === undefined ? {} : generatedData.other;
    if (!Array.isArray(enemies) || !Array.isArray(chestContents) ||
        !other || typeof other !== "object" || Array.isArray(other)) {
        throw new TypeError("Room enemies and chestContents must be arrays, and other must be an object");
    }

    const room = DungeonRooms.createRoom(layout, tunnelSides);
    return {
        id,
        template: room.name,
        type: room.type,
        width: room.width,
        height: room.height,
        gridSize: room.gridSize,
        gridCellSize: room.gridCellSize,
        gridPosition: { x: gridX, y: gridY },
        tunnelSides: room.tunnelSides,
        tunnels: room.tunnels,
        walls: room.walls,
        enemySpawnPoints: room.enemySpawnPoints || [],
        barrelSpawnPoints: room.barrelSpawnPoints || [],
        specialSpawnPoints: room.specialSpawnPoints || [],
        chestSpawnPoint: room.chestSpawnPoint || null,
        generatedData: {
            enemies: [...enemies],
            chestContents: [...chestContents],
            other: { ...other }
        }
    };
}

function createDungeonLayout({ seed, rooms = [], connections = [] } = {}) {
    const validSeed = (typeof seed === "string" && seed.length > 0) ||
        (typeof seed === "number" && Number.isFinite(seed));
    if (!validSeed) {
        throw new TypeError("Dungeon layouts require a string or finite numeric seed");
    }
    if (!Array.isArray(rooms) || !Array.isArray(connections)) {
        throw new TypeError("Dungeon rooms and connections must be arrays");
    }
    const roomsById = new Map();
    for (const room of rooms) {
        if (!room || typeof room.id !== "string" || room.id.length === 0 ||
            !Array.isArray(room.tunnelSides)) {
            throw new TypeError("Dungeon rooms require an id and selected tunnel sides");
        }
        if (roomsById.has(room.id)) {
            throw new RangeError(`Duplicate dungeon room id: ${room.id}`);
        }
        roomsById.set(room.id, room);
    }
    for (const connection of connections) {
        if (!connection ||
            typeof connection.fromRoomId !== "string" ||
            !DungeonRooms.sides.includes(connection.fromSide) ||
            typeof connection.toRoomId !== "string" ||
            !DungeonRooms.sides.includes(connection.toSide)) {
            throw new TypeError("Dungeon connections require room IDs and tunnel sides at both ends");
        }
        const fromRoom = roomsById.get(connection.fromRoomId);
        const toRoom = roomsById.get(connection.toRoomId);
        if (!fromRoom || !toRoom ||
            !fromRoom.tunnelSides.includes(connection.fromSide) ||
            !toRoom.tunnelSides.includes(connection.toSide)) {
            throw new RangeError("Dungeon connections must use existing rooms and selected tunnel sides");
        }
    }

    return {
        seed,
        rooms: [...rooms],
        connections: [...connections],
        generatedData: {}
    };
}

const DungeonLayout = Object.freeze({
    createRoomInstance: createDungeonRoomInstance,
    create: createDungeonLayout
});
