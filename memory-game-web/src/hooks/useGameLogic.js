import { useState, useEffect, useCallback } from 'react';

const THEMES = {
  baralho_animais: [
    'BEAR.png', 'BEAVER.png', 'BIRD.png', 'CAT.png', 'COW.png', 'CROCODILE.png', 'DINOSAUR.png', 
    'DOG.png', 'DOLPHIN.png', 'ELEPHANT.png', 'FISH.png', 'FOX.png', 'GIRAFFE.png', 'HIPPO.png', 
    'HORSE.png', 'IGUANA.png', 'KOALA.png', 'LION.png', 'MONKEY.png', 'OCTOPUS.png', 'PENGUIN.png', 
    'RAT.png', 'ROOSTER.png', 'SEAGULL.png', 'SHARK.png', 'SHEEP.png', 'SNAKE.png', 'TIGER.png', 
    'TURTLE.png', 'WEASEL.png', 'WHALE.png', 'WOLF.png'
  ],
  baralho_animais_preto_e_branco: [
    'BEAR.png', 'BEAVER.png', 'BIRD.png', 'CAT.png', 'COW.png', 'CROCODILE.png', 'DINOSAUR.png', 
    'DOG.png', 'DOLPHIN.png', 'ELEPHANT.png', 'FISH.png', 'FOX.png', 'GIRAFFE.png', 'HIPPO.png', 
    'HORSE.png', 'IGUANA.png', 'KOALA.png', 'LION.png', 'MONKEY.png', 'OCTOPUS.png', 'PENGUIN.png', 
    'RAT.png', 'ROOSTER.png', 'SEAGULL.png', 'SHARK.png', 'SHEEP.png', 'SNAKE.png', 'TIGER.png', 
    'TURTLE.png', 'WEASEL.png', 'WHALE.png', 'WOLF.png'
  ],
  baralho_numeros: [
    '0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', 
    '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', 
    '19.png', '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', 
    '28.png', '29.png', '30.png', '31.png'
  ],
  baralho_numeros_preto_e_branco: [
    '0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', 
    '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', 
    '19.png', '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', 
    '28.png', '29.png', '30.png', '31.png'
  ]
};

export function useGameLogic({ onMatchSuccess, onMatchFail, onGameWin }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [easyModeUsed, setEasyModeUsed] = useState(false);
  
  // New states for rich stats and 2-player mode
  const [attempts, setAttempts] = useState(0);
  const [gameMode, setGameMode] = useState('single');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerScores, setPlayerScores] = useState([0, 0]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else if ((!isPlaying || isPaused) && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, timer]);

  const initGame = useCallback((baseThemeName, numCards, colorblindMode, mode = 'single') => {
    // Generate Cards
    const isColorblindSupported = baseThemeName === 'baralho_animais' || baseThemeName === 'baralho_numeros';
    const themeName = (colorblindMode && isColorblindSupported) ? `${baseThemeName}_preto_e_branco` : baseThemeName;
    
    const themeImages = THEMES[themeName] || THEMES[baseThemeName] || THEMES['baralho_animais'];
    const maxPairs = Math.min(themeImages.length, Math.floor(numCards / 2));
    const selectedImages = themeImages.slice(0, maxPairs);
    const cardPool = [...selectedImages, ...selectedImages];
    
    // Shuffle
    cardPool.sort(() => Math.random() - 0.5);
    
    const initialCards = cardPool.map((image, index) => ({
      id: index,
      image: image,
      isFlipped: false,
      isMatched: false
    }));

    setCards(initialCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setMultiplier(1);
    setConsecutiveMatches(0);
    setTimer(0);
    setAttempts(0);
    setGameMode(mode);
    setCurrentPlayer(0);
    setPlayerScores([0, 0]);
    setIsChecking(false);
    setIsPaused(false);
    setEasyModeUsed(false);
    setIsPlaying(true);
  }, []);

  const togglePause = useCallback(() => {
    if (isPlaying) {
      setIsPaused(prev => !prev);
    }
  }, [isPlaying]);

  const handleCardClick = (clickedCard) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched || !isPlaying || isPaused) return;

    // Flip the card
    setCards(prevCards => prevCards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    ));

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      setIsChecking(true);
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (flipped) => {
    const [first, second] = flipped;
    
    if (first.image === second.image) {
      // Match found
      setTimeout(() => {
        setCards(prevCards => prevCards.map(c => 
          (c.id === first.id || c.id === second.id) ? { ...c, isMatched: true } : c
        ));
        
        if (gameMode === 'multi') {
          setPlayerScores(prev => {
            const newScores = [...prev];
            newScores[currentPlayer] += 1;
            return newScores;
          });
        }

        setMatchedPairs(prev => {
          const newPairs = prev + 1;
          if (newPairs === cards.length / 2) {
            setIsPlaying(false);
            if (onGameWin) onGameWin();
          }
          return newPairs;
        });

        setConsecutiveMatches(prev => {
          const newStreak = prev + 1;
          const newMulti = Math.min(newStreak, 5);
          setMultiplier(newMulti);
          setScore(s => s + (1 * newMulti));
          return newStreak;
        });
        
        setFlippedCards([]);
        setIsChecking(false);
        if (onMatchSuccess) onMatchSuccess([first.id, second.id]);
      }, 500);
    } else {
      // Mismatch
      setTimeout(() => {
        setCards(prevCards => prevCards.map(c => 
          (c.id === first.id || c.id === second.id) ? { ...c, isFlipped: false } : c
        ));
        setConsecutiveMatches(0);
        setMultiplier(1);
        
        if (gameMode === 'multi') {
          setCurrentPlayer(prev => (prev === 0 ? 1 : 0));
        }

        setFlippedCards([]);
        setIsChecking(false);
        if (onMatchFail) onMatchFail([first.id, second.id]);
      }, 1000);
    }
  };

  const revealAllTemporarily = (duration = 2000) => {
    if (easyModeUsed || isChecking) return;
    setEasyModeUsed(true);
    
    const alreadyFlippedIds = flippedCards.map(c => c.id);
    setCards(prev => prev.map(c => ({ ...c, isFlipped: true })));
    
    setTimeout(() => {
      setCards(prev => prev.map(c => ({ 
        ...c, 
        isFlipped: c.isMatched || alreadyFlippedIds.includes(c.id) 
      })));
    }, duration);
  };

  return {
    cards,
    score,
    timer,
    multiplier,
    matchedPairs,
    totalPairs: cards.length / 2,
    attempts,
    gameMode,
    currentPlayer,
    playerScores,
    isPaused,
    easyModeUsed,
    togglePause,
    initGame,
    handleCardClick,
    revealAllTemporarily,
    isChecking,
    isPlaying
  };
}
