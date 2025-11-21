const words = ["attack", "shield", "strike", "power", "combo", "blast", "charge", "focus"];
let currentWord = "";
let playerHealth = 100;
let cpuHealth = 100;

const wordDisplay = document.getElementById("word");
const input = document.getElementById("input");
const playerBar = document.getElementById("player-health");
const cpuBar = document.getElementById("cpu-health");
const result = document.getElementById("result");

const punchSound = document.getElementById("punch");
const winSound = document.getElementById("win");
const loseSound = document.getElementById("lose");

const playerAvatar = document.querySelector(".player .avatar");
const cpuAvatar = document.querySelector(".cpu .avatar");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateHealthBars() {
  playerBar.style.width = playerHealth + "%";
  cpuBar.style.width = cpuHealth + "%";
  playerBar.style.background = playerHealth > 30 ? "limegreen" : "red";
  cpuBar.style.background = cpuHealth > 30 ? "limegreen" : "red";
}

function setNewWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;
  input.value = "";
}

function checkWin() {
  if (cpuHealth <= 0) {
    result.textContent = "🎉 You Win!";
    winSound.play();
    input.disabled = true;
    clearInterval(cpuAttackInterval);
  } else if (playerHealth <= 0) {
    result.textContent = "💀 You Lose!";
    loseSound.play();
    input.disabled = true;
    clearInterval(cpuAttackInterval);
  }
}

function animateAttack(attacker) {
  attacker.classList.add("attack");
  setTimeout(() => attacker.classList.remove("attack"), 200);
}

input.addEventListener("input", () => {
  if (input.value.trim() === currentWord) {
    cpuHealth -= 20;
    punchSound.play();
    animateAttack(playerAvatar);
    updateHealthBars();
    checkWin();
    setNewWord();
  }
});

function cpuAttack() {
  if (playerHealth > 0) {
    playerHealth -= 10;
    punchSound.play();
    animateAttack(cpuAvatar);
    updateHealthBars();
    checkWin();
  }
}

let cpuAttackInterval = setInterval(cpuAttack, 3000);

setNewWord();
updateHealthBars();
