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
        startButton.style.display = 'none'; // Hide the start button
    }

    function hit() {
        drawCard(true); // Player
        if (playerTotal > 21) {
            resultP.textContent = 'Player busts!';
            hitButton.style.display = 'none';
            standButton.style.display = 'none';
            startButton.style.display = 'inline-block'; // Show start button for replay
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
        startButton.style.display = 'inline-block'; // Show start button for replay
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
        if (deck.length === 0) return; // Prevent drawing from an empty deck
        const card = deck.pop();
        const cardValue = getCardValue(card);
        if (cardValue === undefined) {
            console.error(`Invalid card value for card: ${card}`);
            return;
        }
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
            case 'T': return 10;
            default: return parseInt(card.charAt(0), 10);
        }
    }

    function getCardName(card) {
        const rankNames = {
            'A': 'Ace', 'K': 'King', 'Q': 'Queen', 'J': 'Jack',
            'T': '10', '9': '9', '8': '8', '7': '7', '6': '6',
            '5': '5', '4': '4', '3': '3', '2': '2'
        };
        const suitNames = {
            'H': 'Hearts', 'D': 'Diamonds', 'C': 'Clubs', 'S': 'Spades'
        };
        
        let rank = card.charAt(0);
        let suit = card.charAt(1);
        return `${rankNames[rank]} of ${suitNames[suit]}`;
    }

    function updateDisplay() {
        playerCardsDiv.innerHTML = playerCards.map(getCardName).join(', ');
        playerTotalP.textContent = `Total: ${playerTotal}`;
        computerCardsDiv.innerHTML = computerCards.map(getCardName).join(', ');
        computerTotalP.textContent = `Total: ${computerTotal}`;
    }
});
