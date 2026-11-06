function drawTitleScreen() {
    background(150, 0, 150);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("MageQuest", width / 2, height / 3);

    textSize(18);
    text("Click START to begin", width / 2, height / 2);
}

function drawMageSelect() {
    background(150, 0, 150);
}

function drawMainGame() {
    background(50, 150, 100);
    textAlign(CENTER, CENTER);

    textSize(32);
    text("Game is running", width / 2, height / 2);
}