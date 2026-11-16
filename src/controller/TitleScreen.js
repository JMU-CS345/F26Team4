let gameState = "title";
let startButton;
let generateDungeonButton;
let seedEntryInput;
let generateSeedDungeonButton;
let fireButton;
let iceButton;
let mindButton;
let mageType;
let mageSelectError = "";

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(0)

    seedInput = createInput("");
    seedInput.attribute("readonly", "");
    seedInput.attribute("aria-label", "Dungeon seed. Select to copy.");
    seedInput.position(60, 12);
    seedInput.size(145, 24);
    seedInput.style("box-sizing", "border-box");
    seedInput.style("font-family", "monospace");
    seedInput.style("font-size", "14px");
    seedInput.style("color", "#ffffff");
    seedInput.style("background-color", "#111722");
    seedInput.style("border", "1px solid #718096");
    seedInput.style("border-radius", "4px");
    seedInput.mousePressed(() => seedInput.elt.select());
    seedInput.hide();

    const menuButtonWidth = Math.min(180, width - 32);
    startButton = createButton("START GAME");
    startButton.size(menuButtonWidth, 40);
    startButton.position((width - menuButtonWidth) / 2, height * 0.58);
    startButton.style("background-color", color(52, 235, 113));
    startButton.style("font-family", "Georgia")
    startButton.style('border-radius', '8px'); 
    startButton.style('cursor', 'pointer');

    generateDungeonButton = createButton("GENERATE DUNGEON");
    generateDungeonButton.size(menuButtonWidth, 40);
    generateDungeonButton.position((width - menuButtonWidth) / 2, height * 0.68);
    generateDungeonButton.style("background-color", color(52, 180, 235));
    generateDungeonButton.style("font-family", "Georgia");
    generateDungeonButton.style("border-radius", "8px");
    generateDungeonButton.style("cursor", "pointer");

    seedEntryInput = createInput("");
    seedEntryInput.attribute("aria-label", "Enter a dungeon seed");
    seedEntryInput.attribute("placeholder", "Enter seed");
    seedEntryInput.position((width - menuButtonWidth) / 2, height * 0.76);
    seedEntryInput.size(menuButtonWidth, 34);
    seedEntryInput.style("box-sizing", "border-box");
    seedEntryInput.input(() => {
        mageSelectError = "";
    });

    generateSeedDungeonButton = createButton("GENERATE FROM SEED");
    generateSeedDungeonButton.size(menuButtonWidth, 40);
    generateSeedDungeonButton.position((width - menuButtonWidth) / 2, height * 0.83);
    generateSeedDungeonButton.style("background-color", color(180, 130, 235));
    generateSeedDungeonButton.style("font-family", "Georgia");
    generateSeedDungeonButton.style("border-radius", "8px");
    generateSeedDungeonButton.style("cursor", "pointer");

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
        generateDungeonButton.hide();
        seedEntryInput.hide();
        generateSeedDungeonButton.hide();
        mageSelectError = "";
        fireButton.show();
        iceButton.show();
        mindButton.show();
        gameState = "mageSelect";
    });

    generateDungeonButton.mousePressed(() => {
        selectMage(mageType || "fire");
    });

    generateSeedDungeonButton.mousePressed(() => {
        const seed = seedEntryInput.value().trim();
        if (seed.length === 0) {
            mageSelectError = "Enter a seed to generate a dungeon.";
            return;
        }
        selectMage(mageType || "fire", seed);
    });
}

function draw() {
    if (gameState === "title") {
        drawTitleScreen();
    } else if (gameState === "mageSelect") {
        drawMageSelect();
    } else if (gameState === "game") {
        drawDungeon();
    }
}