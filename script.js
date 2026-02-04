const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const player1 = document.getElementById("player1");
const popup = document.getElementById("popup-overlay");

startBtn.addEventListener("click", startGame);

function startGame() {
    const name = nameInput.value.trim();
    if (name !== "") {
        player1.textContent = name;
    } else {
        player1.textContent = "Player 1";
    }
    popup.style.display = "none";
}
