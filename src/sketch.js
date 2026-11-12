let player;
let playerController;
let playerView;
let level;
let dungeonLayout;
let dungeonView;
let dungeonGeometry;
let seedInput;

function setupDungeon(seed = Date.now(), options = {}) {
  dungeonLayout = DungeonGenorator.generate({
    seed,
    ...options,
    roomCount: 10
  });

  const positions = Object.fromEntries(dungeonLayout.rooms.map((room) => [
    room.id,
    {
      x: room.gridPosition.x * DungeonRooms.gridCellSize,
      y: room.gridPosition.y * DungeonRooms.gridCellSize
    }
  ]));
  const tunnels = [];

  for (const connection of dungeonLayout.connections) {
    const fromRoom = dungeonLayout.rooms.find((room) => room.id === connection.fromRoomId);
    const toRoom = dungeonLayout.rooms.find((room) => room.id === connection.toRoomId);
    if (!fromRoom || !toRoom) {
      throw new RangeError("Generated connections must reference existing rooms");
    }
    const fromTunnel = fromRoom.tunnels.find((tunnel) => tunnel.side === connection.fromSide);
    const toTunnel = toRoom.tunnels.find((tunnel) => tunnel.side === connection.toSide);
    if (!fromTunnel || !toTunnel) {
      throw new RangeError("Connected rooms must contain the selected tunnel sides");
    }

    const fromPosition = positions[fromRoom.id];
    const toPosition = positions[toRoom.id];
    const horizontal = connection.fromSide === "east" || connection.fromSide === "west";
    if (horizontal && fromTunnel.height !== toTunnel.height ||
        !horizontal && fromTunnel.width !== toTunnel.width) {
      throw new RangeError("Connected room tunnel openings must have matching widths");
    }

    if (connection.fromSide === "east") {
      tunnels.push({
        x: fromPosition.x + fromRoom.width,
        y: fromPosition.y + fromTunnel.y,
        width: fromTunnel.length + toTunnel.length,
        height: fromTunnel.height
      });
    } else if (connection.fromSide === "west") {
      tunnels.push({
        x: toPosition.x + toRoom.width,
        y: fromPosition.y + fromTunnel.y,
        width: fromTunnel.length + toTunnel.length,
        height: fromTunnel.height
      });
    } else if (connection.fromSide === "south") {
      tunnels.push({
        x: fromPosition.x + fromTunnel.x,
        y: fromPosition.y + fromRoom.height,
        width: fromTunnel.width,
        height: fromTunnel.length + toTunnel.length
      });
    } else {
      tunnels.push({
        x: fromPosition.x + fromTunnel.x,
        y: toPosition.y + toRoom.height,
        width: fromTunnel.width,
        height: fromTunnel.length + toTunnel.length
      });
    }
  }

  const worldWalls = dungeonLayout.rooms.flatMap((room) => {
    const position = positions[room.id];
    return room.walls.map((wall) => new Wall(
      position.x + wall.xpos,
      position.y + wall.ypos,
      wall.width,
      wall.height
    ));
  });
  const visibleWalls = [...worldWalls];
  for (const [index, tunnel] of tunnels.entries()) {
    const connection = dungeonLayout.connections[index];
    const fromRoom = dungeonLayout.rooms.find((room) => room.id === connection.fromRoomId);
    const toRoom = dungeonLayout.rooms.find((room) => room.id === connection.toRoomId);
    const tunnelWallThickness = Math.min(fromRoom.gridCellSize, toRoom.gridCellSize);
    const horizontal = tunnel.width > tunnel.height;
    const tunnelWalls = horizontal
      ? [
        new Wall(tunnel.x, tunnel.y - tunnelWallThickness, tunnel.width, tunnelWallThickness),
        new Wall(tunnel.x, tunnel.y + tunnel.height, tunnel.width, tunnelWallThickness)
      ]
      : [
        new Wall(tunnel.x - tunnelWallThickness, tunnel.y, tunnelWallThickness, tunnel.height),
        new Wall(tunnel.x + tunnel.width, tunnel.y, tunnelWallThickness, tunnel.height)
      ];
    worldWalls.push(...tunnelWalls);
    visibleWalls.push(...tunnelWalls);
  }

  const width = Math.max(...dungeonLayout.rooms.map((room) =>
    positions[room.id].x + room.width
  ));
  const height = Math.max(...dungeonLayout.rooms.map((room) =>
    positions[room.id].y + room.height
  ));
  dungeonGeometry = { positions, tunnels, visibleWalls, width, height };
  level = new Level(width, height, worldWalls);

  const startRoom = dungeonLayout.rooms[0];
  const startPosition = positions[startRoom.id];
  player = new Player(
    mageType,
    "Mage",
    startPosition.x + startRoom.width / 2,
    startPosition.y + startRoom.height / 2
  );
  playerController = new PlayerController(player);
  playerView = new PlayerView();
  dungeonView = new DungeonView();
  seedInput.value(String(dungeonLayout.seed));
  seedInput.show();
}

function drawDungeon() {
  playerController.update(level);
  background(17, 23, 34);
  dungeonView.draw(dungeonLayout, dungeonGeometry, player, playerView, dungeonGeometry.visibleWalls);

  push();
  noStroke();
  fill(17, 23, 34, 220);
  rect(8, 8, 205, 32, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(16);
  text("Seed:", 16, 24);
  pop();
}
