/*
 * Create a list that holds all of your cards
 */
let movesCounter = document.querySelector(".moves")
let moves = 0;
let cardDeck = document.querySelector('.deck');
let getCard = document.getElementsByClassName('card');
let cardsList = [];
 //move getCard results to array:
for (let i = 0; i < getCard.length; i++) {
	 cardsList.push(getCard[i]);
}

let openCards = [];
const matchingCards = [];

//Restart button
let restartBtn = document.querySelector(".restart")
restartBtn.addEventListener('click', startGame)

//STARTING GAME
document.body.onload = startGame();

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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame(){
    movesCounter.innerHTML = 0;
    let shuffledCards = shuffle(cardsList);
    for(let i =0; i<shuffledCards.length; i++){
        shuffledCards.forEach(function(item) {
            cardDeck.appendChild(item);
        });
        cardsList[i].classList.remove("show", "open", "match")
    }
}

// set up the event listener for a card. If a card is clicked:
for(let i=0; i < cardsList.length; i++){
    cardsList[i].addEventListener ('click', displayCard)
    cardsList[i].addEventListener('click', addToOpenCards)
    cardsList[i].addEventListener('click', winningScore)
}


function displayCard(){
    this.classList.toggle('open');
    this.classList.toggle('show');
}

function addToOpenCards () {
    openCards.push(this);
//  - if the list already has another card, check to see if the two cards match
    if (openCards.length === 2) {
//    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
        moveCounter();
        checkIfMatch();
    }      
}

function checkIfMatch() {
    if (openCards[0].querySelector("I").className === openCards[1].querySelector("I").className) {
        console.log("para")
          openCards[0].classList.remove('open', 'show');
          openCards[0].classList.toggle('match');
          openCards[1].classList.remove('open', 'show');
          openCards[1].classList.toggle('match');
          matchingCards.push(openCards);
          openCards=[];
            console.log('checkIfMatch')
    } else{
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        removeFromOpen();
    }   
}

function removeFromOpen(array) {
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards=[];
    },1600);
    
}

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
    function moveCounter(){
        moves++
        movesCounter.innerHTML = moves
    }
    
 
 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function winningScore(){
    if(matchingCards.length === 8){
        alert("Congartulation! You've won the game!")
    }
}

winningScore();