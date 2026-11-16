let player;
let playerController;
let playerView;
let wallView;
let level;


function setupMovement() {
  createCanvas(800, 600);

  const walls = [
    new Wall(200, 150, 300, 25),
    new Wall(500, 300, 25, 180),
    new Wall(150, 400, 200, 25)
  ];

  level = new Level(width, height, walls);
  player = new Player(mageType, "Mage", 100, 100);
  playerController = new PlayerController(player);
  playerView = new PlayerView();
  wallView = new WallView();

}

function drawMainGame() {
  background(220);

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



}