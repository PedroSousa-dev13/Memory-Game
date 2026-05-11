import { useCallback } from 'react';

export const translations = {
  pt: {
    // Main Menu
    playNow: "Jogar Agora",
    accessibility: "Acessibilidade",
    rules: "Regras do Jogo",
    options: "Opções",
    stats: "Estatísticas",
    gamesPlayed: "Partidas",
    bestScore: "Melhor Pontuação",
    totalTime: "Tempo Total",
    pairsMatched: "Pares Encontrados",
    premiumEdition: "Edição Web Premium",

    // Difficulty Selection
    challenge: "DESAFIO",
    selectDifficulty: "Selecione a Dificuldade",
    easy: "FÁCIL",
    medium: "MÉDIO",
    hard: "DIFÍCIL",
    backToThemes: "VOLTAR AOS TEMAS",
    cardsCount: "{{count}} Cartas",

    // Theme Selection
    selectTheme: "Selecione o Tema",
    animals: "Animais",
    numbers: "Números",
    classic: "Clássico",
    colorblind: "Daltónico",

    // Rules
    howToPlay: "Como Jogar",
    structure: "Estrutura",
    rulesTitle: "REGRAS",
    playerGuide: "Guia do Jogador",
    backToMenu: "VOLTAR AO MENU",
    ruleLines: {
      howToPlay: [
        "Clique em duas cartas para virá-las.",
        "Se forem iguais, você ganha pontos e elas ficam visíveis.",
        "Se forem diferentes, elas voltam a virar para baixo.",
        "O objetivo é encontrar todos os pares no menor tempo possível.",
        "Use multiplicadores fazendo acertos seguidos para pontuações recordes!"
      ],
      structure: [
        "O tabuleiro muda de tamanho baseado na dificuldade escolhida.",
        "Cartas possuem padrões visuais únicos para facilitar a distinção.",
        "Cada par possui um som característico que auxilia na memorização.",
        "O design foi otimizado para não cansar a vista em sessões longas."
      ],
      adaptations: [
        "Modo Daltónico: Filtros de alto contraste para visibilidade clara.",
        "Áudio Assistido: Narração de voz para suporte a cegueira.",
        "Feedback Visual: Efeitos de brilho para suporte auditivo.",
        "Escalonamento de Texto: Interface adaptável para baixa visão."
      ]
    },

    // Options
    settings: "DEFINIÇÕES",
    fullscreen: "Tela Cheia",
    fullscreenDesc: "Ativar modo de ecrã inteiro para maior imersão.",
    masterVolume: "Volume Geral",
    masterVolumeDesc: "Ajusta o nível global de todos os sons.",
    music: "Música",
    sfx: "Efeitos",
    uiSounds: "Sons de Menu",
    uiVolume: "Volume dos Botões",
    immersiveMode: "Modo Imersivo",
    immersiveModeDesc: "Ocultar interface (HUD) durante o jogo.",
    clearStats: "REINICIAR ESTATÍSTICAS",
    language: "Idioma",

    // Adaptations
    adaptationsTitle: "ADAPTAÇÕES",
    visualAssist: "Assistência Visual",
    audioAssist: "Áudio Assistido",
    audioAssistDesc: "Narração de voz ao virar cartas e encontrar pares.",
    hint: "Dica",
    hintDesc: "Revela todas as cartas temporariamente para ajudar na memorização.",
    colorblindMode: "Modo Daltónico",
    colorblindModeDesc: "Versão em preto e branco com alto contraste.",
    textSize: "Tamanho do Texto",
    textSizeDesc: "Aumentar escala da interface para melhor leitura.",
    keyboardNavigation: "Navegação por Teclado",
    keyboardNavigationDesc: "Usa as Setas para cartas e Tab para menus. Ative a 'Tela Cheia' para evitar conflitos de teclas com o navegador.",

    // Game HUD
    points: "PONTOS",
    time: "TEMPO",
    hintHUD: "DICA",
    pause: "PAUSA",
    resume: "RETOMAR",
    exit: "SAIR",
    restart: "REINICIAR",
    state: "ESTADO",
    progress: "PROGRESSO",
    records: "RECORDES",
    recentHistory: "HISTÓRICO RECENTE",
    totalGames: "Total Jogos",
    totalPairs: "Pares Totais",
    noRecords: "Sem recordes",
    boa: "BOA!",
    matchFound: "Par encontrado!",
    combo: "COMBO",

    // Win Modal
    victory: "VITÓRIA!",
    newRecord: "NOVO RECORDE!",
    finalScore: "Pontuação Final",
    finalTime: "Tempo Final",
    attempts: "Tentativas",
    accuracy: "Precisão",
    vsPrevious: "vs Sessão Anterior",
    betterThanAverage: "Melhor que a média!",
    worseThanAverage: "Podes melhorar!",
    player1: "Jogador 1",
    player2: "Jogador 2",
    turn: "Vez de",
    gameMode: "Modo de Jogo",
    singlePlayer: "Individual",
    multiPlayer: "2 Jogadores",
    confirmExit: "Sair do Jogo?",
    confirmExitDesc: "O progresso da partida atual será perdido.",
    stay: "FICAR",
    leave: "SAIR",
    victoryPlayer1: "Jogador 1 Venceu!",
    victoryPlayer2: "Jogador 2 Venceu!",
    draw: "Empate!",

    // Animals (for TTS)
    bear: "Urso",
    beaver: "Castor",
    bird: "Pássaro",
    cat: "Gato",
    cow: "Vaca",
    crocodile: "Crocodilo",
    dinosaur: "Dinossauro",
    dog: "Cão",
    dolphin: "Golfinho",
    elephant: "Elefante",
    fish: "Peixe",
    fox: "Raposa",
    giraffe: "Girafa",
    hippo: "Hipopótamo",
    horse: "Cavalo",
    iguana: "Iguana",
    koala: "Coala",
    lion: "Leão",
    monkey: "Macaco",
    octopus: "Polvo",
    penguin: "Pinguim",
    rat: "Rato",
    rooster: "Galo",
    seagull: "Gaivota",
    shark: "Tubarão",
    sheep: "Ovelha",
    snake: "Cobra",
    tiger: "Tigre",
    turtle: "Tartaruga",
    weasel: "Doninha",
    whale: "Baleia",
    wolf: "Lobo"
  },
  en: {
    // Main Menu
    playNow: "Play Now",
    accessibility: "Accessibility",
    rules: "Game Rules",
    options: "Options",
    stats: "Statistics",
    gamesPlayed: "Games",
    bestScore: "Best Score",
    totalTime: "Total Time",
    pairsMatched: "Pairs Matched",
    premiumEdition: "Premium Web Edition",

    // Difficulty Selection
    challenge: "CHALLENGE",
    selectDifficulty: "Select Difficulty",
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD",
    backToThemes: "BACK TO THEMES",
    cardsCount: "{{count}} Cards",

    // Theme Selection
    selectTheme: "Select Theme",
    animals: "Animals",
    numbers: "Numbers",
    classic: "Classic",
    colorblind: "Colorblind",

    // Rules
    howToPlay: "How to Play",
    structure: "Structure",
    rulesTitle: "RULES",
    playerGuide: "Player Guide",
    backToMenu: "BACK TO MENU",
    ruleLines: {
      howToPlay: [
        "Click on two cards to flip them.",
        "If they match, you earn points and they stay visible.",
        "If they are different, they flip back over.",
        "The goal is to find all pairs in the shortest time possible.",
        "Use multipliers by making consecutive matches for record scores!"
      ],
      structure: [
        "The board size changes based on the chosen difficulty.",
        "Cards have unique visual patterns for easier distinction.",
        "Each pair has a characteristic sound that aids memorization.",
        "The design was optimized for visual comfort during long sessions."
      ],
      adaptations: [
        "Colorblind Mode: High-contrast filters for clear visibility.",
        "Audio Assist: Voice narration for blindness support.",
        "Visual Feedback: Glow effects for hearing support.",
        "Text Scaling: Adaptable interface for low vision."
      ]
    },

    // Options
    settings: "SETTINGS",
    fullscreen: "Full Screen",
    fullscreenDesc: "Enable full screen mode for greater immersion.",
    masterVolume: "Master Volume",
    masterVolumeDesc: "Adjust the global level of all sounds.",
    music: "Music",
    sfx: "SFX",
    uiSounds: "Menu Sounds",
    uiVolume: "Button Volume",
    immersiveMode: "Immersive Mode",
    immersiveModeDesc: "Hide HUD during the game.",
    clearStats: "RESET STATISTICS",
    language: "Language",

    // Adaptations
    adaptationsTitle: "ADAPTATIONS",
    visualAssist: "Visual Assist",
    audioAssist: "Audio Assist",
    audioAssistDesc: "Voice narration when flipping cards and finding pairs.",
    hint: "Hint",
    hintDesc: "Temporarily reveals all cards to help with memorization.",
    colorblindMode: "Colorblind Mode",
    colorblindModeDesc: "Black and white version with high contrast.",
    textSize: "Text Size",
    textSizeDesc: "Increase interface scale for better readability.",
    keyboardNavigation: "Keyboard Navigation",
    keyboardNavigationDesc: "Use Arrows for cards and Tab for menus. Enable 'Full Screen' to avoid browser shortcut conflicts.",

    // Game HUD
    points: "POINTS",
    time: "TIME",
    hintHUD: "HINT",
    pause: "PAUSE",
    resume: "RESUME",
    exit: "EXIT",
    restart: "RESTART",
    state: "STATE",
    progress: "PROGRESS",
    records: "RECORDS",
    recentHistory: "RECENT HISTORY",
    totalGames: "Total Games",
    totalPairs: "Total Pairs",
    noRecords: "No records",
    boa: "NICE!",
    matchFound: "Match found!",
    combo: "COMBO",

    // Win Modal
    victory: "VICTORY!",
    newRecord: "NEW RECORD!",
    finalScore: "Final Score",
    finalTime: "Final Time",
    attempts: "Attempts",
    accuracy: "Accuracy",
    vsPrevious: "vs Previous Session",
    betterThanAverage: "Better than average!",
    worseThanAverage: "You can improve!",
    player1: "Player 1",
    player2: "Player 2",
    turn: "Turn",
    gameMode: "Game Mode",
    singlePlayer: "Solo",
    multiPlayer: "2 Players",
    confirmExit: "Exit Game?",
    confirmExitDesc: "Your current progress will be lost.",
    stay: "STAY",
    leave: "LEAVE",
    victoryPlayer1: "Player 1 Won!",
    victoryPlayer2: "Player 2 Won!",
    draw: "Draw!",

    // Animals (for TTS)
    bear: "Bear",
    beaver: "Beaver",
    bird: "Bird",
    cat: "Cat",
    cow: "Cow",
    crocodile: "Crocodile",
    dinosaur: "Dinosaur",
    dog: "Dog",
    dolphin: "Dolphin",
    elephant: "Elephant",
    fish: "Fish",
    fox: "Fox",
    giraffe: "Giraffe",
    hippo: "Hippo",
    horse: "Horse",
    iguana: "Iguana",
    koala: "Koala",
    lion: "Lion",
    monkey: "Monkey",
    octopus: "Octopus",
    penguin: "Penguin",
    rat: "Rat",
    rooster: "Rooster",
    seagull: "Seagull",
    shark: "Shark",
    sheep: "Sheep",
    snake: "Snake",
    tiger: "Tiger",
    turtle: "Turtle",
    weasel: "Weasel",
    whale: "Whale",
    wolf: "Wolf"
  }
};

export const useTranslation = (language) => {
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.pt;
    
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    
    return value;
  }, [language]);

  return { t };
};
