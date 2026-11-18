function drawOptionsMenu() {
    createCanvas(800, 600);
    background(220);
    text("Health: " + player.health, 70, height - 20);
    text("Mana: " + player.mana, 290, height - 20);
    fill(1)
    


}
function CreateOptionsButton() {
    OptionsButton = createButton("Options");
    OptionsButton.position(width, 0);
    OptionsButton.size(100, 25);
    OptionsButton.style('background-color', '#af4c4c');
    OptionsButton.style('border-radius', '12px');
    OptionsButton.hide();
    
}



// function draw() {
//    OptionsButton.show();
// }