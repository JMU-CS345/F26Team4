class EnemyView {
  draw(enemy) {
    const colors = {
      goblin: [50, 180, 70],
      skeleton: [220, 220, 200],
      "evil-mage": [200, 50, 50],
      ghost: [150, 150, 230]
    };

    const enemyColor = colors[enemy.enemyClass] || [200, 50, 50];

    push();
    noStroke();
    fill(enemyColor[0], enemyColor[1], enemyColor[2]);
    circle(enemy.xpos, enemy.ypos, enemy.radius * 2);
    pop();
  }
}