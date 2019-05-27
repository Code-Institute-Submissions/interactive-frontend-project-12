let blueBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let greenBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
//======================//
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;
//======================//
// VARIABLES - DOM QUERIES

const btnBlue = document.querySelector("#btnBlue");
const btnGreen = document.querySelector("#btnGreen");
const btnRed = document.querySelector("#btnRed");
const btnYellow = document.querySelector("#btnYellow");

const turnCounter = document.querySelector("#turn");
const startButton = document.querySelector("#startButton");
const gameButton = document.querySelector(".gameButton"); //button start (not used)
const strictButton = document.querySelector("#strict");
const turnOnButton = document.querySelector("#on");
//const effects = buttonEffects();//zombie code//objects from buttonEffect() function

strictButton.addEventListener('click', function(event) {
  if (strictButton.checked == true) {
    strict = true;
  }
  else {
    strict = false;
  }
});

turnOnButton.addEventListener('click', function(event) {
  if (turnOnButton.checked == true) {
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
  if (on || win) {
    play(); //change the name of this function..
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {

  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(function() {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    blueBtnAudio.play();
  }
  noise = true;
  btnGreen.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    redBtnAudio.play();
  }
  noise = true;
  btnRed.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    yellowBtnAudio.play();
  }
  noise = true;
  btnYellow.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    blueBtnAudio.play();
  }
  noise = true;
  btnBlue.style.backgroundColor = "lightskyblue";
}

function clearColor(){
  btnGreen.style.backgroundColor = "darkgreen";
  btnRed.style.backgroundColor = "darkred";
  btnYellow.style.backgroundColor = "goldenrod";
  btnBlue.style.backgroundColor = "darkblue";
}

btnGreen.addEventListener('click', function(event){
  if(on){
    playerOrder.push(1);
    //check();
    one();
    if(!win){
      setTimeout(function(){
        clearColor();
      }, 300);
    }
  }
})

btnRed.addEventListener('click', function(event){
  if(on){
    playerOrder.push(2);
    //check();
    two();
    if(!win){
      setTimeout(function(){
        clearColor();
      }, 300);
    }
  }
})

btnYellow.addEventListener('click', function(event){
  if(on){
    playerOrder.push(3);
    //check();
    three();
    if(!win){
      setTimeout(function(){
        clearColor();
      }, 300);
    }
  }
})

btnBlue.addEventListener('click', function(event){
  if(on){
    playerOrder.push(4);
    //check();
    four();
    if(!win){
      setTimeout(function(){
        clearColor();
      }, 300);
    }
  }
})

// YOU HAVE TO SEE WHAT IS GOING ON WHITH THE clearColor() FUNCTION 
// compare and have a look
// BECAUSE IT ARE ON ALL CODE SCOPE....

//fix score place