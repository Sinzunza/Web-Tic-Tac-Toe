var rightName = 0;
var playerXName = prompt("What is Player 1's name?");

while (rightName === 0){
  if (playerXName.length === 0) {
    playerXName = prompt("Wrong input, try again. What is Player 1's name?");
  }
  else {
    rightName = 1;
  }
}

rightName = 0;
var playerOName = prompt("What is Player 2's name?");

while (rightName === 0){
  if (playerOName.length === 0) {
    playerOName = prompt("Wrong input, try again. What is Player 2's name?");
  }
  else {
    rightName = 1;
  }
}

document.getElementById("xName").innerHTML = playerXName;
document.getElementById("oName").innerHTML = playerOName;
document.getElementById("turnPlayer").innerHTML = playerXName; //Set first turn to player X

var arrayChoices = [0,1,2,3,4,5,6,7,8];
var winnerName;
var currentTurn = 0;

function squareSelected(y,z) {
    document.getElementById(y).innerHTML = z;
    arrayChoices[y] = z;
}

function checkToSeeIfWinner(letterChoice){
    if((arrayChoices[0] === letterChoice && arrayChoices[1] === letterChoice && arrayChoices[2] === letterChoice) || (arrayChoices[3] === letterChoice && arrayChoices[4] === letterChoice && arrayChoices[5] === letterChoice) ||
       (arrayChoices[6] === letterChoice && arrayChoices[7] === letterChoice && arrayChoices[8] === letterChoice) || (arrayChoices[0] === letterChoice && arrayChoices[3] === letterChoice && arrayChoices[6] === letterChoice) ||
       (arrayChoices[1] === letterChoice && arrayChoices[4] === letterChoice && arrayChoices[7] === letterChoice) || (arrayChoices[2] === letterChoice && arrayChoices[5] === letterChoice && arrayChoices[8] === letterChoice) ||
       (arrayChoices[0] === letterChoice && arrayChoices[4] === letterChoice && arrayChoices[8] === letterChoice) || (arrayChoices[2] === letterChoice && arrayChoices[4] === letterChoice && arrayChoices[6] === letterChoice)){
            currentTurn = 9;
            if (letterChoice === "X"){
                document.getElementById("turnPlayer").innerHTML = playerXName + " Wins!";
            }
            else {
                document.getElementById("turnPlayer").innerHTML = playerOName + " Wins!";
            }
       }
}

function currentSelection(a){
    if (currentTurn % 2 === 0 && currentTurn < 9){ //xTurn
        squareSelected(a,"X");
        document.getElementById(a).style.color = "blue";
        checkToSeeIfWinner("X");
        /*Below if else, Because X gets the last pick if game ends in a draw currentTurn would be 8 and you want it to say draw not the next players turn
        Also you don't want it to run if current Turn is 9. Because checkToSeeIfWinner already change the innerHTML to the winner*/
        if (currentTurn !== 8 && currentTurn !== 9){
            document.getElementById("turnPlayer").innerHTML = playerOName;
        }
        else if (currentTurn === 8){
            document.getElementById("turnPlayer").innerHTML = "Draw!";
        }
    }
    else if (currentTurn % 2 === 1 && currentTurn < 9){ //oTurn
        squareSelected(a,"O");
        document.getElementById(a).style.color = "red";
        checkToSeeIfWinner("O");
        if (currentTurn !== 9){
        document.getElementById("turnPlayer").innerHTML = playerXName;
        }
    }
    currentTurn++;
}
