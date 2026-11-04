let fireButton;
let iceButton;
let mindButton;

function setup() {
    createCanvas(500, 500);
    background(0,0,0);
    fireButton = createButton("Fire Mage");
    fireButton.position(25, 350);
    fireButton.mousePressed(buttonPressedAction);
    fireButton.size(100, 25);
    fireButton.style('background-color', '#db2626');
    fireButton.style('color', 'black');
    fireButton.style('font-size', '16px');
    fireButton.style('border', 'none');

    iceButton = createButton("Ice Mage");
    iceButton.position(150, 350);
    iceButton.mousePressed(buttonPressedAction);
    iceButton.size(100, 25);
    iceButton.style('background-color', '#58f8fd');
    iceButton.style('color', 'black');
    iceButton.style('font-size', '16px');
    iceButton.style('border', 'none');

    mindButton = createButton("Mind Mage");
    mindButton.position(275, 350);
    mindButton.mousePressed(buttonPressedAction);
    mindButton.size(100, 25);
    mindButton.style('background-color', '#af4c4c');
    mindButton.style('color', 'black');
    mindButton.style('font-size', '16px');
    mindButton.style('border', 'none');

}

function buttonPressedAction() {
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor);
    circle(100,100,50);
    console.log("Button clicked!");
}

