class RpsGame {
  // Start The Game
  constructor(p0, p1) {
    this.players = [p0, p1];
    this.moves = [null, null];

    this.updatePlayer(0, "oppoName", p1.name);
    this.updatePlayer(1, "oppoName", p0.name);

    this.updatePlayers("removeBlur");
    this.updatePlayers("feedback", "Make a Move");

    this.players.forEach((player, idx) => {
      player.on("move", move => {
        this.moveMade(idx, move);
      });
    });
    console.log("Playing");
  }

  // **** Emit Updates ****
  // Send Update to A player
  updatePlayer(playerIndex, func, data) {
    this.players[playerIndex].emit(func, data);
  }
  updateOppo(playerIndex, func, data) {
    let oppo = playerIndex ? 0 : 1;
    this.players[oppo].emit(func, data);
  }
  // Send Update To Both Players
  updatePlayers(func, data) {
    this.players.forEach(player => {
      player.emit(func, data);
    });
  }

  // Listen for Player to Mage a move
  moveMade(playerIndex, move) {
    this.moves[playerIndex] = move;
    this.updatePlayer(playerIndex, "icon", move);
    this.updateOppo(playerIndex, "iconOppo", "wait");
    this.updatePlayer(playerIndex, "feedback", `You selected ${move}`);
    this.checkGameOver();
  }

  // Both Players Have made a move
  checkGameOver() {
    const moves = this.moves;

    if (moves[0] && moves[1]) {
      this.getGameResult();
      this.updatePlayer(0, "iconOppo", this.moves[1]);
      this.updatePlayer(1, "iconOppo", this.moves[0]);
      this.moves = [null, null];
    }
  }

  // Calculate Win Lose or Draw
  getGameResult() {
    const p0 = this.decodeMove(this.moves[0]);
    const p1 = this.decodeMove(this.moves[1]);

    const distance = (p1 - p0 + 3) % 3;

    switch (distance) {
      case 0:
        this.updatePlayers("feedback", "Draw!");
        break;

      case 1:
        this.sendWinMessage(this.players[0], this.players[1]);
        break;

      case 2:
        this.sendWinMessage(this.players[1], this.players[0]);
        break;
    }
  }

  sendWinMessage(winner, loser) {
    // winner.emit("feedback", "Victory");
    winner.emit("result", "Victory");
    // loser.emit("feedback", "Defeat");
    loser.emit("result", "Defeat");
  }

  decodeMove(move) {
    switch (move) {
      case "rock":
        return 0;
      case "scissors":
        return 1;
      case "paper":
        return 2;
      default:
        throw new Error(`Could not decode move ${move}`);
    }
  }
}

module.exports = RpsGame;
