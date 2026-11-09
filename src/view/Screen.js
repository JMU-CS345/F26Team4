
function drawTitleScreen() {
    background(150, 0, 150);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("MageQuest", width / 2, height / 3);

    textSize(18);
    text("Click START to begin", width / 2, height / 2);
}

function drawMageSelect() {
    background(150, 0, 0);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("Choose a Mage Type", width / 2, height / 3);

}

function drawMainGame() {
    fireButton.hide();
    iceButton.hide();
    mindButton.hide();

    if (mageType === "fire") {
        background(199, 38, 6);
    }
    else if (mageType === "ice") {
        background(45, 247, 244);
    }
    else {
        background(209, 33, 222);
    }

    textAlign(CENTER, CENTER);

    textSize(32);
    text("Game is running", width / 2, height / 2);
}



function selectMage(type) {
    mageType = type;
    fireButton.hide();
    iceButton.hide();
    mindButton.hide();
    gameState = "game";
    console.log("Selected:", mageType);
}