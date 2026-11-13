let gameState = "title";
let startButton;
let fireButton;
let iceButton;
let mindButton;
let mageType;

function setup() {
    createCanvas(600, 400);
    fill(0)

    startButton = createButton("START GAME");
    startButton.position(width / 2 - startButton.width / 2, height / 2 + 50);
    startButton.size(width / 6, height / 10);
    startButton.style("background-color", color(52, 235, 113));
    startButton.style("font-family", "Georgia")
    startButton.style('border-radius', '8px'); 
    startButton.style('cursor', 'pointer');
    
    fireButton = createButton("Fire Mage");
    fireButton.position(width / 8, height / 2 + 75);
    fireButton.size(100, 25);
    fireButton.style('background-color', '#db2626');
    fireButton.style('border-radius', '12px');

    iceButton = createButton("Ice Mage");
    iceButton.position(width / 3 + 50, height / 2 + 75);
    iceButton.size(100, 25);
    iceButton.style('background-color', '#58f8fd');
    iceButton.style('border-radius', '12px');

    mindButton = createButton("Mind Mage");
    mindButton.position(width / 2 + 125, height / 2 + 75);
    mindButton.size(100, 25);
    mindButton.style('background-color', '#af4c4c');
    mindButton.style('border-radius', '12px');

    fireButton.mousePressed(() => { selectMage("fire") });
    iceButton.mousePressed(() => { selectMage("ice") });
    mindButton.mousePressed(() => { selectMage("mind") });
    fireButton.hide();
    iceButton.hide();
    mindButton.hide();

    startButton.mousePressed(() => {
        startButton.hide();
        fireButton.show();
        iceButton.show();
        mindButton.show();
        gameState = "mageSelect";
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
    if (gameState == "stats") {
        drawOptionsMenu()
    }
}