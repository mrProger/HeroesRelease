let player = {
    hp: 100,
    stockHp: 100,
    defense: 10,
    damage: 10,
    type: "player",
    healthBar: document.querySelector("#player-health-bar")
};
let enemy = {
    hp: 100,
    stockHp: 100,
    defense: 5,
    damage: 5,
    type: "enemy",
    healthBar: document.querySelector("#enemy-health-bar"),
    expRewards: 1,
    moneyRewards: 1
};
let interval = "a";

const initBattle = () => {
    updateHealthBars();
}

const updateHealthBars = (playerHealthBar, enemyHealthBar) => {
    playerHealthBar.style.width = calcPercents(player.hp, player.stockHp);
    enemyHealthBar.style.width = calcPercents(enemy.hp, enemy.stockHp);
}

const endBattle = (target) => {
    fetch("api/v1/endBattle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            target: target,
            moneyRewards: target === "enemy" ? enemy.moneyRewards : 0,
            expRewards: target === "enemy" ? enemy.expRewards : 0
        })
    }).then(() => {
        if (target === "player") {
            alert(`Вы победили!\nНаграда: ${enemy.moneyRewards} Монет и ${enemy.expRewards} Опыта`);
        } else {
            let result = confirm("Вы проиграли! Желаете родолжить?");
            if (result) {
                generateEnemy();
                getUserForArena();
            } else {
                document.location = "/hero";
            }
        }
        clearInterval(interval);
    });
}

const attack = (target, damage) => {
    if (target.hp <= 0) {
        endBattle(target.type);
        return;
    }

    if (interval === undefined) {
        interval = setInterval(() => attack(player, enemy.damage), 1000);
    }

    if (target.hp > 0) {
        target.hp -= damage;
        updateHealthBars(player.healthBar, enemy.healthBar);
    }
}