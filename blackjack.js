const dealerCards = document.getElementById('dealer-cards'); 
const playerCards = document.getElementById('player-cards');
const hittingId = document.getElementById('hit');
const stayingId = document.getElementById('stay');
const hidding = document.getElementById('hidden');
const scoring = document.getElementById('results');
const dealerSumId = document.getElementById('dealer-sum');
const playerSumId = document.getElementById('player-sum');


let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = () => { builDeck(); shuffleDeck(); startGame(); };


function builDeck() {
     let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
    values.map(values => values.toUpperCase());
    let types = ['C', 'D', 'H', 'S'];
    deck = [];

    for (let index = 0; index < types.length; index++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + '-' + types[index]);
            
        }
    }
};

function shuffleDeck() {
    for (let index = 0; index < deck.length; index++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[index];
        deck[index] = deck[j];
        deck[j] = temp;
        
    }
    console.log(deck)
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        const cardImg = document.createElement('img')
        cardImg.classList.add('card-add')
        const card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        dealerCards.append(cardImg);
    }

    for (let index = 0; index < 2; index++) {
     const cardImg = document.createElement('img')
        cardImg.classList.add('card-add')
        const card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        playerCards.append(cardImg);
           
    }
    hittingId.addEventListener('click', hitting);
    stayingId.addEventListener('click', staying);

}
function hitting()
{
    if (!canHit) {
        hittingId.classList.add('closed'); 
        cardImg.append(stayingId);

        return
    } 
     const cardImg = document.createElement('img')
        cardImg.classList.add('card-add')
        const card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        playerCards.append(cardImg);
   
        reduceAce(playerSum, playerAceCount) > 21? canHit = false: '';

}
    
function staying() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    hidding.src = "./cards/" + hidden + '.png';

    let message = "";

    // if (playerSum > 2) {
    //     return message = "you lose!";
    // } else if (dealerSum > 21) { return message = "you wine" }
    // else if (dealerSum == playerSum) { return message = "tie!"; }
    // else if (dealerSum < playerSum) { return message = "you win!"; }
    // else if (dealerSum > playerSum) { return message = "you lose!"; }

    switch (true) {
        case (playerSum > 21):
            message = "you Lose!";
            break;
    
        case (dealerSum > 21):
            message = "you win!";
            break;

        case (dealerSum == playerSum):
            message = "tie!";
            break;
        
        case (dealerSum < playerSum):
            message = "you win!";
            break;
        
        case (dealerSum > playerSum):
            message = "you lose!";
            break;
        default:
            message = "";
            break;
    }
    playerSumId.innerText = playerSum;
    dealerSumId.innerText = dealerSum;
    scoring.innerText = message;

    console.log(message)
}
 
function getValue(card) {
    let data = card.split('-');
    let value = data[0];

    if (isNaN(value)) {
        if(value === 'A'){ return 11 }  else { return 10 };
    } else {
        return parseInt(value);
    }
    
}

function checkAce(card) {
    if (card[0] == "A") { return 1 } else { 0 };
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}