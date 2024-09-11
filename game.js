document.addEventListener('DOMContentLoaded', (event) => {
    const suits = ['H', 'D', 'C', 'S'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    let deck, playerCards, computerCards, playerTotal, computerTotal;

    // Get DOM elements
    const startButton = document.getElementById('start-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const playerCardsDiv = document.getElementById('player-cards');
    const playerTotalP = document.getElementById('player-total');
    const computerCardsDiv = document.getElementById('computer-cards');
    const computerTotalP = document.getElementById('computer-total');
    const resultP = document.getElementById('result');

    // Event listeners
    startButton.addEventListener('click', startGame);
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);

    function startGame() {
        deck = createDeck();
        playerCards = [];
        computerCards = [];
        playerTotal = 0;
        computerTotal = 0;
        drawCard(true); // Player
        drawCard(true); // Player
        drawCard(false); // Computer
        drawCard(false); // Computer

        updateDisplay();
        resultP.textContent = '';
        hitButton.style.display = 'inline-block';
        standButton.style.display = 'inline-block';
        startButton.disabled = true;
    }

    function hit() {
        drawCard(true); // Player
        if (playerTotal > 21) {
            resultP.textContent = 'Player busts!';
            hitButton.style.display = 'none';
            standButton.style.display = 'none';
        }
        updateDisplay();
    }

    function stand() {
        while (computerTotal < 17) {
            drawCard(false); // Computer
        }
        let result;
        if (computerTotal > 21) {
            result = 'Computer busts!';
        } else if (playerTotal > computerTotal) {
            result = 'Player wins!';
        } else if (computerTotal > playerTotal) {
            result = 'Computer wins!';
        } else {
            result = 'It\'s a tie!';
        }
        resultP.textContent = result;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        updateDisplay();
    }

    function createDeck() {
        const newDeck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                newDeck.push(rank + suit);
            }
        }
        return newDeck.sort(() => Math.random() - 0.5); // Shuffle deck
    }

    function drawCard(isPlayer) {
        const card = deck.pop();
        const cardValue = getCardValue(card);
        if (isPlayer) {
            playerCards.push(card);
            playerTotal += cardValue;
        } else {
            computerCards.push(card);
            computerTotal += cardValue;
        }
    }

    function getCardValue(card) {
        switch (card.charAt(0)) {
            case 'A': return 11;
            case 'K': case 'Q': case 'J': return 10;
            default: return parseInt(card.charAt(0), 10);
        }
    }

    function updateDisplay() {
        playerCardsDiv.innerHTML = playerCards.join(' ');
        playerTotalP.textContent = `Total: ${playerTotal}`;
        computerCardsDiv.innerHTML = computerCards.join(' ');
        computerTotalP.textContent = `Total: ${computerTotal}`;
    }
});
