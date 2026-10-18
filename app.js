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

const board =  document.querySelector("#board");

board.addEventListener("click", (event) => {
  const card = event.target;

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
});

buildBoard();


















