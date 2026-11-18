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

    if (mageSelectError) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text(mageSelectError, width / 2, height * 0.92);
    }
}

function drawMageSelect() {
    background(150, 0, 0);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("Choose a Mage Type", width / 2, height / 3);

    if (mageSelectError) {
        fill(255);
        textSize(16);
        text(mageSelectError, width / 2, height * 0.72);
    }

}

function drawSaveFiles() {
    background(52, 203, 237);
}


function selectMage(type, seed = Date.now()) {
    mageType = type;
    fireButton.hide();
    iceButton.hide();
    mindButton.hide();
    setupMovement();
    gameState = "game";
    console.log("Selected:", mageType);
    
}

function drawHealthBar(x, y, w, h, health, maxHealth) {
  // background (empty) bar
  fill(60, 60, 60);
  noStroke();
  rect(x, y, w, h);

  // health portion, proportional
  const ratio = Math.max(0, health) / maxHealth;
  const healthColor = ratio > 0.5 ? [76, 175, 80]
                    : ratio > 0.25 ? [255, 193, 7]
                    : [244, 67, 54];
  fill(healthColor[0], healthColor[1], healthColor[2]);
  rect(x, y, w * ratio, h);

  // border
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(x, y, w, h);
}

function drawManaBar(x, y, w, h, mana, maxMana) {
  // background (empty) bar
  fill(60, 60, 60);
  noStroke();
  rect(x, y, w, h);

  // mana portion, proportional
  const ratio = Math.max(0, mana) / maxMana;
  fill(12, 200, 250);
  rect(x, y, w  * ratio, h);

  // border
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(x, y, w, h);
}