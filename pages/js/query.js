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
        location.href = "/hero";
      } else {
        if (resp.response === "You already in account") {
          location.href = "/hero";
        }
        document.querySelector("#registration-modal-label").innerText = resp.response;
        new bootstrap.Modal(document.querySelector("#registrationModal")).show();
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
        if (resp.response === "You already in account") {
          location.href = "/hero";
        }
        document.querySelector("#login-modal-label").innerText = resp.response;
        new bootstrap.Modal(document.querySelector("#loginModal")).show();
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

      switch (resp.fraction) {
        case "castle":
          document.querySelector("#heroImg").src = "/pages/img/card-castle.png";
          break;

        case "stronghold":
          document.querySelector("#heroImg").src = "/pages/img/card-stronghold.png";
          break;

        case "tower":
          document.querySelector("#heroImg").src = "/pages/img/card-tower.png";
          break;

        case "inferno":
          document.querySelector("#heroImg").src = "/pages/img/card-inferno.png";
          break;

        case "dungeon":
          document.querySelector("#heroImg").src = "/pages/img/card-dungeon.png";
          break;

        case "fortress":
          document.querySelector("#heroImg").src = "/pages/img/card-fortress.png";
          break;

        case "citadel":
          document.querySelector("#heroImg").src = "/pages/img/card-citadel.png";
          break;

        case "necropolis":
          document.querySelector("#heroImg").src = "/pages/img/card-necropolis.png";
          break;
      }
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
    document.querySelector("#loginInput").value = "";
    document.querySelector("#emailInput").value = "";
    document.querySelector("#themeInput").value = "";
    document.querySelector("#messageInput").value = "";
    new bootstrap.Modal(document.querySelector("#addFeedbackModal")).show();
  });
}

function buyItemQuery(type, id, price) {
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
      if (resp.response === "Item already buyed") {
        resp.response = "Предмет уже куплен";
      } else if (resp.response === "Not enough money") {
        resp.response = "Недостаточно денег";
      } else if (resp.response === "Item success buyed") {
        resp.response = "Предмет успешно куплен";
        if (price.type === "money") {
          let money = parseInt(document.querySelector("#money").innerText);
          document.querySelector("#money").innerText = money - price.count;
        } else {
          let donateMoney = parseInt(document.querySelector("#donateMoney").innerText);
          document.querySelector("#donateMoney").innerText = donateMoney - price.count;
        }
      }
      document.querySelector("#shop-modal-label").innerText = resp.response;
      new bootstrap.Modal(document.querySelector("#shopModal")).show();
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

      document.querySelector("#player-health").innerText = player.hp;
      document.querySelector("#rewardsMoney").innerText = enemy.moneyRewards;
      document.querySelector("#rewardsExp").innerText = enemy.expRewards;

      enemy.hp = resp.health;
      enemy.stockHp = resp.health;
      enemy.defense = resp.defense;
      enemy.damage = resp.power;
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
      player.damage = resp.power;

      interval = undefined;
    });
  });
}

function getUserBalance() {
  fetch("api/v1/loadProfile", {
    method: "POST"
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#money").innerText = resp.money;
      document.querySelector("#donateMoney").innerText = resp.donateMoney;
    });
  });
}

function isAdminQuery() {
  fetch("api/v1/admin/isAdmin", {
    method: "GET"
  }).then((response) => {
    return response.json().then((resp) => {
      if (!resp.response) {
        location.href = "/";
      }
    });
  });
}

function addItemQuery() {
  let image = document.querySelector("#itemImageInput").files[0];
  let formData = new FormData();

  formData.append("name", document.querySelector("#itemNameInput").value);
  formData.append("price", document.querySelector("#itemPriceInput").value);
  formData.append("money_type", document.querySelector("#itemMoneyTypeCommon").checked ? "common" : "donate");
  formData.append("image", image, image.name);

  fetch("api/v1/admin/addItem", {
    method: "POST",
    body: formData
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#info-modal-label").innerText = resp.response;
      new bootstrap.Modal(document.querySelector("#infoModal")).show();

      document.querySelector("#itemNameInput").value = "";
      document.querySelector("#itemPriceInput").value = "";
      document.querySelector("#itemMoneyTypeCommon").checked = true;
      document.querySelector("#itemImageInput").value = "";
    });
  });
}

function addNewsQuery() {
  let image = document.querySelector("#newsImageInput").files[0];
  let formData = new FormData();

  formData.append("title", document.querySelector("#newsTitleInput").value);
  formData.append("body", document.querySelector("#newsBodyInput").value);
  formData.append("image", image, image.name);

  fetch("api/v1/admin/addNews", {
    method: "POST",
    body: formData
  }).then((response) => {
    return response.json().then((resp) => {
      document.querySelector("#info-modal-label").innerText = resp.response;
      new bootstrap.Modal(document.querySelector("#infoModal")).show();

      document.querySelector("#newsTitleInput").value = "";
      document.querySelector("#newsBodyInput").value = "";
      document.querySelector("#newsImageInput").value = "";
    });
  });
}

function getItemsQuery() {
  fetch("api/v1/getItems", {
    method: "GET"
  }).then((response) => {
    return response.json().then((resp) => {
      if (!resp.response) {
        Object.keys(resp).map((item) => renderShopItem(resp[item].name, resp[item].price, resp[item].money_type, resp[item].image));
      }
    });
  });
}

function getNewsQuery() {
  fetch("api/v1/getNews", {
    method: "GET"
  }).then((response) => {
    return response.json().then((resp) => {
      if (!resp.response) {
        Object.keys(resp).map((item) => renderNews(resp[item].title, resp[item].body, resp[item].image));
      }
    });
  });
}