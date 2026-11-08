let player;
let playerController;
let playerView;
let wallView;
let level;

function setup() {
  createCanvas(800, 600);

  const walls = [
    new Wall(200, 150, 300, 25),
    new Wall(500, 300, 25, 180),
    new Wall(150, 400, 200, 25)
  ];

  level = new Level(width, height, walls);
  player = new Player(100, 100);
  playerController = new PlayerController(player);
  playerView = new PlayerView();
  wallView = new WallView();
}

function draw() {
  background(220);

  playerController.update(level);

  for (const wall of level.walls) {
    wallView.draw(wall);
  }

  playerView.draw(player);
}