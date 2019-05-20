
let blueBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let greenBtnAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// VARIABLES - DOM QUERIES

const btnBlue = document.querySelectorAll("#btnBlue");
const btnGreen = document.querySelectorAll("#btnGreen");
const btnRed = document.querySelectorAll("#btnRed");
const btnYellow = document.querySelectorAll("#btnYellow");


$(document).ready(function() {
//button effects 

//button blue effect
  $(btnBlue).click(function() {
	var originalColor = $(this).css('background-color');
  blueBtnAudio.play();
  $(this).css('background-color', '#00FFFF');	
  setTimeout(function() {
  	$(btnBlue).css('background-color', originalColor);
  }, 100);  
});
  

//button green effect
  $(btnGreen).click(function() {
    var originalColor = $(this).css('background-color');
    greenBtnAudio.play();
    $(this).css('background-color', '#7FFF00');
    setTimeout(function(){
      $(btnGreen).css('background-color', originalColor);
    }, 100)
  });

  $(btnRed).click(function() {
    var originalColor = $(this).css('background-color', originalColor);
    $(this).css('background-color', '#F08080');
    redBtnAudio.play();
  });

  $(btnYellow).click(function() {
    $(this).css('background-color', '#F0E68C');
    yellowBtnAudio.play();
  });

});
// you will have to create more four functions like the above..
