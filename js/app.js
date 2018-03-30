//Array that holds the cards cardsArray.
const cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"];

const cardsList = document.querySelectorAll(".card");

const cardContent = document.querySelectorAll(".card i");

let openedCardsList = [];


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
function removeFromOpendList(openedCardsList) {
  for(let i=0 ; i< openedCardsList.length ; i++ ){
    openedCardsList.pop();
  }
 }

//If cards are matched add class "match"
function matchedCards(firstCard, secondCard) {
  setTimeout(function(){
    firstCard.classList.add("match");
    secondCard.classList.add("match");
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
 function checkCardsMatch(openedCardsList) {
   let firstCard = openedCardsList[0].firstElementChild.className;
   let secondCard = openedCardsList[1].firstElementChild.className;
   if (firstCard === secondCard) {
     matchedCards(openedCardsList[0],openedCardsList[1]);
   } else {
     notMatchedCards(openedCardsList[0], openedCardsList[1]);
   }
   removeFromOpendList(openedCardsList);
 }

//Loop through each card and change its HTML
 for (let i = 0; i < cardsList.length; i++) {
     cardsList[i].addEventListener("click", function(e) {
       //Check if the card is already open or has "match" class
       if(cardsList[i].classList.contains('open') === false){
         if ( cardsList[i].classList.contains('match') === false) {
           if (openedCardsList.length == 1) {
             showCard(cardsList[i]);
             addToOpenedList(cardsList[i]);
             checkCardsMatch(openedCardsList);
             removeFromOpendList(openedCardsList);
           } else {
             showCard(cardsList[i]);
             addToOpenedList(cardsList[i]);
           }
         }
       }
     });
    }

/*
//// TODO:
////       -Add restart function
////       -Add moves counter function
*/
