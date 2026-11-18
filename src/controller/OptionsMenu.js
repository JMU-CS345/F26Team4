function drawOptionsMenu() {
    createCanvas(800, 600);
    background(220);
    fill(0,0,0);
    textSize(24);
    text("Health: " + player.health, 100, height - 570);
    textSize(24);
    text("MaxHealth: " + player.maxHealth, 100, height - 540);
    textSize(24);
    text("Mana: " + player.mana, 100, height - 510);
    textSize(24);
    text("MaxMana: " + player.maxMana, 100, height - 480);
    textSize(24);
    text("AttackPower: " + player.attackPower, 100, height - 450);
    textSize(24);
    text("SpellPower: " + player.spellPower, 100, height - 420);
    textSize(24);
    fill(1)

    


    


}
function CreateOptionsButton() {
    OptionsButton = createButton("Stats");
    OptionsButton.position(width, 0);
    OptionsButton.size(100, 25);
    OptionsButton.style('background-color', '#af4c4c');
    OptionsButton.style('border-radius', '12px');
    OptionsButton.hide();
    
}





// function draw() {
//    OptionsButton.show();
// }