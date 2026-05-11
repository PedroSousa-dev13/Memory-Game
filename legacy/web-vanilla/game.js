document.addEventListener('DOMContentLoaded', () => {
    // Game Configuration
    const config = {
        gridSize: 16, // 4x4
        themes: {
            animais: [
                'BEAR.png', 'BEAVER.png', 'BIRD.png', 'CAT.png',
                'COW.png', 'CROCODILE.png', 'DINOSAUR.png', 'DOG.png'
            ]
        },
        imagePath: '../Items_Jogo/baralho_animais/'
    };

    // State Variables
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let multiplier = 1;
    let consecutiveMatches = 0;
    let timer = 0;
    let timerInterval = null;
    let isChecking = false;

    // DOM Elements
    const grid = document.getElementById('game-grid');
    const scoreDisplay = document.getElementById('current-score');
    const timerDisplay = document.getElementById('game-timer');
    const multiplierDisplay = document.getElementById('current-multiplier');
    const pairsFoundDisplay = document.getElementById('pairs-found');
    const winModal = document.getElementById('win-modal');
    const modalOverlay = document.getElementById('modal-overlay');

    // Initialize Game
    function init() {
        resetState();
        generateCards();
        renderGrid();
        startTimer();
    }

    function resetState() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        score = 0;
        multiplier = 1;
        consecutiveMatches = 0;
        timer = 0;
        isChecking = false;
        
        clearInterval(timerInterval);
        scoreDisplay.textContent = '0';
        timerDisplay.textContent = '00:00';
        multiplierDisplay.textContent = 'x1';
        pairsFoundDisplay.textContent = '0/8';
    }

    function generateCards() {
        const themeImages = [...config.themes.animais];
        const selectedImages = themeImages.slice(0, config.gridSize / 2);
        const cardPool = [...selectedImages, ...selectedImages];
        
        // Shuffle
        cardPool.sort(() => Math.random() - 0.5);
        
        cards = cardPool.map((image, index) => ({
            id: index,
            image: image,
            isFlipped: false,
            isMatched: false
        }));
    }

    function renderGrid() {
        grid.innerHTML = '';
        cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.classList.add('card');
            cardEl.dataset.id = card.id;
            
            cardEl.innerHTML = `
                <div class="card-face card-back"></div>
                <div class="card-face card-front">
                    <img src="${config.imagePath}${card.image}" alt="card" style="width: 80%; height: 80%; object-fit: contain;">
                </div>
            `;
            
            cardEl.addEventListener('click', () => handleCardClick(card, cardEl));
            grid.appendChild(cardEl);
        });
    }

    function handleCardClick(card, el) {
        if (isChecking || card.isFlipped || card.isMatched) return;

        // Flip card
        card.isFlipped = true;
        el.classList.add('flipped');
        flippedCards.push({ card, el });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        isChecking = true;
        const [first, second] = flippedCards;

        if (first.card.image === second.card.image) {
            // Match found
            handleMatch(first, second);
        } else {
            // No match
            handleMismatch(first, second);
        }
    }

    function handleMatch(first, second) {
        first.card.isMatched = true;
        second.card.isMatched = true;
        
        first.el.classList.add('matched');
        second.el.classList.add('matched');
        
        matchedPairs++;
        consecutiveMatches++;
        multiplier = Math.min(consecutiveMatches, 5);
        
        score += 100 * multiplier;
        updateHUD();

        flippedCards = [];
        isChecking = false;

        if (matchedPairs === config.gridSize / 2) {
            endGame();
        }
    }

    function handleMismatch(first, second) {
        consecutiveMatches = 0;
        multiplier = 1;
        updateHUD();

        setTimeout(() => {
            first.card.isFlipped = false;
            second.card.isFlipped = false;
            first.el.classList.remove('flipped');
            second.el.classList.remove('flipped');
            flippedCards = [];
            isChecking = false;
        }, 1000);
    }

    function updateHUD() {
        scoreDisplay.textContent = score;
        multiplierDisplay.textContent = `x${multiplier}`;
        pairsFoundDisplay.textContent = `${matchedPairs}/${config.gridSize / 2}`;
        
        if (multiplier > 1) {
            multiplierDisplay.classList.add('pulse');
            setTimeout(() => multiplierDisplay.classList.remove('pulse'), 500);
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            const mins = Math.floor(timer / 60).toString().padStart(2, '0');
            const secs = (timer % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function endGame() {
        clearInterval(timerInterval);
        document.getElementById('final-time').textContent = timerDisplay.textContent;
        document.getElementById('final-score').textContent = score;
        
        modalOverlay.classList.remove('modal-hidden');
        winModal.classList.remove('hidden');
    }

    // Modal Controls
    document.getElementById('btn-close-modal').addEventListener('click', () => {
        modalOverlay.classList.add('modal-hidden');
        winModal.classList.add('hidden');
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        modalOverlay.classList.remove('modal-hidden');
        document.getElementById('settings-modal').classList.remove('hidden');
    });

    document.querySelector('.close-settings').addEventListener('click', () => {
        modalOverlay.classList.add('modal-hidden');
        document.getElementById('settings-modal').classList.add('hidden');
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        init();
    });

    // Start!
    init();
});
