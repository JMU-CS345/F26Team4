const MageClass = Object.freeze({
    FIREMAGE: "fire",
    ICEMAGE: "ice",
    MINDMAGE: "mind"
});

const EnemiesClass = Object.freeze({
    GOBLIN: "goblin",
    SKELETON: "skeleton",
    EVILMAGE: "evil-mage",
    GHOST: "ghost"
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

const ENEMY_STATS = Object.freeze({
    [EnemiesClass.GOBLIN]: Object.freeze({
        name: "Goblin",
        health: 50,
        attackPower: 8,
        spellPower: 0
    }),
    [EnemiesClass.SKELETON]: Object.freeze({
        name: "Skeleton",
        health: 75,
        attackPower: 12,
        spellPower: 0
    }),
    [EnemiesClass.EVILMAGE]: Object.freeze({
        name: "Evil Mage",
        health: 80,
        attackPower: 8,
        spellPower: 18
    }),
    [EnemiesClass.GHOST]: Object.freeze({
        name: "Ghost",
        health: 60,
        attackPower: 10,
        spellPower: 15
    })
});

class Entity {
    constructor({
        name,
        health,
        mana,
        attackPower,
        spellPower,
        xpos = 0,
        ypos = 0,
        radius = 15,
        speed = 3
    }) {
        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.health = health;
        this.maxHealth = health;
        if (mana !== undefined) {
            this.mana = mana;
        }
        this.attackPower = attackPower;
        this.spellPower = spellPower;
    }

    move(dx, dy, level) {
        moveEntity(this, dx, dy, level, "xpos", "ypos");
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
    constructor(mageClass, name = "Mage", xpos = 0, ypos = 0) {
        const stats = MAGE_CLASS_STATS[mageClass];
        if (!stats) {
            throw new RangeError(`Unknown mage class`);
        }

        super({ name, ...stats, xpos, ypos });
        this.mageClass = mageClass;
    }
}

class Enemy extends Entity {
    constructor(enemyClass, xpos = 0, ypos = 0) {
        const stats = ENEMY_STATS[enemyClass];
        if (!stats) {
            throw new RangeError(`Unknown enemy class`);
        }

        super({ ...stats, xpos, ypos });
        this.enemyClass = enemyClass;
    }
}
