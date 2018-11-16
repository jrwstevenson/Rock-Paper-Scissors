// Buttons
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
// Choice Elements
const p1Choice = document.querySelector("#player1Choice");
const p2Choice = document.querySelector("#player2Choice");
// Win Elements
const gamesWon = document.querySelector("#gamesWon");
const gamesLost = document.querySelector("#gamesLost");
// Results
const winnerDisplay = document.querySelector("#winner");
const history = document.querySelector("#history");

let p1WinCount = 0;
let p2WinCount = 0;

newGame = val => {
  let p1 = decoder(val);
  p1Choice.innerHTML = p1.name;

  let p2 = decoder(randNum());
  p2Choice.innerHTML = p2.name;

  let winner = checkWinner(p1.value, p2.value);
  winnerDisplay.innerHTML = winner;
  addToHistory(p1.name, p2.name, winner);

  gamesWon.innerHTML = p1WinCount;
  gamesLost.innerHTML = p2WinCount;
};

addToHistory = (p1, p2, winner) => {
  const li = document.createElement("li");
  const content = document.createTextNode(`${winner}: ${p1} - ${p2}`);
  li.appendChild(content);
  history.insertAdjacentElement("afterbegin", li);
};

randNum = () => {
  let num = Math.floor(Math.random() * 3);
  return num;
};

decoder = num => {
  if (num === 0) {
    return { value: num, name: "Rock" };
  } else if (num === 1) {
    return { value: num, name: "Paper" };
  } else if (num === 2) {
    return { value: num, name: "Scissors" };
  } else console.log("WTF man?!");
};

checkWinner = (p1, p2) => {
  const remainder = (p2 - p1 + 3) % 3;

  switch (remainder) {
    case 0:
      return "Draw";
      break;
    case 1:
      p2WinCount++;
      return "Loser!";
      break;
    case 2:
      p1WinCount++;
      return "You Win";
      break;

    default:
      break;
  }
};
