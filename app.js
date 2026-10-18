const fruits = [
{ name: "apple", symbol: "🍎" },
{ name: "banana", symbol: "🍌" },
{ name: "cherry", symbol: "🍒" },
{ name: "coconut", symbol: "🥥" },
{ name: "grapes", symbol: "🍇" },
{ name: "mango", symbol: "🥭" },
{ name: "pineapple", symbol: "🍍" },
{ name: "watermelon", symbol: "🍉" },
];

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

//Ex.1 Board Building
let deck = [];
function buildBoard() {
  const board = document.querySelector("#board");
  board.replaceChildren();
  

  deck = shuffle([...fruits, ...fruits]);


  deck.forEach((fruit, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;
    board.appendChild(card);
  });
}


// Ex.2 Card Flipping

let flippedCards = [];
let moves = 0;
let matchedPairs = 0;
let waiting = false;
let timerID = null; //Ex.6 Game Timer

const board =  document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const statusDisplay = document.querySelector("#status");
const newGameBtn = document.querySelector("#new-game");



//Ex.4 Flipping back unmatched cards
function Mismatch(card1, card2) {
  statusDisplay.textContent = "Not a pair. Try again.";
  waiting = true;

  timerID = setTimeout(() => {
    // Reset card 1
    const idx1 = Number(card1.dataset.index);
    card1.textContent = "";
    card1.classList.remove("flipped");
    card1.setAttribute("aria-label", `Card ${idx1 + 1}, face down`);

    // Reset card 2
    const idx2 = Number(card2.dataset.index);
    card2.textContent = "";
    card2.classList.remove("flipped");
    card2.setAttribute("aria-label", `Card ${idx2 + 1}, face down`);

    // Reset state and unlock board
    flippedCards = [];
    waiting = false;
    timerID = null;
  }, 1000);
}

board.addEventListener("click", (event) => {
  const card = event.target;

if (waiting || !card.classList.contains("card")) {
    return;
  }

if(card.classList.contains("flipped")){
  return;
}

const index = Number(card.dataset.index);
const fruit = deck[index];

card.textContent = fruit.symbol;
card.classList.add("flipped");

card.setAttribute("aria-label", `Card ${index + 1}, ${fruit.name}`);

flippedCards.push(card);

//Ex.3 Comparison of two cards

if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const [card1, card2] = flippedCards;
    const fruit1 = deck[Number(card1.dataset.index)];
    const fruit2 = deck[Number(card2.dataset.index)];

    if (fruit1.name === fruit2.name) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.disabled = true;
      card2.disabled = true;

      matchedPairs++;
      flippedCards = [];

	//Ex.5 Win Condition Check
      if (matchedPairs === fruits.length) {
        statusDisplay.textContent = `You found all the pairs in ${moves} moves!`;
        statusDisplay.classList.add("you-won");
      } else {
        statusDisplay.textContent = "That's a pair!";
      }
     } else {
      Mismatch(card1, card2);
    }
  }


});

// Ex.6cont New Game Logic
function startNewGame() {
  if (timerID !== null) {
    clearTimeout(timerID);
    timerID = null;
  }

  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  waiting = false;

  movesDisplay.textContent = "0";
  statusDisplay.textContent = "Turn over two cards to find a matching pair.";
  statusDisplay.classList.remove("you-won");

  buildBoard();
}

if (newGameBtn) {
  newGameBtn.addEventListener("click", startNewGame);
}

// Initial board render
buildBoard();


















