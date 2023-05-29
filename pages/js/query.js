function registrationQuery(login, email, password) {
  fetch("api/v1/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: login,
      email: email,
      password: password
    })
  }).then((response) => {
    return response.json().then((resp) => { 
      if (resp.login) {
        localStorage.setItem("user", JSON.stringify(resp));
        alert("Вы успешно зарегистрировались");
        location.href = "/hero";
      } else {
        console.log(resp.response);
        alert(resp.response);
        if (resp.response === "You already in account") {
          location.href = "/hero";
        }
      }
    });
  });
}

function loginQuery(login, password) {
  fetch("api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }).then((response) => {
    return response.json().then((resp) => { 
      if (resp.id) {
        localStorage.setItem("user", JSON.stringify(resp));
        location.href = "/hero";
      } else {
        console.log(resp.response);
        alert(resp.response);
        if (resp.response === "You already in account") {
          location.href = "/hero";
        }
      }
    });
  });
}

function isAuthorizedQuery() {
  fetch(`api/v1/isAuthorized`, {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      if (!resp.response) {
        if (location.pathname !== "/login" && location.pathname !== "/registration") {
          location.href = "/login";
        }
      } else if (location.pathname === "/login" || location.pathname === "/registration") {
        location.href = "/hero";
      }
    });
  });
}

function fractionSettedQuery() {
  fetch(`api/v1/fractionSetted`, {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => { 
      if (location.pathname !== "/setFraction") {
        if (!resp.response) {
          location.href = "/setFraction";
        }
      } else if (resp.response) {
        location.href = "/hero";
      }
    });
  });
}

function setFractionQuery(fraction) {
  fetch("api/v1/setFraction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fraction: fraction
    })
  }).then((response) => {
    return response.json().then((resp) => {
      if (resp.response === "Fraction success setted") {
        location.href = "/hero";
      } else {
        alert(resp.response);
        if (resp.response === "Fraction already setted") {
          location.href = "/hero";
        }
      }
    });
  });
}

function logoutQuery() {
  fetch("api/v1/logout", {
    method: "POST"
  }).then(() => {
    localStorage.removeItem("user");
    location.href = "/";
  });
}

function loadProfileQuery() {
  fetch("api/v1/loadProfile", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#login").innerText = resp.login;
      document.querySelector("#email").innerText = resp.email;
      document.querySelector("#money").innerText = resp.money;
      document.querySelector("#donateMoney").innerText = resp.donateMoney;
    });
  });
}

function loadHeroQuery() {
  fetch("api/v1/loadHero", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#login").innerText = resp.login;
      document.querySelector("#level").innerText = resp.level;
      document.querySelector("#health").innerText = resp.health;
      document.querySelector("#defense").innerText = resp.defense;
      document.querySelector("#power").innerText = resp.power;

      document.querySelector("#player-health-bar").style.width = calcPercents(resp.health, 5000);
      document.querySelector("#player-defense-bar").style.width = calcPercents(resp.defense, 1000);
      document.querySelector("#player-power-bar").style.width = calcPercents(resp.power, 1000);

      document.querySelector("#player-level-bar").style.width = calcPercents(resp.exp, resp.level * 5);
    });
  });
}

function addFeedbackQuery() {
  fetch("api/v1/addFeedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: document.querySelector("#loginInput").value,
      email: document.querySelector("#emailInput").value,
      theme: document.querySelector("#themeInput").value,
      message: document.querySelector("#messageInput").value
    })
  }).then(() => {
    alert("Обращение успешно отправлено!");
    location.reload();
  });
}

function buyItemQuery(type, id) {
  fetch("api/v1/buyItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: type,
      itemId: id
    })
  }).then((response) => {
    return response.json().then((resp) => {
      alert(resp.response);
    });
  });
}

function getInventoryQuery() {
  fetch("api/v1/getInventory", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      Object.keys(resp).map((key) => {
        switch (key) {
          case "staff1":
            if (resp[key] != "null") {
              let staff1 = document.querySelector("#staff1");
              staff1.style.filter = null;
              staff1.src = `/pages/img/staff_${resp[key]}.png`;
              staff1.width = "88";
              staff1.height = "94";
            }
            break;
          case "staff2":
            if (resp[key] != "null") {
              let staff2 = document.querySelector("#staff2");
              staff2.style.filter = null;
              staff2.src = `/pages/img/staff_${resp[key]}.png`;
              staff2.width = "88";
              staff2.height = "94";
            }
            break;
          case "crystal1":
            if (resp[key] != "null") {
              let crystal1 = document.querySelector("#crystal1");
              crystal1.style.filter = null;
              crystal1.src = `/pages/img/crystal_${resp[key]}.png`;
              crystal1.width = "88";
              crystal1.height = "94";
            }
            break;
          case "crystal2":
            if (resp[key] != "null") {
              let crystal2 = document.querySelector("#crystal2");
              crystal2.style.filter = null;
              crystal2.src = `/pages/img/crystal_${resp[key]}.png`;
              crystal2.width = "88";
              crystal2.height = "94";
            }
            break;
        }
      });
    });
  });
}

function getLevelTopQuery() {
  fetch("api/v1/getLevelTop", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      for (let i = 0; i < 3; i++) {
        document.querySelector(`#level-top${i + 1}-login`).innerText = resp[i].login;
      }
    });
  });
}

function getGoldTopQuery() {
  fetch("api/v1/getGoldTop", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      for (let i = 0; i < 3; i++) {
        document.querySelector(`#gold-top${i + 1}-login`).innerText = resp[i].login;
      }
    });
  });
}

function getWinCountTopQuery() {
  fetch("api/v1/getWinCountTop", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      for (let i = 0; i < 3; i++) {
        document.querySelector(`#win-count-top${i + 1}-login`).innerText = resp[i].login;
      }
    });
  });
}

function generateEnemy() {
  fetch("api/v1/generateEnemy", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      localStorage["enemy"] = resp;
      document.querySelector("#enemy-power").innerText = resp.power;
      document.querySelector("#enemy-health-bar").style.width = "100%";
      document.querySelector("#enemy-name").innerText = resp.name;

      enemy.hp = resp.health;
      enemy.stockHp = resp.health;
      enemy.defense = resp.defense;
      enemy.damage = resp.damage;
      enemy.expRewards = resp.expRewards;
      enemy.moneyRewards = resp.moneyRewards;
    });
  });
}

function getUserForArena() {
  fetch("api/v1/loadHero", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#player-health").innerText = resp.health;
      document.querySelector("#player-health-bar").style.width = calcPercents(resp.health, 5000);

      document.querySelector("#player-defense").innerText = resp.defense;
      document.querySelector("#player-defense-bar").style.width = calcPercents(resp.defense, 1000);

      document.querySelector("#player-power").innerText = resp.power;
      document.querySelector("#player-power-bar").style.width = calcPercents(resp.power, 1000);
    
      player.hp = resp.health;
      player.stockHp = resp.health;
      player.defense = resp.defense;
      player.damage = resp.damage;

      interval = undefined;
    });
  });
}