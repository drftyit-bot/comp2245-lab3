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
let waiting = false;

const board =  document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const statusDisplay = document.querySelector("#status");


board.addEventListener("click", (event) => {
  const card = event.target;

if (waiting || !card.classList.contains("card")) {
    return;
  }

if (!card.classList.contains("card")) {
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
      // Cards match: Add 'matched' class and disable them
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.disabled = true;
      card2.disabled = true;

      statusDisplay.textContent = "That's a pair!";

      flippedCards = [];
     } else {
      Mismatch(card1, card2);
    }
  }

//Ex.4 Flipping back unmatched cards
function Mismatch(card1, card2) {
  statusDisplay.textContent = "Not a pair. Try again.";
  waiting = true; // Lock board clicks

  setTimeout(() => {
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
  }, 1000);
}









});
buildBoard();


















