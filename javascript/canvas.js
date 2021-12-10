class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.canvas = document.getElementById("hangman");
    this.secretWord = secretWord;
    this.xAxis = 300;
    this.yAxis = 400;
    this.lineSpacing = 30;
    this.lineWidth = 30;
  };

  createBoard() {
    this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
    this.drawLines();
  };

  drawLines() {
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(this.xAxis + this.lineSpacing * i, this.yAxis);
      this.context.lineTo(this.xAxis + this.lineSpacing * i + this.lineWidth, this.yAxis);
      this.context.strokeStyle = "black";
      this.context.closePath();
      this.context.stroke();
    };
  };

  writeCorrectLetter(index) {
    this.context.fillStyle = "black";
    this.context.font = "30px Arial";
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[index] === this.secretWord[i]) {
        this.context.fillText(this.secretWord[i].toUpperCase(), this.xAxis + this.lineSpacing * i, this.yAxis - 10)};
    };
  };

  writeWrongLetter(letter, errorsLeft) {
    this.context.fillStyle = "brown";
    this.context.font = "30px Arial";
    if (!this.secretWord.includes(letter) && errorsLeft >= 0) {
      this.context.fillText(letter.toUpperCase(), this.xAxis + 100 + this.lineSpacing * errorsLeft, this.yAxis - 100);
    };
  };

  drawHangman(errorsLeft) {
    switch (errorsLeft) {
      case 9:
        this.context.beginPath();
        this.context.moveTo(80, 270);
        this.context.lineTo(40, 225);
        this.context.lineTo(0, 270);
        this.context.lineTo(80, 270);
        this.context.lineTo(40, 225);
        this.context.moveTo(40, 225);
        this.context.lineTo(40, 5);
        this.context.lineTo(100, 5);
        this.context.lineTo(100, 25);
        this.context.stroke();
        break;
      case 8:
        this.context.lineWidth = 5;
        this.context.beginPath();
        this.context.arc(100, 50, 25, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.stroke();
        break;
      case 7:
        this.context.beginPath();
        this.context.moveTo(100, 75);
        this.context.lineTo(100, 140);
        this.context.stroke();
        break;
      case 6:
        this.context.beginPath();
        this.context.moveTo(100, 85);
        this.context.lineTo(60, 100);
        this.context.stroke();
        break;
      case 5:
        this.context.beginPath();
        this.context.moveTo(100, 85);
        this.context.lineTo(140, 100);
        this.context.stroke();
        break;
      case 4:
        this.context.beginPath();
        this.context.moveTo(100, 140);
        this.context.lineTo(80, 190);
        this.context.stroke();
        break;
      case 3:
        this.context.beginPath();
         this.context.moveTo(82, 190);
         this.context.lineTo(70, 185);
         this.context.stroke();
        break;
      case 2:
        this.context.beginPath();
        this.context.moveTo(100, 140);
        this.context.lineTo(125, 190);
        this.context.stroke();
        break;
      case 1:
        this.context.beginPath();
         this.context.moveTo(122, 190);
         this.context.lineTo(135, 185);
         this.context.stroke();
        break;
    };
  };

  gameOver() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const gameOver = new Image();
    gameOver.src = "../images/gameover.png";
    gameOver.addEventListener("load", () => {
      this.context.drawImage(gameOver, 150, 100);
    });
  };

  winner() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const awesome = new Image();
    awesome.src = "../images/awesome.png";
    awesome.addEventListener("load", () => {
      this.context.drawImage(awesome, 0, 0);
    });
  };
};
