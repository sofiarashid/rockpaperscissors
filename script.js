const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const playerName = document.getElementById("player1-name");
const popup = document.getElementById("popup-overlay");

const resetBtn = document.getElementById("resetBtn");
const choiceBtns = document.querySelectorAll(".choice-btn");

const playerMoveImg = document.getElementById("player1-move");
const computerMoveImg = document.getElementById("computer-move");
const resultBox = document.getElementById("resultBox");

// game variables //
let roundNumber = 1;
let userWins = 0;
let computerWins = 0;
let choices = ["rock", "paper", "scissors"];

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

//popup - change name to name or leave as player1 if user doesnt put anything //
function startGame() {
    const name = nameInput.value.trim();
    if (name !== "") {
        playerName.textContent = name;
    } else {
        playerName.textContent = "Player 1";
    }

    popup.style.display = "none";

    //reset game //
    roundNumber=1;
    userWins=0;
    computerWins=0;
    playerMoveImg.src="rock1.png";
    computerMoveImg.src="rock2.png";
    resultBox.textContent = "Make your choice! Round 1 of 5";

    // make each button work again + hide reset button //
    document.getElementById("rockBtn").disabled = false;
    document.getElementById("paperBtn").disabled = false;
    document.getElementById("scissorsBtn").disabled = false;
    document.getElementById("resetBtn").style.display= "none";

    updateProgressBars();
}




function playRound(userChoice) {
    if (roundNumber > 5) {
        resultBox.textContent = "Game over. Press Reset.";
        return;
    }
    let computerNumber = Math.floor(Math.random() * 3);
    let computerChoice = choices[computerNumber];

    // default images before shake
    playerMoveImg.src = "rock1.png";
    computerMoveImg.src = "rock2.png";

    // player shake
    playerMoveImg.classList.add("shake");

    setTimeout(() => {
        playerMoveImg.classList.remove("shake");
        playerMoveImg.src = userChoice + "1.png";

        // computer shake after short delay to make them even
        setTimeout(() => {
            computerMoveImg.classList.add("shake");

            setTimeout(() => {
                computerMoveImg.classList.remove("shake");
                computerMoveImg.src = computerChoice + "2.png";

                //tie
                if (userChoice === computerChoice) {
                    resultBox.textContent = `Tie! You both chose ${userChoice}.`;
                } 
                //user chooses rock
                else if (userChoice === "rock") {
                    if (computerChoice === "scissors") {
                        userWins = userWins + 1;
                        resultBox.textContent = "You win! Rock beats Scissors.";
                    } else {
                        computerWins = computerWins + 1;
                        resultBox.textContent = "Computer wins! Paper beats Rock.";
                    }
                }
                //user chooses paper
                else if (userChoice === "paper") {
                    if (computerChoice === "rock") {
                        userWins = userWins + 1;
                        resultBox.textContent = "You win! Paper beats Rock.";
                    } else {
                        computerWins = computerWins + 1;
                        resultBox.textContent = "Computer wins! Scissors beats Paper.";
                    }
                }
                //user chooses scissors
                else if (userChoice === "scissors") {
                    if (computerChoice === "paper") {
                        userWins = userWins + 1;
                        resultBox.textContent = "You win! Scissors beats Paper.";
                    } else {
                        computerWins = computerWins + 1;
                        resultBox.textContent = "Computer wins! Rock beats Scissors.";
                    }
                }

                updateProgressBars();

                // round info
                roundNumber = roundNumber + 1;
                if (roundNumber <= 5) {
                    resultBox.textContent = resultBox.textContent + " | Round " + roundNumber + " of 5";
                } else {endGame();}

            }, 400); // computer shake in milliseconds (0.4 sec)
        } 200) //delay after player shake for computer (0.2 sec)
    }, 400); // player shake (0.4 sec)
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

    //disable rps buttons
    document.getElementById("rockBtn").disabled = true;
    document.getElementById("paperBtn").disabled = true;
    document.getElementById("scissorsBtn").disabled = true;
    // show reset button
    resetBtn.style.display = "inline-block";
}




function updateProgressBars() {
    const playerCheckpoints = document.querySelectorAll(".player-box:first-child .checkpoint");
    const computerCheckpoints = document.querySelectorAll(".player-box:last-child .checkpoint");

    // if player wins 1st round, checkpoint becomes active, if true progress bar turns gold //
    playerCheckpoints.forEach((cp, i) => {
        cp.classList.toggle("active", i < userWins);
    });
    // same thing for computer //
    computerCheckpoints.forEach((cp, i) => {
        cp.classList.toggle("active", i < computerWins);
    });
}



function resetGame() {
    // reset round number and wins
    roundNumber = 1;
    userWins = 0;
    computerWins = 0;

    // reset imgs and text box
    playerMoveImg.src = "rock1.png";
    computerMoveImg.src = "rock2.png";
    resultBox.textContent = "Make your choice! Round 1 of 5";

    // make rps buttons work
    document.getElementById("rockBtn").disabled = false;
    document.getElementById("paperBtn").disabled = false;
    document.getElementById("scissorsBtn").disabled = false;

    // hide reset button
    resetBtn.style.display = "none";

    // reset progress bars
    updateProgressBars();
}
