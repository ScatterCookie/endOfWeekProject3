//what the initial value of cookies and current cookies are and an array with the current purchases in.
let initialState = {
  cookies: 0,
  purchases: [],
  currentCookies: 0,
};

let currentCookies = initialState.currentCookies;

const cookieCounter = document.getElementById("cookiePerSecond");
const cps = document.getElementById("cps");
const shop = document.getElementById("shop");
const centerCookie = document.getElementById("center-cookie");

const game = function () {
  loadGame();
  getUpgrades();

  setInterval(() => {
    updateUI(initialState);
  }, 100);
  setInterval(() => {
    initialState.cookies += getCPS();
    saveGame();
    cps.innerText = getCPS();
  }, 1000);
};

centerCookie.addEventListener("click", function () {
  centerCookie.classList.toggle("inflate");
  initialState.cookies += 1;
  setTimeout(() => {
    centerCookie.classList.toggle("inflate");
  }, 150);
});

function getCPS() {}

async function getUpgrades() {}

function openShop(params) {}

function buyItems() {}

function updateUI(initialState) {}

function saveGame() {}

function loadGame() {}

game();
