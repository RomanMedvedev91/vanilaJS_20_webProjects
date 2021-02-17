const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizzard"];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectWord
      .split("")
      .map(
        (letter) => `
    <span class='letter'>
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")}
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectWord) {
    finalMessage.innerText = "Congradulations! You won!";
    popup.style.display = "flex";
  }
}
// Update the wrong letters

function updateWrongLetterEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
${wrongLetters.map((letter) => `<span>${letter}</span>`)}
`;
  // display part
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost!:(";
    popup.style.display = "flex";
  }
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
// keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // empty array
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectWord = words[Math.floor(Math.random() * words.length)];
  displayWord();

  updateWrongLetterEl();
  popup.style.display = "none";
});
displayWord();
