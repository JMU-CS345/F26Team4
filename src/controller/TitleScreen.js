let gameState = "title";
let startButton;
let fireButton;
let iceButton;
let mindButton;
let mageType;

let newButton;
let loadButton;

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
        newButton.show();
        loadButton.show();
    });

    newButton = createButton("NEW GAME");
    newButton.position(width / 2 - newButton.width / 2, height / 2 + 50);
    newButton.size(width / 6, height / 10);
    newButton.style("background-color", color(52, 235, 113));
    newButton.style("font-family", "Georgia")
    newButton.style('border-radius', '8px'); 
    newButton.style('cursor', 'pointer');
    newButton.hide();

    newButton.mousePressed(() => {
        newButton.hide();
        loadButton.hide();
        fireButton.show();
        iceButton.show();
        mindButton.show();
        gameState === "mageSelect";
    });

    loadButton = createButton("LOAD");
    loadButton.position(width / 2 - loadButton.width / 2, height / 2 + 50);
    loadButton.size(width / 6, height / 10);
    loadButton.style("background-color", color(52, 235, 113));
    loadButton.style("font-family", "Georgia")
    loadButton.style('border-radius', '8px'); 
    loadButton.style('cursor', 'pointer');
    loadButton.hide();

    loadButton.mousePressed(() => {
        loadButton.hide();
        newButton.hide();
        gameState = "saveFiles";
    });
}

function draw() {
    if (gameState === "title") {
        drawTitleScreen();
    } else if (gameState === "saveFiles") {
        drawSaveFiles();
    } else if (gameState === "mageSelect") {
        drawMageSelect();
    } else if (gameState === "game") {
        drawMainGame();
    }
}