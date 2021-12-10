class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  };

  pickWord() {
    let randomIndex = Math.floor(Math.random()*this.words.length);
    let randomWord = this.words[randomIndex];
    return randomWord;
  };

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  };

  checkClickedLetters(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      return true;
    } else {
      return false;
    }
  };

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  };

  addWrongLetter(letter) {
    this.errorsLeft -= 1;
    if (this.checkClickedLetters(letter)) {
      this.letters.push(letter);
    }
  };

  letterControl(letter) {
    return this.secretWord.includes(letter);
  }

  checkGameOver() {
    if (this.errorsLeft === 0) {
      return true;
    } else {
      return false;
    }
  }

  checkWinner() {
    let correctWord = "";
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.guessedLetters.indexOf(this.secretWord[i]) !== -1) {
        correctWord += this.secretWord[i];
      }
    }
    if (correctWord === this.secretWord) {
      return true;
    } else {
      return false;
    }
  }
};

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'github', 'canvas', 'snuggles', 'trouble']);
    hangman.secretWord;
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
};

document.addEventListener('keydown', event => {
  if (!hangman) return;
  const letterPressed = event.key.toLocaleLowerCase();
  const keyCode = event.keyCode;
  
  if (!hangman.checkIfLetter(keyCode)) {
    alert("Please click a letter from a to z");
    return;
  } else if (!hangman.checkClickedLetters(letterPressed)) {
    alert("You've already used that letter. Please try a different one.");
    return;
  };

  if (hangman.letterControl(letterPressed)) {
    hangman.addCorrectLetter(letterPressed);
    hangmanCanvas.writeCorrectLetter(hangmanCanvas.secretWord.indexOf(letterPressed));
  }
 
  if (hangman.checkWinner()) {
    alert("Congratulations! You got it!");
    hangmanCanvas.winner();
    hangman = undefined;
    return;
  } else {
    hangman.addWrongLetter(letterPressed);
    hangmanCanvas.writeWrongLetter(letterPressed, hangman.errorsLeft);
    hangmanCanvas.drawHangman(hangman.errorsLeft);
    if (hangman.checkGameOver()) {
      alert("Game over!");
      hangmanCanvas.gameOver();
      hangman = undefined;
      return;
    }
  } 
});