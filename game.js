const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restartBtn");

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [...emojis, ...emojis];
let moves = 0;
let time = 0;
let timer;
let flippedCards = [];
let matchedPairs = 0;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === emojis.length) {
      endGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

function startGame() {
  gameBoard.innerHTML = "";
  moves = 0;
  time = 0;
  matchedPairs = 0;
  movesDisplay.textContent = moves;
  timeDisplay.textContent = time;
  clearInterval(timer);

  cards = shuffleCards(cards);
  cards.forEach((emoji) => {
    const card = createCard(emoji);
    gameBoard.appendChild(card);
  });

  timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  alert(`Congratulations! You won in ${moves} moves and ${time} seconds!`);
}

restartBtn.addEventListener("click", startGame);

startGame();
