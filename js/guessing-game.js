/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

class Game {
  constructor() {
    (this.playersGuess = null),
      (this.pastGuesses = []),
      (this.winningNumber = generateWinningNumber());
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (typeof num !== "number" || isNaN(num) || num < 1 || num > 100) {
      throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    const guess = this.playersGuess;
    if (this.pastGuesses.includes(guess)) {
      return "You have already guessed that number.";
    }
    this.pastGuesses.push(guess);

    if (guess === this.winningNumber) {
      return "You Win!";
    }
    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }

    const diff = Math.abs(guess - this.winningNumber);
    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }

  provideHint() {
    const hints = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hints);
  }
}

function newGame() {
  return new Game();
}
