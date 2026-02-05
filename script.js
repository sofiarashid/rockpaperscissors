const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const playerName = document.getElementById("player1-name"); // target the name only
const popup = document.getElementById("popup-overlay");

startBtn.addEventListener("click", startGame);

function startGame() {
    const name = nameInput.value.trim();
    if (name !== "") {
        playerName.textContent = name; // only change the name
    } else {
        playerName.textContent = "Player 1";
    }
    popup.style.display = "none"; // hide popup
}
