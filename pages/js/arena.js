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
let interval = undefined;

const initBattle = () => {
    updateHealthBars();
}

const updateHealthBars = (playerHealthBar, enemyHealthBar) => {
    playerHealthBar.style.width = calcPercents(player.hp, 5000);
    enemyHealthBar.style.width = calcPercents(enemy.hp, enemy.stockHp);
}

const endBattle = (target) => {
    clearInterval(interval);
    interval = undefined;

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
        if (target === "enemy") {
            document.querySelector("#battle-modal-label").innerText = "Вы победили!";
            new bootstrap.Modal(document.querySelector("#battleModal")).show();
            let money = parseInt(document.querySelector("#money").innerText);
            document.querySelector("#money").innerText = money + parseInt(enemy.moneyRewards);
        } else {
            document.querySelector("#battle-modal-label").innerText = "Вы проиграли!";
            new bootstrap.Modal(document.querySelector("#battleModal")).show();
        }
        getUserForArena();
        generateEnemy();
        clearInterval(interval);
    });
}

const attack = (target, damage) => {
    if (target.type === "enemy") {
        if (interval === undefined) {
            interval = setInterval(() => attack(player, enemy.damage), 1000);
        }   
    }

    if (target.hp <= 0) {
        endBattle(target.type);
        return;
    }

    if (target.hp > 0) {
        target.hp -= damage;
        updateHealthBars(player.healthBar, enemy.healthBar);
    }

    if (target.type === "player") {
        document.querySelector("#player-health").innerText = player.hp;
    }
}
