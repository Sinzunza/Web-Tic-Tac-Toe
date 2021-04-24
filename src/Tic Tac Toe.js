var xChoices;
var oChoices;
var currentPlayer;
var hasWon;
var isCPU = false;
var xScore = 0;
var oScore = 0;

var spanDisplayPlayer;
var btnTwoPlayers = document.getElementById("btnTwoPlayers");
var btnCPU = document.getElementById("btnCPU");
var spanX_Score = document.getElementById("spanX_Score");
var spanO_Score = document.getElementById("spanO_Score");
var h2Turn = document.getElementById("h2Turn");

var wins = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,6,9], [3,5,7],[4,5,6],[7,8,9]]; // all possible wins

var boxesID = [document.getElementById("btnBoxOne"), document.getElementById("btnBoxTwo"), document.getElementById("btnBoxThree"), 
             document.getElementById("btnBoxFour"), document.getElementById("btnBoxFive"), document.getElementById("btnBoxSix"),
             document.getElementById("btnBoxSeven"), document.getElementById("btnBoxEight"), document.getElementById("btnBoxNine")];

function newGame() { // resets board
  xChoices = [];
  oChoices = [];
  h2Turn.innerHTML = "Turn: <span id=\"spanDisplayPlayer\">X</span>";
  spanDisplayPlayer = document.getElementById("spanDisplayPlayer");
  currentPlayer = "X";
  hasWon = false;
  for(var i = 0; i < boxesID.length; i++) { // clear boxes
    boxesID[i].innerHTML = "";
    boxesID[i].style.backgroundColor = "#2b2b2b";
  }
}

newGame();

function resetGame(){ // resets board and scores
  toggleBoxClicks(true);
  newGame();
  xScore = 0;
  oScore = 0;
  spanX_Score.innerHTML = xScore;
  spanO_Score.innerHTML = oScore;
}

function changeMode(type){ // change mode and reset board and scores
  if (type == "TwoPlayer" && isCPU){
    btnTwoPlayers.style.border = "2px solid black";
    btnTwoPlayers.style.borderBottom = "4px solid white";
    btnCPU.style.border = "2px solid black";
    setTimeout(resetGame, 500)
    isCPU = false;
  }
  else if (type == "CPU" && !isCPU) {
    btnTwoPlayers.style.border = "2px solid black";
    btnCPU.style.border = "2px solid black";
    btnCPU.style.borderBottom = "4px solid white";
    setTimeout(resetGame, 500)
    isCPU = true;
  }

}

function getPlayer() { // returns currentPlayer and sets currentPlayer var to next player
    if (currentPlayer === "X") {
        currentPlayer = "O";
        return "X";
    }
    else {
        currentPlayer = "X";
        return "O";
    }
}

function checkWinner(playerChoices, player) { // checks to see if winner exists
  var count = 0;
  for (var i = 0; i < wins.length; i++) {
    for (var j = 0; j < wins[i].length; j++) {
      for (var k = 0; k < playerChoices.length; k++) {
        if(playerChoices[k] == wins[i][j]) {
          count++;
        }
      }
    }
    if(count == 3){
      h2Turn.innerHTML = "WINNER = " + player;
      return true;
    }
    count = 0;
  }
  return false;
}

function toggleBoxClicks(enable){ // disables onClick for board buttons. Used when playing CPU
  if(enable){
    for(var i = 0; i < boxesID.length; i++) {
      boxesID[i].style.pointerEvents = "auto";
    }
  }
  else {
    for(var i = 0; i < boxesID.length; i++) {
      boxesID[i].style.pointerEvents = "none";
    }
  }
}

function cpuChoice() {
  var choice = Math.floor(Math.random() * 10);
  currentSelection(choice);
}

function currentSelection (boxChosen) { // sets board to currentSelection and changes Turn
  if(!hasWon){
    try {
      if (boxesID[boxChosen-1].innerHTML != "X" && boxesID[boxChosen-1].innerHTML != "O") {
        var currentPlayerTemp = getPlayer();
        boxesID[boxChosen-1].innerHTML = currentPlayerTemp;
        boxesID[boxChosen-1].style.backgroundColor = "#fa7272c5";
  
        if(currentPlayerTemp == "X"){
          xChoices.push(boxChosen);
          hasWon = checkWinner(xChoices, currentPlayerTemp);
          spanDisplayPlayer.innerHTML = "O";
          if (hasWon) {
            xScore++;
            spanX_Score.innerHTML = xScore;
          }
        }
        else {
          oChoices.push(boxChosen);
          hasWon = checkWinner(oChoices, currentPlayerTemp);
          spanDisplayPlayer.innerHTML = "X";
          if (hasWon) {
            oScore++;
            spanO_Score.innerHTML = oScore;
          }
        }
  
        if(xChoices.length + oChoices.length == 9 && !hasWon){ // check if it's a tie
          h2Turn.innerHTML = "TIE";
          currentPlayer = "X";
          toggleBoxClicks(true);
        }
        else if (isCPU){ // if not a tie check if it's cpu's turn
          if (currentPlayerTemp == "X" && !hasWon){
            toggleBoxClicks(false);
            setTimeout(cpuChoice, 500);
          }
          else {
            toggleBoxClicks(true);
          }

        }
      }
      else if (isCPU && currentPlayer == "O") {
        cpuChoice();
      }

    }
    catch(err){
      console.log(err);
      cpuChoice();
    }
  }
}
