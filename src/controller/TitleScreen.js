let gameState = "title";
let startButton;

function setup() {
    createCanvas(600, 400);
    
    startButton = createButton("START GAME");
    startButton.position(width / 2 - startButton.width / 2, height / 2 + 50);
    startButton.size(width / 6, height / 10);
    startButton.style("background-color", color(52, 235, 113));
    startButton.style("font-family", "Georgia")
    startButton.style('border-radius', '8px'); 
    startButton.style('cursor', 'pointer');
    
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