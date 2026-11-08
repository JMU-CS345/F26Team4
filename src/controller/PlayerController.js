class PlayerController {
    constructor(player) {
        this.player = player;
    }

    update() {
        let dx = 0;
        let dy = 0;

        if (keyIsDown(65)) dx -= 1;
        if (keyIsDown(68)) dx += 1;
        if (keyIsDown(87)) dy -= 1;
        if (keyIsDown(83)) dy += 1;

        this.player.move(dx, dy);
    }
}