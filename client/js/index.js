// Buttons
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
// Player Names
const p1Name = document.querySelector("#playerName");
const p2Name = document.querySelector("#oppoName");
// Choice Elements
const p1Choice = document.querySelector("#player1Choice");
const p2Choice = document.querySelector("#player2Choice");
// Win Elements
const gamesWon = document.querySelector("#gamesWon");
const gamesLost = document.querySelector("#gamesLost");
// Results
const BattleList = document.querySelector("#BattleList");
const feedback_div = document.querySelector("#feedback");
// InitialIse counts
let gamesPlayed = 0;
let winCount = 0;
let lossCount = 0;

const socket = io();
// socket.on("feedbacks", updateElement);

const moves = ["rock", "paper", "scissors"];
const moveButtons = [];

const playing = false;

const selectMode = mode => {
  socket.emit("mode", mode);
  // removeBlur();
};

const getButtons = () => {
  moves.forEach(move => {
    const button = document.getElementById(move);

    moveButtons.push(button);

    button.addEventListener("click", () => {
      socket.emit("move", move);
    });
  });
};

getButtons();

const removeBlur = () => {
  moveButtons.forEach(button => {
    button.classList.remove("disableBtn");
    button.childNodes[1].classList.add("pulse");
  });
};
socket.on("removeBlur", removeBlur);

const updateElement = (elementId, data, method = "innerHTML") => {
  document.getElementById(`${elementId}`)[method] = data;
};
socket.on("updateElement", updateElement);

const feedback = text => {
  feedback_div.innerHTML = text;
};
socket.on("feedback", feedback);

const updateIcon = payload => {
  p1Choice.innerHTML = `<img src="/img/${payload}.png" />`;
};
socket.on("icon", updateIcon);

const updateOppoIcon = payload => {
  p2Choice.innerHTML = `<img src="/img/${payload}.png" />`;
};
socket.on("iconOppo", updateOppoIcon);

const addToBattleList = result => {
  const li = document.createElement("li");
  const resultPhrase = "";
  const markup = `
  <div>
  <span class="battleLog-result">${result}</span>
  <div class="lightsaber lightsaber--${result}">
  <label for="saber${gamesPlayed}"></label>
  <div class="switch"></div>
  <input type="checkbox" id="saber${gamesPlayed}" />
  <div class="plasma"></div>
  </div>
  </div>
  `;

  li.innerHTML = markup;
  li.className = "battleItem";
  BattleList.insertAdjacentElement("afterbegin", li);

  setTimeout(function() {
    document.getElementById(`saber${gamesPlayed}`).checked = true;
  }, 200);
};
socket.on("addToVBattleLog", addToBattleList);

const updateP1Name = text => {
  p1Name.innerHTML = text;
};
socket.on("player", updateP1Name);

const oppoName = text => {
  p2Name.innerHTML = text;
};
socket.on("oppoName", oppoName);

const result = result => {
  if (result === "Victory") {
    winCount++;
  } else if (result === "Defeat") {
    lossCount++;
  }
  feedback(result);
  gamesPlayed++;
  addToBattleList(result);
  gamesWon.innerText = winCount;
  gamesLost.innerText = lossCount;
};
socket.on("result", result);
