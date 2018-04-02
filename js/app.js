//Array that holds the cards cardsArray.
const cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"];
const cardsList = document.querySelectorAll(".card");
const cardContent = document.querySelectorAll(".card i");
const reset = document.querySelector(".restart");
const openedCardsList = [];
const moves = document.querySelector(".moves");
const finishGame = document.querySelector(".finish-game");
const stars = document.getElementById("stars");
let movesCount = 0;
let matchedCardsCount = 0;
let starsCount = 3;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
// Open the card when clicked
function showCard(card) {
  card.classList.add("open", "show");
}
//Add the card to opened cards list
function addToOpenedList(card) {
  openedCardsList.push(card);
}
//Remove all cards from opened cards List
function clearOpendList() {
  openedCardsList.length  = 0;
 }
//If cards are matched add class "match"
function matchedCards(firstCard, secondCard) {
  setTimeout(function(){
    firstCard.className = "card match";
    secondCard.className = "card match";
  }, 600);
  matchedCardsCount += 2;
}
//If cards are not matched reclose them.
function notMatchedCards(firstCard, secondCard) {
  setTimeout(function(){
    firstCard.classList.remove("show", "open");
    secondCard.classList.remove("show" , "open");
  }, 600);
 }
 // Check if cards are matched
 function checkIfCardsMatch() {
   const firstCard = openedCardsList[0];
   const secondCard = openedCardsList[1];
   const firstCardContent = firstCard.firstElementChild.className;
   const secondCardContent = secondCard.firstElementChild.className;
   if (firstCardContent === secondCardContent) {
     matchedCards(firstCard,secondCard);
   } else {
     notMatchedCards(firstCard, secondCard);
   }
   clearOpendList();
 }
 // Display the increment of the move counter
 function setMoveCounter() {
   moves.textContent = movesCount;
  }
  //
  function changeStarsColor() {
    if (movesCount > 10) {
      stars.children[2].style.color = "rgba(0, 0, 0, 0.26)";
      starsCount = 2;
    }
    if(movesCount > 15) {
      stars.children[1].style.color = "rgba(0, 0, 0, 0.26)";
      starsCount = 1;
    }

  }
  // Check if the game is  finished
  function checkIfTheGameFinished() {
    if (matchedCardsCount == cardsArray.length) {
      return true;
    }
    return false;
  }
  //finish the Game
  function finishTheGame() {
    finishGame.classList.add("view");
    document.getElementById("timer").innerHTML =` you got ${starsCount} stars, with ${movesCount} moves`
  }
  // Function to restart the game
  function resetCards(carrdsArray) {
    matchedCardsCount = 0;
    for (var i = 0; i < stars.children.length; i++) {
      stars.children[i].style.color = "gold";
    }
    movesCount = 0;
    setMoveCounter();
    for (let i = 0; i < cardsArray.length; i++) {
      cardsList[i].className = "card";
      cardContent[i].removeAttribute("class");
      cardContent[i].classList.add("fa", carrdsArray[i]);
    }
  }
//Loop through each card and change its HTML
 for (let i = 0; i < cardsList.length; i++) {
   let card=cardsList[i];
   card.addEventListener("click", function(e) {
   //Check if the card is already open
   if(card.className === "card"){
         showCard(card);
         addToOpenedList(card);
         if (openedCardsList.length == 2) {
           movesCount++;
           setMoveCounter();
           checkIfCardsMatch();
           clearOpendList();
           changeStarsColor();
           if(checkIfTheGameFinished()){
             finishTheGame();
           }
         }
       }
     });
    }
// Click to restatr the Game
reset.addEventListener("click", function() {
    shuffle(cardsArray);
    resetCards(cardsArray);
});
//play agin button
function playAgain() {
  finishGame.classList.remove("view");
  shuffle(cardsArray);
  resetCards(cardsArray);
};
