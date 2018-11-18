// Buttons
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
// Player Names
const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");
// Choice Elements
const p1Choice = document.querySelector("#player1Choice");
const p2Choice = document.querySelector("#player2Choice");
// Win Elements
const gamesWon = document.querySelector("#gamesWon");
const gamesLost = document.querySelector("#gamesLost");
// Results
const BattleList = document.querySelector("#BattleList");
// InitialIse counts
let gamesPlayed = 0;

// Initialize
const p1 = {
  name: getFunName(),
  move: {},
  wins: 0
};
p1Name.innerHTML = p1.name;

const p2 = {
  name: getFunName(),
  move: {},
  wins: 0
};
p2Name.innerHTML = p2.name;

// Start a new Game
newGame = move => {
  // Player 1
  p1.move = decoder(move);
  p1Choice.innerHTML = `<img src="/img/${p1.move.image}.png" />`;

  // Player 2
  p2.move = decoder(randNum());
  p2Choice.innerHTML = `<img src="/img/${p2.move.image}.png" />`;

  // Result
  let result = checkWinner(p1.move.value, p2.move.value);
  gamesPlayed++;
  addToBattleList(p1.move.name, p2.move.name, result);

  // Update Win Counter
  gamesWon.innerHTML = p1.wins;
  gamesLost.innerHTML = p2.wins;
};

// Decode Move
decoder = num => {
  if (num === 0) {
    return { value: num, name: "Rock", image: "rock" };
  } else if (num === 1) {
    return { value: num, name: "Paper", image: "paper" };
  } else if (num === 2) {
    return { value: num, name: "Scissors", image: "scissors" };
  } else console.log("No Cheating!");
};

// Generate a random number for P2
randNum = () => {
  let num = Math.floor(Math.random() * 3);
  return num;
};

checkWinner = (p1Move, p2Move) => {
  const remainder = (p2Move - p1Move + 3) % 3;

  switch (remainder) {
    case 0:
      return "Draw";
      break;
    case 1:
      p2.wins++;
      return "Defeat";
      break;
    case 2:
      p1.wins++;
      return "Victory";
      break;

    default:
      break;
  }
};

addToBattleList = (p1, p2, result) => {
  const li = document.createElement("li");
  const resultPhrase = "";
  const markup = `
  <div>
  <span class="battleLog-result">${result}</span> ${p1} - ${p2}
    <div class="lightsaber lightsaber--${result}">
      <label for="saber${gamesPlayed}"></label>
      <div class="switch"></div>
      <input type="checkbox" id="saber${gamesPlayed}" />
      <div class="plasma"></div>
    </div>
  </div>
  `;

  setTimeout(function() {
    document.getElementById(`saber${gamesPlayed}`).checked = true;
  }, 200);

  li.innerHTML = markup;
  li.className = "battleItem";
  BattleList.insertAdjacentElement("afterbegin", li);
};
