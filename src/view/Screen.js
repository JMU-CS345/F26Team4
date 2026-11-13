let titleSize = 50;
let titleIncrease = true;
let titleAngle = 0;
let titleRotate = true;

function drawTitleScreen() {
    for (let y = 0; y < height; y++) {
        n = map(y, 0, height, 0, 1);
        let newColor = lerpColor(color(161, 52, 235), color(225, 70, 255), n);
        stroke(newColor);
        line(0, y, width, y);
    }

    push();
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    translate(width / 2, height / 3);

    if (titleSize >= 55) {
        titleIncrease = false;
    } else if (titleSize <= 45) {
        titleIncrease = true;
    }

    if (titleIncrease) {
        titleSize += 0.4;
    } else {
        titleSize -= 0.4;
    }

    if (titleAngle >= 10) {
        titleRotate = false;
    } else if (titleAngle <= -10) {
        titleRotate = true;
    }

    if (titleRotate) {
        rotate(titleAngle += 0.2);
    } else {
        rotate(titleAngle -= 0.2);
    }

    textSize(titleSize);
    textFont("Georgia")
    fill(200, 20, 240);
    stroke(50, 20, 100);
    strokeWeight(6);
    text("MageQuest", 0, 0);
    pop();
}

function drawMageSelect() {
    background(150, 0, 0);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("Choose a Mage Type", width / 2, height / 3);

}


function selectMage(type) {
    mageType = type;
    fireButton.hide();
    iceButton.hide();
    mindButton.hide();
    setupMovement();
    gameState = "game";
    console.log("Selected:", mageType);
}