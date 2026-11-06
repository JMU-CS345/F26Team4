let currentScreen = "mainMenu";
let newButton;

function setup() {
  createCanvas(500, 500);
  newButton = createButton("PLAY");
  newButton.position(100, 100);
  newButton.mousePressed(buttonPressedAction);
}

function draw() {
  if (currentScreen === "mainMenu") {
    background(220);
  }
  if (currentScreen === "mageSelect") {
    newButton.remove();
    background(0, 0, 0);
    mageSelectMenu();
  }
}

function buttonPressedAction() {
  currentScreen = "mageSelect";
}



