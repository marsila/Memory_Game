//Array that holds the cards cardsArray.
const cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"];
const cardsList = document.querySelectorAll(".card");
const cardContent = document.querySelectorAll(".card i");
const reset = document.querySelector(".restart");
const openedCardsList = [];
const moves = document.querySelector(".moves");
let movesCount = 0;

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
}
//If cards are not matched reclose them.
function notMatchedCards(firstCard, secondCard) {
  setTimeout(function(){
    firstCard.classList.remove("show", "open");
    secondCard.classList.remove("show" , "open");
  }, 800);
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
  // Function to restart the game
  function resetCards(carrdsArray) {
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
       //Check if the card is already open or has "match" class
       if(card.className === "card"){
         showCard(card);
         addToOpenedList(card);
         if (openedCardsList.length == 2) {
           movesCount++;
           setMoveCounter();
           checkIfCardsMatch();
           clearOpendList();
           }
       }
     });
    }
// Click to restatr the Game
reset.addEventListener("click", function() {
    shuffle(cardsArray);
    resetCards(cardsArray);
});

/*
// TODO:
        -set a timer
        -final score
*/
