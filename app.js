//what the initial value of cookies and current cookies are and an array with the current purchases in.
let initialState = {
  cookies: 0,
  purchases: [],
  currentCookies: 10000,
};

const cookieCounter = document.getElementById("cookieAmount");
const cps = document.getElementById("cpsId");
const shop = document.getElementById("shop");
const centerCookie = document.getElementById("center-cookie");

const game = function () {
  loadGame();
  getUpgrades();

  setInterval(() => {
    initialState.currentCookies += getCPS();
    updateUI(initialState);
    saveGame();
  }, 1000);
};

centerCookie.addEventListener("click", function () {
  centerCookie.classList.toggle("inflate");
  initialState.currentCookies++;
  cookieCounter.innerText = initialState.currentCookies;
  setTimeout(() => {
    centerCookie.classList.toggle("inflate");
  }, 150);
});

function getCPS() {
  if (initialState.purchases.length != 0) {
    let total = 0;
    for (let i = 0; i < initialState.purchases.length; i++) {
      total += initialState.purchases[i].increase;
    }
    return total;
  }
  return 0;
}

async function getUpgrades() {
  const result = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const upgrades = await result.json();
  console.log(upgrades);
  openShop(upgrades);
}

function openShop(params) {
  for (let i = 0; i < params.length; i++) {
    let container = document.createElement("div");

    let name = document.createElement("p");
    name.innerText = params[i].name;

    let cost = document.createElement("p");
    cost.innerText = params[i].cost;

    let cps = document.createElement("p");
    cps.innerText = params[i].increase;

    let buyButton = document.createElement("button");
    buyButton.innerText = "buy";

    buyButton.addEventListener("click", () => {
      buyItems(params[i]);
    });

    container.appendChild(name);
    container.appendChild(cost);
    container.appendChild(cps);
    container.appendChild(buyButton);
    container.setAttribute("class", "shop-item-container");
    shop.appendChild(container);
  }
}

function buyItems(item) {
  if (initialState.currentCookies < item.cost) {
    alert("You need more cookies");
  } else {
    initialState.currentCookies -= item.cost;
    initialState.purchases.push(item);
  }
}

function updateUI(initialState) {
  cps.innerText = getCPS();
  cookieCounter.innerText = initialState.currentCookies;
  // initialState.cps.innerText = initialState.currentCookies;
}

game();

function saveGame() {
  localStorage.setItem("gameState", JSON.stringify(initialState));
}

function loadGame() {
  console.log(localStorage.getItem("gameState"));
  if (localStorage.getItem("gameState") === null) return;
  initialState = JSON.parse(localStorage.getItem("gameState"));
}
