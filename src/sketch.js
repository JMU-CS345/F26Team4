let player;
let playerController;
let playerView;
let level;
let dungeonLayout;
let dungeonView;
let dungeonGeometry;

function setupDungeon() {
  createCanvas(windowWidth, windowHeight);

  dungeonLayout = DungeonGenorator.generateConnectedDemo();
  const startRoom = dungeonLayout.rooms.find((room) => room.id === "start");
  const enemyRoom = dungeonLayout.rooms.find((room) => room.id === "enemy-1");
  if (!startRoom || !enemyRoom) {
    throw new RangeError("The connected-room generator must return its start and enemy rooms");
  }

  const startPosition = {
    x: 0,
    y: (enemyRoom.height - startRoom.height) / 2
  };
  const startTunnel = startRoom.tunnels.find((tunnel) => tunnel.side === "east");
  const enemyTunnel = enemyRoom.tunnels.find((tunnel) => tunnel.side === "west");
  const tunnel = {
    x: startPosition.x + startRoom.width,
    y: startPosition.y + (startRoom.height - DungeonRooms.tunnelPreset.width) / 2,
    width: startTunnel.length + enemyTunnel.length,
    height: DungeonRooms.tunnelPreset.width
  };
  const enemyPosition = { x: tunnel.x + tunnel.width, y: 0 };
  const positions = {
    [startRoom.id]: startPosition,
    [enemyRoom.id]: enemyPosition
  };
  const worldWalls = dungeonLayout.rooms.flatMap((room) => {
    const position = positions[room.id];
    return room.walls.map((wall) => new Wall(
      position.x + wall.xpos,
      position.y + wall.ypos,
      wall.width,
      wall.height
    ));
  });
  const tunnelWallThickness = Math.min(startRoom.gridCellSize, enemyRoom.gridCellSize);
  worldWalls.push(
    new Wall(tunnel.x, tunnel.y - tunnelWallThickness, tunnel.width, tunnelWallThickness),
    new Wall(tunnel.x, tunnel.y + tunnel.height, tunnel.width, tunnelWallThickness)
  );

  dungeonGeometry = {
    positions,
    tunnel,
    width: enemyPosition.x + enemyRoom.width,
    height: Math.max(
      startPosition.y + startRoom.height,
      enemyPosition.y + enemyRoom.height
    )
  };
  level = new Level(dungeonGeometry.width, dungeonGeometry.height, worldWalls);
  player = new Player(
    mageType,
    "Mage",
    startPosition.x + startRoom.width / 2,
    startPosition.y + startRoom.height / 2
  );
  playerController = new PlayerController(player);
  playerView = new PlayerView();
  dungeonView = new DungeonView();
}

function drawConnectedDungeon() {
  playerController.update(level);
  background(17, 23, 34);
  dungeonView.draw(dungeonLayout, dungeonGeometry, player, playerView, level.walls);
}
