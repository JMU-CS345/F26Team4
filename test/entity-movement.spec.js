describe("shared entity movement", function () {
  let level;

  beforeEach(function () {
    level = new Level(100, 100, [new Wall(40, 20, 10, 60)]);
  });

  it("moves game players and combat entities through the same API", function () {
    const gamePlayer = new GamePlayer(20, 50);
    const mage = new Player(MageClass.FIREMAGE, "Mage", 20, 50);
    const enemy = new Enemy(EnemiesClass.GOBLIN, 20, 50);

    for (let step = 0; step < 10; step++) {
      gamePlayer.move(1, 0, level);
      mage.move(1, 0, level);
      enemy.move(1, 0, level);
    }

    expect(gamePlayer.x).toBe(23);
    expect(mage.x).toBe(23);
    expect(enemy.x).toBe(23);
  });

  it("keeps legacy combat entity position properties synchronized", function () {
    const enemy = new Enemy(EnemiesClass.GOBLIN, 20, 80);

    enemy.move(0, -1, level);

    expect(enemy.y).toBe(77);
    expect(enemy.ypos).toBe(77);
    enemy.xpos = 30;
    expect(enemy.x).toBe(30);
  });

  it("uses each entity's radius when stopping at walls", function () {
    const smallEnemy = new Enemy(EnemiesClass.GOBLIN, 20, 50, 5);

    for (let step = 0; step < 10; step++) {
      smallEnemy.move(1, 0, level);
    }

    expect(smallEnemy.x).toBe(35);
  });

  it("preserves diagonal normalization and wall sliding", function () {
    const gamePlayer = new GamePlayer(25, 50);

    gamePlayer.move(1, 1, level);

    expect(gamePlayer.x).toBe(25);
    expect(gamePlayer.y).toBeCloseTo(50 + 3 / Math.sqrt(2));
  });
});
