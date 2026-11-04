const MageClass = Object.freeze({
    FIREMAGE: "fire",
    ICEMAGE: "ice",
    MINDMAGE: "mind"
});

const MAGE_CLASS_STATS = Object.freeze({
    [MageClass.FIREMAGE]: Object.freeze({
        health: 100,
        mana: 100,
        attackPower: 100,
        spellPower: 15
    }),
    [MageClass.ICEMAGE]: Object.freeze({
        health: 140,
        mana: 150,
        attackPower: 80,
        spellPower: 10
    }),
    [MageClass.MINDMAGE]: Object.freeze({
        health: 80,
        mana: 120,
        attackPower: 70,
        spellPower: 18
    })
});

class Entity {
    constructor({ name = "Entity", health, attackPower, spellPower, xpos = 0, ypos = 0 }) {
        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.spellPower = spellPower;
    }

    get isAlive() {
        return this.health > 0;
    }

    attack(target, power = this.attackPower) {
        return target.takeDamage(power);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health;
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        return this.health;
    }
}

class Player extends Entity {
    constructor(mageClass = MageClass.FIREMAGE, name = "Mage") {
        const stats = MAGE_CLASS_STATS[mageClass];

        super({ name, ...stats });
        this.mageClass = mageClass;
        this.mana = stats.mana;
    }
}
