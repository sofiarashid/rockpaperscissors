const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const playerName = document.getElementById("player1-name");
const popup = document.getElementById("popup-overlay");

startBtn.addEventListener("click", startGame);

//popup - change name to name or leave as player1 if user doesnt put anything //
function startGame() {
    const name = nameInput.value.trim();
    if (name !== "") {
        playerName.textContent = name;
    } else {
        playerName.textContent = "Player 1";
    }
    popup.style.display = "none";
    resultBox.textContent = "Make your choice!";
}

//game stuff //
let roundNumber = 1;
let userWins = 0;
let computerWins = 0;

// rock0, paper1, scissors2 //
let choices = ["rock", "paper", "scissors"];

const playerMoveImg = document.getElementById("player1-move");
const computerMoveImg = document.getElementById("computer-move");
const resultBox = document.getElementById("resultBox");

function playRound(userChoice) {

    if (roundNumber > 5) {
        return;
    }

    let computerNumber = Math.floor(Math.random() * 3);
    let computerChoice = choices[computerNumber];

    playerMoveImg.src = userChoice + "1.png";
    computerMoveImg.src = computerChoice + "2.png";

    // tie //
    if (userChoice === computerChoice) {
        resultBox.textContent = "Tie! You both chose " + userChoice + ".";
    }
    //user is rock //
    else if (userChoice === "rock") {
        if (computerChoice === "scissors") {
            userWins = userWins + 1;
            resultBox.textContent = "You win! Rock beats Scissors.";
        } else {
            computerWins = computerWins + 1;
            resultBox.textContent = "Computer wins! Paper beats Rock.";
        }
    }

    //user is paper //
    else if (userChoice === "paper") {
        if (computerChoice === "rock") {
            userWins = userWins + 1;
            resultBox.textContent = "You win! Paper beats Rock.";
        } else {
            computerWins = computerWins + 1;
            resultBox.textContent = "Computer wins! Scissors beats Paper.";
        }
    }

    // user is scissors //
    else if (userChoice === "scissors") {
        if (computerChoice === "paper") {
            userWins = userWins + 1;
            resultBox.textContent = "You win! Scissors beats Paper.";
        } else {
            computerWins = computerWins + 1;
            resultBox.textContent = "Computer wins! Rock beats Scissors.";
        }
    }

    roundNumber = roundNumber + 1;
    if (roundNumber === 6) {
        endGame();
    }
}

// end the game - you won or computer won //
function endGame() {
    if (userWins > computerWins) {
        resultBox.textContent =
            "Final Score: " + playerName.textContent + " " + userWins +
            ", Computer " + computerWins + ". You won the match!";
    } else if (computerWins > userWins) {
        resultBox.textContent =
            "Final Score: " + playerName.textContent + " " + userWins +
            ", Computer " + computerWins + ". Computer won the match.";
    } else {
        resultBox.textContent =
            "Final Score: " + playerName.textContent + " " + userWins +
            ", Computer " + computerWins + ". It's a tie!";
    }
}