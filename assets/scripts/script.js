
//variables
let blueBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');//audio for button blue
let redBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');//audio for button red 
let yellowBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');//audio for button yellow
let greenBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');//audio for button green

let organization = []; //Flash sequence.
let playerOrder = [];//Select sequence.
let flash;//Var used of flsh diplayed in the game.
let turn;//User turn.
let good;//Boolean to check player success.
let compTurn;//boolean to defines cpu/player attempt.
let intervalId;//time defined between each execution.
let strict = false;//Boolean to allow strict mode.
let noise = true;//Active/deactive sound.
let on = false;//Game activation.
let win;//Deifines the player won.

// VARIABLES - DOM QUERIES

const btnBlue = document.querySelector("#btnBlue");//Button blue
const btnGreen = document.querySelector("#btnGreen");//Button green
const btnRed = document.querySelector("#btnRed");//Button red 
const btnYellow = document.querySelector("#btnYellow");//Button yellow

const turnCounter = document.querySelector("#turn");//Score display.
const startButton = document.querySelector("#startButton");//Initiates the game after power is on.
const strictButton = document.querySelector("#strict");//Triggers the strict mode.
const powerButton = document.querySelector("#on");//Initiates the game.



// EVENT LISTENERS
//Setthings buttons
strictButton.addEventListener('click', function(event) {
  if (strictButton.checked == true) {
    strict = true;
  }
  else {
    strict = false;
  }
});

powerButton.addEventListener('click', function(event) {
  if (powerButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  }
  else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', function(event) {
  console.log("salman", "start clicked");
  if (on || win) {
    play(); 
  }
});

btnGreen.onclick = () => {
  console.log("salman", "green clicked");
  if (on) {
    playerOrder.push(1);
    check();
    first();
    clearTimeout();
    if (!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
  }
};

btnRed.onclick = () => {
  console.log("salman", "red clicked");
  if (on) {
    playerOrder.push(2);
    check();
    second();
    if (!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
  }
};

btnYellow.onclick = () => {
  console.log("salman", "yellow clicked");
  if (on) {
    playerOrder.push(3);
    check();
    third();
    if (!win) {
      setTimeout(function() { 
        clearColor();
      }, 300);
    }
  }
};

btnBlue.onclick = () => {
  console.log("salman", "Blue clicked");
  if (on) {
    playerOrder.push(4);
    check();
    fourth();
    if (!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
  }
};


//FUNCTIONS AND LOOP SEQUENCES

function play() {
  clearInterval();
  clearTimeout();
  console.log("salman", "Play function enter");
  win = false;
  organization = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  // organization = [1,1,2,2,3,3,4,4,1,1]
  for (var i = 0; i < 10; i++) {
    organization.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  console.log("salman", "gameTurn enter");
  on = false;
  if (flash == turn) {
    console.log("salman", "clear gameTurn");
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(function() {
      if (organization[flash] == 1) first();
      if (organization[flash] == 2) second();
      if (organization[flash] == 3) third();
      if (organization[flash] == 4) fourth();
      flash++;
    }, 200);
  }
}

//Green button trigger
function first() {
  if (noise) {
    greenBtnAudio.play();
  }
  noise = true;
  btnGreen.style.backgroundColor = "lightgreen";
}
//Red button trigger
function second() {
  if (noise) {
    redBtnAudio.play();
  }
  noise = true;
  btnRed.style.backgroundColor = "tomato";
}

//Yellow button trigger
function third() {
  if (noise) {
    yellowBtnAudio.play();
  }
  noise = true;
  btnYellow.style.backgroundColor = "yellow";
}
//Blue button trigger
function fourth() {
  if (noise) {
    blueBtnAudio.play();
  }
  noise = true;
  btnBlue.style.backgroundColor = "lightskyblue";
}

//Color Normal state
function clearColor() {
  console.log("salman", "clearColor Enter");
  btnGreen.style.backgroundColor = "darkgreen";
  btnRed.style.backgroundColor = "darkred";
  btnYellow.style.backgroundColor = "goldenrod";
  btnBlue.style.backgroundColor = "darkblue";
}

//Color Lighter state
function btnLightColor() {
  console.log("salman", "btnLightColor Enter");
  btnGreen.style.backgroundColor = "lightgreen";
  btnRed.style.backgroundColor = "tomato";
  btnYellow.style.backgroundColor = "yellow";
  btnBlue.style.backgroundColor = "lightskyblue";
}

//player choice verification
function check() {
  console.log("salman", "check Enter");
  if (playerOrder[playerOrder.length - 1] !== organization[playerOrder.length - 1] || organization[playerOrder.length - 1] === undefined){
    good = false;
    console.log("salman", "good set to false");
  }    
    
  if (playerOrder.length == 10 && good) {
    winGame();
  }

  if (!good) {
    console.log("salman", "enter not good if");
    btnLightColor();
    turnCounter.innerHTML = "NO!";
      clearColor();
      
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      }
      else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        clearInterval(intervalId);
        intervalId = setInterval(gameTurn, 1000);
      }
    }, 1000);
      
    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}
//Display win on score and finishs the game
function winGame() {
  btnLightColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}


