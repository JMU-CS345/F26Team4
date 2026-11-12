function generateConnectedDemo(seed = "connected-rooms-demo") {
    const startRoom = DungeonLayout.createRoomInstance({
        id: "start",
        layout: DungeonRooms.layouts.StartRoom,
        gridX: 0,
        gridY: 0
    });
    const enemyRoom = DungeonLayout.createRoomInstance({
        id: "enemy-1",
        layout: DungeonRooms.layouts.EnemyRoom1,
        gridX: 1,
        gridY: 0,
        tunnelSides: ["west"]
    });

    return DungeonLayout.create({
        seed,
        rooms: [startRoom, enemyRoom],
        connections: [{
            fromRoomId: startRoom.id,
            fromSide: "east",
            toRoomId: enemyRoom.id,
            toSide: "west"
        }]
    });
}

const DungeonGenorator = Object.freeze({
    generateConnectedDemo
});