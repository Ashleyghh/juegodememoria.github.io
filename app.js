const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh img");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const again = document.querySelector(".again");
const totalTime = document.querySelector("#totalTime");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let totalSeconds = 0;
let interval;
let finalTime;
let click = -1;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    startTime();
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  gameWon();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

refresh.addEventListener("click", function () {
  confirm("Estás segur@ de volver a reiniciar el juego?");
  location.reload();
});

function startTime() {
  if (click === -1) {
    interval = setInterval(function () {
      final.innerHTML = "Felicitaciones. acabaste de ganar en un tiempo de: " + finalTime + "!";
      finalTime = minute.innerHTML + ":" + second.innerHTML;
      totalSeconds++;
      second.innerHTML = pad(totalSeconds % 60);
      minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
  }
  click = 1;
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function gameWon() {
  if (click < 1) {
    firstCard = e.target;
  }

  if (document.getElementsByClassName("flip").length === 12) {
    congratsSection.classList.replace("hidden", "show");
    clearInterval(interval);
    finalTime = minute.innerHTML + ":" + second.innerHTML;
    final.innerHTML = "Felicitaciones. acabaste de ganar en un tiempo de: " + finalTime + "!";
    totalTime.innerHTML = finalTime;
  }
  click = 0;
}

again.addEventListener("click", function () {
  congratsSection.classList.replace("show", "hidden");
  location.reload();
});

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
