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
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');

    // Event listeners
    startButton.addEventListener('click', startGame);
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
    popupClose.addEventListener('click', closePopup);

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
            showPopup('Player busts!');
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
    
