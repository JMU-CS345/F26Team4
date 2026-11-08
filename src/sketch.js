let player;
let playerController;

function setup() {
  createCanvas(800, 600);

  player = new Player();
  playerController = new PlayerController(player);
}

function draw() {
  background(220);

  playerController.update();

  // Keep the player inside the canvas.
  player.x = constrain(player.x, player.radius, width - player.radius);
  player.y = constrain(player.y, player.radius, height - player.radius);

  circle(player.x, player.y, player.radius * 2);
}