let player;
let playerController;
let playerView;
let level;
let dungeonLayout;
let dungeonView;
let dungeonGeometry;
let seedInput;
let enemies = [];
let enemyView;


function setupMovement() {
  createCanvas(800, 600);

  const positions = Object.fromEntries(dungeonLayout.rooms.map((room) => [
    room.id,
    {
      x: room.gridPosition.x * DungeonRooms.gridCellSize,
      y: room.gridPosition.y * DungeonRooms.gridCellSize
    }
  ]));
  const tunnels = [];

  level = new Level(width, height, walls);
  player = new Player(mageType, "Mage", 100, 100);
  playerController = new PlayerController(player);
  playerView = new PlayerView();
  wallView = new WallView();

}

    const fromPosition = positions[fromRoom.id];
    const toPosition = positions[toRoom.id];
    const horizontal = connection.fromSide === "east" || connection.fromSide === "west";
    if (horizontal && fromTunnel.height !== toTunnel.height ||
        !horizontal && fromTunnel.width !== toTunnel.width) {
      throw new RangeError("Connected room tunnel openings must have matching widths");
    }

  OptionsButton.show()

  playerView.draw(player);

  fill(0, 0, 0);
  textSize(15)
  if (player.health >= 0) {
    drawHealthBar(25, height - 30, 220, 22, player.health, player.maxHealth);
    text("Health: " + player.health, 70, height - 20);
  }
  else {
    drawHealthBar(25, height - 30, 220, 22, 0, player.maxHealth);
    text("Health: 0", 70, height - 20);
  }

  if (player.mana >= 0) {
    drawManaBar(250, height - 30, 220, 22, player.mana, player.maxMana);
    text("Mana: " + player.mana, 290, height - 20);
  }
  else {
    drawManaBar(250, height - 30, 220, 22, 0, player.maxMana);
    text("Mana: 0", 290, height - 20);
  }



  playerController.update(level);

  for (const wall of level.walls) {
    wallView.draw(wall);
  }




