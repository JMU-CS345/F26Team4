let gameState = "title";
let startButton;

function setup() {
    createCanvas(600, 400);
    fill(0)
    
    startButton = createButton("START GAME");
    startButton.position(width / 2 - 60, height / 2 + 50);
    startButton.size(120, 40);
    
    startButton.mousePressed(() => {
        gameState = "mageSelect";
        startButton.hide();
    });
}

function draw() {
    if (gameState === "title") {
        drawTitleScreen();
    } else if (gameState === "mageSelect") {
        drawMageSelect();
    } else if (gameState === "game") {
        drawMainGame();
    }
}