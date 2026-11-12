let gameState = "title";
let startButton;
let connectedRoomsButton;
let fireButton;
let iceButton;
let mindButton;
let mageType;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(0)

    const menuButtonWidth = Math.min(180, width - 32);
    startButton = createButton("START GAME");
    startButton.size(menuButtonWidth, 40);
    startButton.position((width - menuButtonWidth) / 2, height * 0.58);
    startButton.style("background-color", color(52, 235, 113));
    startButton.style("font-family", "Georgia")
    startButton.style('border-radius', '8px'); 
    startButton.style('cursor', 'pointer');

    connectedRoomsButton = createButton("CONNECTED ROOMS");
    connectedRoomsButton.size(menuButtonWidth, 36);
    connectedRoomsButton.position((width - menuButtonWidth) / 2, height * 0.7);
    connectedRoomsButton.style("background-color", "#42b6a6");
    connectedRoomsButton.style("font-family", "Georgia");
    connectedRoomsButton.style("border-radius", "8px");
    connectedRoomsButton.style("cursor", "pointer");
    
    fireButton = createButton("Fire Mage");
    const mageButtonWidth = Math.min(100, (width - 32) / 3);
    const mageButtonGap = (width - mageButtonWidth * 3) / 4;
    fireButton.position(mageButtonGap, height / 2 + 75);
    fireButton.size(mageButtonWidth, 25);
    fireButton.style('background-color', '#db2626');
    fireButton.style('border-radius', '12px');

    iceButton = createButton("Ice Mage");
    iceButton.position(mageButtonGap * 2 + mageButtonWidth, height / 2 + 75);
    iceButton.size(mageButtonWidth, 25);
    iceButton.style('background-color', '#58f8fd');
    iceButton.style('border-radius', '12px');

    mindButton = createButton("Mind Mage");
    mindButton.position(mageButtonGap * 3 + mageButtonWidth * 2, height / 2 + 75);
    mindButton.size(mageButtonWidth, 25);
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
        connectedRoomsButton.hide();
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
        drawConnectedDungeon();
    }
}