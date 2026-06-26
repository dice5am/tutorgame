/**
 * Alphabet Pop & Learn! - Core Game Engine
 * Features:
 * - Dynamic Web Audio synthesis (pops, boings, fanfares, chimes, giggles)
 * - HTML5 Speech Synthesis integration for letter pronunciations with Bippy talking mouth animation
 * - Unified state and star progress management with local storage persistence
 * - Interactive physics-based bubble spawning and particle explosion system (with special Star, Rainbow, and Mascot bubbles)
 * - Canvas-based letter tracing engine with coordinate check & Web Audio chimes
 * - Sound Detective 3D card flips with interactive voice guides
 * - Clean screen routing and responsive animations
 */

// ==========================================================================
// DATA STRUCTURE FOR ALPHABET
// ==========================================================================
const alphabetData = [
  { letter: 'A', word: 'apple', hue: 0, format: 'png' },
  { letter: 'B', word: 'bear', hue: 205, format: 'png' },
  { letter: 'C', word: 'cat', hue: 38, format: 'png' },
  { letter: 'D', word: 'dog', hue: 28, format: 'png' },
  { letter: 'E', word: 'elephant', hue: 255, format: 'png' },
  { letter: 'F', word: 'frog', hue: 18, format: 'png' },
  { letter: 'G', word: 'giraffe', hue: 285, format: 'png' },
  { letter: 'H', word: 'hippo', hue: 45, format: 'png' },
  { letter: 'I', word: 'iguana', hue: 335, format: 'png' },
  { letter: 'J', word: 'jellyfish', hue: 345, format: 'png' },
  { letter: 'K', word: 'koala', hue: 185, format: 'png' },
  { letter: 'L', word: 'lion', hue: 48, format: 'png' },
  { letter: 'M', word: 'monkey', hue: 30, format: 'png' },
  { letter: 'N', word: 'nest', hue: 22, format: 'png' },
  { letter: 'O', word: 'owl', hue: 265, format: 'png' },
  { letter: 'P', word: 'penguin', hue: 215, format: 'png' },
  { letter: 'Q', word: 'queen', hue: 50, format: 'png' },
  { letter: 'R', word: 'robot', hue: 195, format: 'svg' },
  { letter: 'S', word: 'sun', hue: 52, format: 'svg' },
  { letter: 'T', word: 'tree', hue: 125, format: 'svg' },
  { letter: 'U', word: 'umbrella', hue: 275, format: 'svg' },
  { letter: 'V', word: 'violin', hue: 32, format: 'svg' },
  { letter: 'W', word: 'watermelon', hue: 148, format: 'svg' },
  { letter: 'X', word: 'xylophone', hue: 172, format: 'svg' },
  { letter: 'Y', word: 'yacht', hue: 210, format: 'svg' },
  { letter: 'Z', word: 'zebra', hue: 0, format: 'svg' }
];

// Phonics sound mappings for standard narration
const phonicsDictionary = {
  'A': 'ah says apple',
  'B': 'buh says bear',
  'C': 'cuh says cat',
  'D': 'duh says dog',
  'E': 'eh says elephant',
  'F': 'fuh says frog',
  'G': 'guh says giraffe',
  'H': 'huh says hippo',
  'I': 'ih says iguana',
  'J': 'juh says jellyfish',
  'K': 'kuh says koala',
  'L': 'luh says lion',
  'M': 'muh says monkey',
  'N': 'nuh says nest',
  'O': 'ah says owl',
  'P': 'puh says penguin',
  'Q': 'kwuh says queen',
  'R': 'ruh says robot',
  'S': 'suh says sun',
  'T': 'tuh says tree',
  'U': 'uh says umbrella',
  'V': 'vuh says violin',
  'W': 'wuh says watermelon',
  'X': 'ks says xylophone',
  'Y': 'yuh says yacht',
  'Z': 'zuh says zebra'
};

// Mapping for letters where SVG word differs from the PNG word (defined in alphabetData)
const svgWordMapping = {
  'B': 'ball',
  'F': 'fish',
  'G': 'grapes',
  'H': 'house',
  'I': 'ice_cream',
  'K': 'kite'
};

// Coordinate guidelines for A-Z Tracing Screen (scaled to 100x100 space)
const letterGuideDots = {
  'A': [
    { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 35, y: 47 }, { stroke: 1, x: 20, y: 80 },
    { stroke: 2, x: 50, y: 15 }, { stroke: 2, x: 65, y: 47 }, { stroke: 2, x: 80, y: 80 },
    { stroke: 3, x: 32, y: 52 }, { stroke: 3, x: 50, y: 52 }, { stroke: 3, x: 68, y: 52 }
  ],
  'B': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 55, y: 15 }, { stroke: 2, x: 65, y: 30 }, { stroke: 2, x: 55, y: 47 }, { stroke: 2, x: 30, y: 47 },
    { stroke: 3, x: 30, y: 47 }, { stroke: 3, x: 60, y: 47 }, { stroke: 3, x: 70, y: 63 }, { stroke: 3, x: 60, y: 80 }, { stroke: 3, x: 30, y: 80 }
  ],
  'C': [
    { stroke: 1, x: 70, y: 25 }, { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 30, y: 30 }, { stroke: 1, x: 25, y: 50 }, { stroke: 1, x: 30, y: 70 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 70, y: 75 }
  ],
  'D': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 60, y: 15 }, { stroke: 2, x: 75, y: 47 }, { stroke: 2, x: 60, y: 80 }, { stroke: 2, x: 30, y: 80 }
  ],
  'E': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 50, y: 15 }, { stroke: 2, x: 70, y: 15 },
    { stroke: 3, x: 30, y: 47 }, { stroke: 3, x: 50, y: 47 }, { stroke: 3, x: 65, y: 47 },
    { stroke: 4, x: 30, y: 80 }, { stroke: 4, x: 50, y: 80 }, { stroke: 4, x: 70, y: 80 }
  ],
  'F': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 50, y: 15 }, { stroke: 2, x: 70, y: 15 },
    { stroke: 3, x: 30, y: 47 }, { stroke: 3, x: 50, y: 47 }, { stroke: 3, x: 65, y: 47 }
  ],
  'G': [
    { stroke: 1, x: 70, y: 25 }, { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 30, y: 30 }, { stroke: 1, x: 25, y: 50 }, { stroke: 1, x: 30, y: 70 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 70, y: 80 },
    { stroke: 2, x: 70, y: 50 }, { stroke: 2, x: 50, y: 50 }
  ],
  'H': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 25, y: 47 }, { stroke: 1, x: 25, y: 80 },
    { stroke: 2, x: 75, y: 15 }, { stroke: 2, x: 75, y: 47 }, { stroke: 2, x: 75, y: 80 },
    { stroke: 3, x: 25, y: 47 }, { stroke: 3, x: 50, y: 47 }, { stroke: 3, x: 75, y: 47 }
  ],
  'I': [
    { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 50, y: 47 }, { stroke: 1, x: 50, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 50, y: 15 }, { stroke: 2, x: 70, y: 15 },
    { stroke: 3, x: 30, y: 80 }, { stroke: 3, x: 50, y: 80 }, { stroke: 3, x: 70, y: 80 }
  ],
  'J': [
    { stroke: 1, x: 55, y: 15 }, { stroke: 1, x: 55, y: 47 }, { stroke: 1, x: 55, y: 70 }, { stroke: 1, x: 45, y: 80 }, { stroke: 1, x: 30, y: 80 }, { stroke: 1, x: 20, y: 70 }
  ],
  'K': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 65, y: 20 }, { stroke: 2, x: 48, y: 40 }, { stroke: 2, x: 30, y: 47 },
    { stroke: 3, x: 30, y: 47 }, { stroke: 3, x: 48, y: 55 }, { stroke: 3, x: 68, y: 80 }
  ],
  'L': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 80 }, { stroke: 2, x: 50, y: 80 }, { stroke: 2, x: 70, y: 80 }
  ],
  'M': [
    { stroke: 1, x: 20, y: 80 }, { stroke: 1, x: 20, y: 47 }, { stroke: 1, x: 20, y: 15 },
    { stroke: 2, x: 20, y: 15 }, { stroke: 2, x: 35, y: 47 }, { stroke: 2, x: 50, y: 80 },
    { stroke: 3, x: 50, y: 80 }, { stroke: 3, x: 65, y: 47 }, { stroke: 3, x: 80, y: 15 },
    { stroke: 4, x: 80, y: 15 }, { stroke: 4, x: 80, y: 47 }, { stroke: 4, x: 80, y: 80 }
  ],
  'N': [
    { stroke: 1, x: 25, y: 80 }, { stroke: 1, x: 25, y: 47 }, { stroke: 1, x: 25, y: 15 },
    { stroke: 2, x: 25, y: 15 }, { stroke: 2, x: 50, y: 47 }, { stroke: 2, x: 75, y: 80 },
    { stroke: 3, x: 75, y: 80 }, { stroke: 3, x: 75, y: 47 }, { stroke: 3, x: 75, y: 15 }
  ],
  'O': [
    { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 30, y: 25 }, { stroke: 1, x: 20, y: 50 }, { stroke: 1, x: 30, y: 75 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 70, y: 75 }, { stroke: 1, x: 80, y: 50 }, { stroke: 1, x: 70, y: 25 }
  ],
  'P': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 55, y: 15 }, { stroke: 2, x: 65, y: 30 }, { stroke: 2, x: 55, y: 47 }, { stroke: 2, x: 30, y: 47 }
  ],
  'Q': [
    { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 30, y: 25 }, { stroke: 1, x: 20, y: 50 }, { stroke: 1, x: 30, y: 75 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 70, y: 75 }, { stroke: 1, x: 80, y: 50 }, { stroke: 1, x: 70, y: 25 },
    { stroke: 2, x: 55, y: 60 }, { stroke: 2, x: 75, y: 80 }
  ],
  'R': [
    { stroke: 1, x: 30, y: 15 }, { stroke: 1, x: 30, y: 47 }, { stroke: 1, x: 30, y: 80 },
    { stroke: 2, x: 30, y: 15 }, { stroke: 2, x: 55, y: 15 }, { stroke: 2, x: 65, y: 30 }, { stroke: 2, x: 55, y: 47 }, { stroke: 2, x: 30, y: 47 },
    { stroke: 3, x: 38, y: 47 }, { stroke: 3, x: 55, y: 63 }, { stroke: 3, x: 70, y: 80 }
  ],
  'S': [
    { stroke: 1, x: 70, y: 20 }, { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 30, y: 28 }, { stroke: 1, x: 35, y: 42 }, { stroke: 1, x: 50, y: 48 }, { stroke: 1, x: 68, y: 54 }, { stroke: 1, x: 68, y: 70 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 30, y: 78 }
  ],
  'T': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 75, y: 15 },
    { stroke: 2, x: 50, y: 15 }, { stroke: 2, x: 50, y: 47 }, { stroke: 2, x: 50, y: 80 }
  ],
  'U': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 25, y: 50 }, { stroke: 1, x: 30, y: 70 }, { stroke: 1, x: 50, y: 82 }, { stroke: 1, x: 70, y: 70 }, { stroke: 1, x: 75, y: 50 }, { stroke: 1, x: 75, y: 15 }
  ],
  'V': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 38, y: 47 }, { stroke: 1, x: 50, y: 80 },
    { stroke: 2, x: 50, y: 80 }, { stroke: 2, x: 62, y: 47 }, { stroke: 2, x: 75, y: 15 }
  ],
  'W': [
    { stroke: 1, x: 18, y: 15 }, { stroke: 1, x: 28, y: 80 },
    { stroke: 2, x: 28, y: 80 }, { stroke: 2, x: 42, y: 35 },
    { stroke: 3, x: 42, y: 35 }, { stroke: 3, x: 58, y: 80 },
    { stroke: 4, x: 58, y: 80 }, { stroke: 4, x: 72, y: 15 }
  ],
  'X': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 50, y: 47 }, { stroke: 1, x: 75, y: 80 },
    { stroke: 2, x: 75, y: 15 }, { stroke: 2, x: 50, y: 47 }, { stroke: 2, x: 25, y: 80 }
  ],
  'Y': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 50, y: 45 },
    { stroke: 2, x: 75, y: 15 }, { stroke: 2, x: 50, y: 45 },
    { stroke: 3, x: 50, y: 45 }, { stroke: 3, x: 50, y: 80 }
  ],
  'Z': [
    { stroke: 1, x: 25, y: 15 }, { stroke: 1, x: 50, y: 15 }, { stroke: 1, x: 75, y: 15 },
    { stroke: 2, x: 75, y: 15 }, { stroke: 2, x: 50, y: 47 }, { stroke: 2, x: 25, y: 80 },
    { stroke: 3, x: 25, y: 80 }, { stroke: 3, x: 50, y: 80 }, { stroke: 3, x: 75, y: 80 }
  ]
};

// Cache references to the DOM elements
const dom = {
  container: document.getElementById('app-container'),
  homeScreen: document.getElementById('home-screen'),
  dashboardScreen: document.getElementById('dashboard-screen'),
  traceScreen: document.getElementById('trace-screen'),
  matchScreen: document.getElementById('match-screen'),
  gameScreen: document.getElementById('game-screen'),
  rewardScreen: document.getElementById('reward-screen'),
  lettersGrid: document.getElementById('letters-grid'),
  
  dashboardBackBtn: document.getElementById('dashboard-back-btn'),
  dashboardLetterDisplay: document.getElementById('dashboard-letter-display'),
  dashboardWordDisplay: document.getElementById('dashboard-word-display'),
  dashboardLetterImage: document.getElementById('dashboard-letter-image'),
  dashboardVoiceBtn: document.getElementById('dashboard-voice-btn'),
  
  cardTrace: document.getElementById('card-trace'),
  cardMatch: document.getElementById('card-match'),
  cardPop: document.getElementById('card-pop'),
  
  starTrace: document.getElementById('star-trace'),
  starMatch: document.getElementById('star-match'),
  starPop: document.getElementById('star-pop'),
  
  traceBackBtn: document.getElementById('trace-back-btn'),
  traceTargetLetter: document.getElementById('trace-target-letter'),
  traceClearBtn: document.getElementById('trace-clear-btn'),
  traceGuideBtn: document.getElementById('trace-guide-btn'),
  traceCanvas: document.getElementById('trace-canvas'),
  bippyTraceSpeech: document.getElementById('bippy-trace-speech'),
  
  matchBackBtn: document.getElementById('match-back-btn'),
  matchTargetSound: document.getElementById('match-target-sound'),
  matchCardsContainer: document.getElementById('match-cards-container'),
  bippyMatchSpeech: document.getElementById('bippy-match-speech'),
  
  gameBackBtn: document.getElementById('game-back-btn'),
  gameTargetLetter: document.getElementById('game-target-letter'),
  gameScore: document.getElementById('game-score'),
  gameBanner: document.getElementById('game-banner'),
  bannerTarget: document.getElementById('banner-target'),
  bubbleStage: document.getElementById('bubble-stage'),
  audioToggle: document.getElementById('audio-toggle'),
  
  rewardMessage: document.getElementById('reward-message'),
  replayBtn: document.getElementById('replay-btn'),
  nextLetterBtn: document.getElementById('next-letter-btn'),
  rewardHomeBtn: document.getElementById('reward-home-btn'),
  confettiCanvas: document.getElementById('confetti-canvas'),
  
  rewardStar1: document.getElementById('reward-star-1'),
  rewardStar2: document.getElementById('reward-star-2'),
  rewardStar3: document.getElementById('reward-star-3'),
  certificateLetter: document.getElementById('certificate-letter'),
  certificateNameInput: document.getElementById('certificate-name-input')
};

// Global state variables
let userProgress = {};
let currentLetterObj = null;
let currentScore = 0;
const WINNING_SCORE = 10;
let gameActive = false;
let bubblesList = [];
let spawnIntervalId = null;
let physicsFrameId = null;
let soundEnabled = true;

// Tracing specific state
let isDrawing = false;
let traceCtx = null;
let activeTraceLetter = '';
let activeGuideDots = [];
let currentDrawnStrokes = []; // Array of arrays of coordinates
let showGuideDotsState = true;

// Match Game specific state
let matchGameActive = false;
let matchTargetWord = '';
let matchTargetLetter = '';

// Special bubble effects
let activeRainbowHighlight = false;
let rainbowHighlightTimer = null;

// Mouth animation timer
let mouthTimer = null;
let speakingUtterance = null;

// Greetings lists
const bippyGreetings = [
  "Hi! I'm Bippy! Let's learn letters together! 🌟",
  "Welcome back! Which letter should we learn today? 🎈",
  "Learning is fun! Click a letter to explore! 🥳",
  "Let's play and write letters! Pick one! ✏️"
];

// ==========================================================================
// WEB AUDIO SYNTHESIS SYSTEM
// ==========================================================================
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.09);

    // Cute layer
    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    
    chimeOsc.type = 'triangle';
    chimeOsc.frequency.setValueAtTime(1400, now);
    
    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
    chimeGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);
    
    chimeOsc.start(now);
    chimeOsc.stop(now + 0.16);
  }

  playBoing() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.35);
    
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(18, now);
    vibratoGain.gain.setValueAtTime(25, now);
    
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    vibrato.start(now);
    osc.start(now);
    
    vibrato.stop(now + 0.36);
    osc.stop(now + 0.36);
  }

  playHover() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playFanfare() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    const noteDuration = 0.12;
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (idx * noteDuration);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      const duration = (idx === notes.length - 1) ? 0.6 : 0.25;
      
      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.18, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, noteTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + duration + 0.05);
    });
  }

  playDotChime() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    const freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    const randNote = freqs[Math.floor(Math.random() * freqs.length)];
    
    osc.frequency.setValueAtTime(randNote, now);
    osc.frequency.exponentialRampToValueAtTime(randNote * 1.5, now + 0.12);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playBippyGiggle() {
    if (!soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const times = [0, 0.08, 0.16, 0.24];
    times.forEach(t => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now + t);
      osc.frequency.exponentialRampToValueAtTime(1450, now + t + 0.06);
      
      gain.gain.setValueAtTime(0.001, now + t);
      gain.gain.exponentialRampToValueAtTime(0.12, now + t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.06);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + t);
      osc.stop(now + t + 0.07);
    });
  }
}

const sounds = new SoundSynth();

// ==========================================================================
// UNIFIED STATE AND STAR PROGRESS MANAGER
// ==========================================================================
function initProgress() {
  const stored = localStorage.getItem('kidsAlphabetHubProgress');
  userProgress = {};
  if (stored) {
    try {
      userProgress = JSON.parse(stored) || {};
    } catch (e) {
      console.error("Failed to parse progress, resetting:", e);
      userProgress = {};
    }
  }
  
  alphabetData.forEach(item => {
    if (!userProgress[item.letter]) {
      userProgress[item.letter] = {
        traceStar: false,
        matchStar: false,
        popStar: false
      };
    }
  });
  
  saveProgress();
}

function saveProgress() {
  localStorage.setItem('kidsAlphabetHubProgress', JSON.stringify(userProgress));
}

function getLetterStars(letter) {
  return userProgress[letter] || { traceStar: false, matchStar: false, popStar: false };
}

function awardStar(letter, gameType) {
  if (userProgress[letter]) {
    userProgress[letter][gameType] = true;
    saveProgress();
    updateDashboardStars();
    renderHomeGrid();
  }
}

// ==========================================================================
// BIPPY MASCOT SPEAKING & MOUTH SYNCHRONIZATION
// ==========================================================================
function startMouthAnimation() {
  if (mouthTimer) return;
  let frame = 0;
  mouthTimer = setInterval(() => {
    const mouthElements = document.querySelectorAll('.bippy-mascot.talking .bippy-mouth');
    mouthElements.forEach(mouth => {
      if (frame % 2 === 0) {
        mouth.setAttribute('d', 'M 44 54 Q 50 66 56 54'); // Open mouth path
      } else {
        mouth.setAttribute('d', 'M 44 54 Q 50 60 56 54'); // Closed mouth smiling
      }
    });
    frame++;
  }, 140);
}

function stopMouthAnimation() {
  clearInterval(mouthTimer);
  mouthTimer = null;
  // Reset all mouths to closed
  const mouthElements = document.querySelectorAll('.bippy-mouth');
  mouthElements.forEach(mouth => {
    mouth.setAttribute('d', 'M 44 54 Q 50 60 56 54');
  });
}

function bippySpeak(text, onEndCallback) {
  if (!('speechSynthesis' in window)) {
    if (onEndCallback) onEndCallback();
    return;
  }
  
  window.speechSynthesis.cancel();
  
  // Set all Bippys to talking
  document.querySelectorAll('.bippy-mascot').forEach(b => b.classList.add('talking'));
  startMouthAnimation();
  
  speakingUtterance = new SpeechSynthesisUtterance(text);
  
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                       voices.find(v => v.lang.startsWith('en')) || 
                       voices[0];
                       
  if (englishVoice) {
    speakingUtterance.voice = englishVoice;
  }
  
  speakingUtterance.pitch = 1.35; // Playful voice pitch
  speakingUtterance.rate = 0.92;   // Slightly slower pacing
  
  speakingUtterance.onend = () => {
    document.querySelectorAll('.bippy-mascot').forEach(b => b.classList.remove('talking'));
    stopMouthAnimation();
    if (onEndCallback) onEndCallback();
  };
  
  speakingUtterance.onerror = () => {
    document.querySelectorAll('.bippy-mascot').forEach(b => b.classList.remove('talking'));
    stopMouthAnimation();
    if (onEndCallback) onEndCallback();
  };
  
  window.speechSynthesis.speak(speakingUtterance);
}

function stopBippySpeaking() {
  if (speakingUtterance) {
    speakingUtterance.onend = null;
    speakingUtterance.onerror = null;
    speakingUtterance = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  document.querySelectorAll('.bippy-mascot').forEach(b => b.classList.remove('talking'));
  stopMouthAnimation();
}

// ==========================================================================
// SCREEN NAVIGATION & INTERACTION
// ==========================================================================
function showScreen(screenElement) {
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });
  
  screenElement.classList.add('active');
  
  if (screenElement === dom.homeScreen) {
    stopGameEngine();
    document.documentElement.style.setProperty('--theme-hue', '200');
  }
}

function showHomeScreen() {
  stopGameEngine();
  stopBippySpeaking();
  showScreen(dom.homeScreen);
  
  const greeting = bippyGreetings[Math.floor(Math.random() * bippyGreetings.length)];
  document.getElementById('bippy-home-speech').textContent = greeting;
  
  bippySpeak(greeting);
}

function showDashboardScreen(item) {
  currentLetterObj = item;
  stopBippySpeaking();
  
  const isZ = item.letter === 'Z';
  document.documentElement.style.setProperty('--theme-hue', item.hue);
  if (isZ) {
    document.documentElement.style.setProperty('--theme-color-main', 'hsl(0, 0%, 50%)');
    document.documentElement.style.setProperty('--theme-color-dark', 'hsl(0, 0%, 25%)');
    document.documentElement.style.setProperty('--theme-color-light', 'hsl(0, 0%, 80%)');
    document.documentElement.style.setProperty('--theme-color-bg', 'hsl(0, 0%, 96%)');
  } else {
    document.documentElement.style.setProperty('--theme-color-main', `hsl(${item.hue}, 85%, 62%)`);
    document.documentElement.style.setProperty('--theme-color-dark', `hsl(${item.hue}, 80%, 45%)`);
    document.documentElement.style.setProperty('--theme-color-light', `hsl(${item.hue}, 90%, 82%)`);
    document.documentElement.style.setProperty('--theme-color-bg', `hsl(${item.hue}, 85%, 96%)`);
  }
  
  dom.dashboardLetterDisplay.textContent = `${item.letter}${item.letter.toLowerCase()}`;
  dom.dashboardWordDisplay.textContent = item.word.replace('_', ' ');
  
  const letterLower = item.letter.toLowerCase();
  const format = item.format || "png";
  const word = format === "svg" ? (svgWordMapping[item.letter] || item.word) : item.word;
  dom.dashboardLetterImage.src = `assets/images/${letterLower}_${word}.${format}`;
  dom.dashboardLetterImage.onerror = null;
  dom.dashboardLetterImage.alt = item.word.replace('_', ' ');
  
  updateDashboardStars();
  showScreen(dom.dashboardScreen);
  
  // Dashboard welcome prompt
  const phond = phonicsDictionary[item.letter] || `${item.letter} says ${item.word}`;
  const dashWelcome = `Let's learn the letter ${item.letter}! ${item.letter} says ${phond.split(' says ')[0]}, as in ${item.word.replace('_', ' ')}!`;
  document.getElementById('bippy-dashboard-speech').textContent = dashWelcome;
  
  setTimeout(() => {
    bippySpeak(dashWelcome);
  }, 400);
}

function updateDashboardStars() {
  if (!currentLetterObj) return;
  const stars = getLetterStars(currentLetterObj.letter);
  
  if (stars.traceStar) {
    dom.cardTrace.classList.add('completed');
    dom.starTrace.textContent = '⭐';
  } else {
    dom.cardTrace.classList.remove('completed');
    dom.starTrace.textContent = '☆';
  }
  
  if (stars.matchStar) {
    dom.cardMatch.classList.add('completed');
    dom.starMatch.textContent = '⭐';
  } else {
    dom.cardMatch.classList.remove('completed');
    dom.starMatch.textContent = '☆';
  }
  
  if (stars.popStar) {
    dom.cardPop.classList.add('completed');
    dom.starPop.textContent = '⭐';
  } else {
    dom.cardPop.classList.remove('completed');
    dom.starPop.textContent = '☆';
  }
}

// Render grid for Home screen
function renderHomeGrid() {
  dom.lettersGrid.innerHTML = '';
  
  alphabetData.forEach(item => {
    const block = document.createElement('div');
    block.className = 'letter-block';
    block.setAttribute('role', 'button');
    block.setAttribute('tabindex', '0');
    block.setAttribute('aria-label', `Learn letter ${item.letter}`);
    
    const isZ = item.letter === 'Z';
    const sat = isZ ? '0%' : '85%';
    const litBg = isZ ? '93%' : '94%';
    const litBdr = isZ ? '75%' : '80%';
    const litText = isZ ? '15%' : '45%';
    
    block.style.setProperty('--letter-bg', `hsl(${item.hue}, ${sat}, ${litBg})`);
    block.style.setProperty('--letter-border', `hsl(${item.hue}, ${sat}, ${litBdr})`);
    block.style.setProperty('--letter-shadow', `hsla(${item.hue}, ${sat}, 20%, 0.15)`);
    block.style.setProperty('--letter-color', `hsl(${item.hue}, ${sat}, ${litText})`);
    block.style.setProperty('--letter-color-dark', `hsl(${item.hue}, ${sat}, 35%)`);
    
    const stars = getLetterStars(item.letter);
    let starsHtml = '';
    if (stars.traceStar || stars.matchStar || stars.popStar) {
      starsHtml = `<div class="block-stars" aria-hidden="true">
        <span style="opacity: ${stars.traceStar ? 1 : 0.25};">${stars.traceStar ? '🥉' : '🥉'}</span>
        <span style="opacity: ${stars.matchStar ? 1 : 0.25};">${stars.matchStar ? '🥈' : '🥈'}</span>
        <span style="opacity: ${stars.popStar ? 1 : 0.25};">${stars.popStar ? '🥇' : '🥇'}</span>
      </div>`;
    }
    
    block.innerHTML = `
      <span class="char-big" aria-hidden="true">${item.letter}${item.letter.toLowerCase()}</span>
      <span class="assoc-word" aria-hidden="true">${item.word.replace('_', ' ')}</span>
      ${starsHtml}
    `;
    
    block.addEventListener('mouseenter', () => {
      sounds.playHover();
    });
    
    block.addEventListener('click', () => {
      showDashboardScreen(item);
    });
    
    block.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showDashboardScreen(item);
      }
    });
    
    dom.lettersGrid.appendChild(block);
  });
}

// ==========================================================================
// TRACING CANVAS ENGINE
// ==========================================================================
function startTraceGame() {
  if (!currentLetterObj) return;
  
  activeTraceLetter = currentLetterObj.letter;
  activeGuideDots = (letterGuideDots[activeTraceLetter] || []).map(d => ({ ...d, visited: false }));
  
  currentDrawnStrokes = [];
  isDrawing = false;
  
  // Update screen text
  dom.traceTargetLetter.textContent = `${activeTraceLetter}${activeTraceLetter.toLowerCase()}`;
  
  showScreen(dom.traceScreen);
  
  // Resize canvas
  setTimeout(() => {
    const parent = dom.traceCanvas.parentElement;
    dom.traceCanvas.width = parent.clientWidth * window.devicePixelRatio;
    dom.traceCanvas.height = parent.clientHeight * window.devicePixelRatio;
    
    traceCtx = dom.traceCanvas.getContext('2d');
    traceCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    drawTraceCanvas();
    
    const instructions = `Trace the letter ${activeTraceLetter}! Follow the number dots with your brush!`;
    dom.bippyTraceSpeech.textContent = instructions;
    bippySpeak(instructions);
  }, 100);
}

function drawTraceCanvas() {
  if (!dom.traceCanvas || !traceCtx) return;
  
  const w = dom.traceCanvas.width / window.devicePixelRatio;
  const h = dom.traceCanvas.height / window.devicePixelRatio;
  
  traceCtx.clearRect(0, 0, w, h);
  
  // 1. Draw target letter as big light-gray background overlay
  traceCtx.font = `bold ${h * 0.72}px Fredoka`;
  traceCtx.fillStyle = '#f1f2f6';
  traceCtx.textAlign = 'center';
  traceCtx.textBaseline = 'middle';
  traceCtx.fillText(activeTraceLetter, w / 2, h / 2);
  
  // 2. Draw guide dots
  if (showGuideDotsState) {
    activeGuideDots.forEach(dot => {
      const dx = (dot.x / 100) * w;
      const dy = (dot.y / 100) * h;
      
      traceCtx.beginPath();
      traceCtx.arc(dx, dy, 14, 0, Math.PI * 2);
      
      if (dot.visited) {
        traceCtx.fillStyle = '#2ecc71';
        traceCtx.strokeStyle = '#27ae60';
      } else {
        const colors = ['#74b9ff', '#a29bfe', '#ff7675', '#ffeaa7'];
        traceCtx.fillStyle = colors[(dot.stroke - 1) % colors.length];
        traceCtx.strokeStyle = 'rgba(0,0,0,0.15)';
      }
      
      traceCtx.lineWidth = 3;
      traceCtx.fill();
      traceCtx.stroke();
      
      traceCtx.font = 'bold 12px Fredoka';
      traceCtx.fillStyle = dot.visited ? '#fff' : '#2d3436';
      traceCtx.textAlign = 'center';
      traceCtx.textBaseline = 'middle';
      traceCtx.fillText(dot.visited ? '✓' : dot.stroke, dx, dy);
    });
  }
  
  // 3. Draw user brush strokes
  traceCtx.lineCap = 'round';
  traceCtx.lineJoin = 'round';
  
  currentDrawnStrokes.forEach((pts, idx) => {
    if (pts.length < 1) return;
    
    const colors = ['#ff7675', '#fd79a8', '#ffeaa7', '#55efc4', '#74b9ff', '#a29bfe'];
    traceCtx.strokeStyle = colors[idx % colors.length];
    traceCtx.lineWidth = 14;
    
    traceCtx.beginPath();
    if (pts.length === 1) {
      const x = (pts[0].x / 100) * w;
      const y = (pts[0].y / 100) * h;
      traceCtx.arc(x, y, 7, 0, Math.PI * 2);
      traceCtx.fillStyle = traceCtx.strokeStyle;
      traceCtx.fill();
    } else if (pts.length === 2) {
      const startX = (pts[0].x / 100) * w;
      const startY = (pts[0].y / 100) * h;
      const endX = (pts[1].x / 100) * w;
      const endY = (pts[1].y / 100) * h;
      traceCtx.moveTo(startX, startY);
      traceCtx.lineTo(endX, endY);
      traceCtx.stroke();
    } else {
      const startX = (pts[0].x / 100) * w;
      const startY = (pts[0].y / 100) * h;
      traceCtx.moveTo(startX, startY);
      
      let i;
      for (i = 1; i < pts.length - 1; i++) {
        const xc = ((pts[i].x + pts[i + 1].x) / 2 / 100) * w;
        const yc = ((pts[i].y + pts[i + 1].y) / 2 / 100) * h;
        const x = (pts[i].x / 100) * w;
        const y = (pts[i].y / 100) * h;
        traceCtx.quadraticCurveTo(x, y, xc, yc);
      }
      
      const lastX = (pts[i].x / 100) * w;
      const lastY = (pts[i].y / 100) * h;
      traceCtx.lineTo(lastX, lastY);
      traceCtx.stroke();
    }
  });
}

function getPointerCoords(e) {
  const rect = dom.traceCanvas.getBoundingClientRect();
  let cx, cy;
  if (e.touches && e.touches.length > 0) {
    cx = e.touches[0].clientX;
    cy = e.touches[0].clientY;
  } else {
    cx = e.clientX;
    cy = e.clientY;
  }
  
  // Normalize raw coordinates to percentage values (0 - 100)
  const rawX = cx - rect.left;
  const rawY = cy - rect.top;
  return {
    x: (rawX / rect.width) * 100,
    y: (rawY / rect.height) * 100
  };
}

function handlePointerDown(e) {
  isDrawing = true;
  const coords = getPointerCoords(e);
  currentDrawnStrokes.push([coords]);
  checkDotProximityBetween(coords, coords);
  drawTraceCanvas();
}

function handlePointerMove(e) {
  if (!isDrawing) return;
  const coords = getPointerCoords(e);
  
  const cur = currentDrawnStrokes[currentDrawnStrokes.length - 1];
  const prev = cur[cur.length - 1];
  cur.push(coords);
  
  checkDotProximityBetween(prev, coords);
  drawTraceCanvas();
}

function handlePointerUp() {
  isDrawing = false;
}

function checkDotProximityBetween(p1, p2) {
  const threshold = 8.5; // percentage distance threshold
  let playChime = false;
  
  // Interpolate proximity checks along the line segment between p1 and p2
  const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  const steps = Math.max(1, Math.floor(dist / 2)); 
  
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const pt = {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    };
    
    activeGuideDots.forEach(dot => {
      if (dot.visited) return;
      const d = Math.sqrt((pt.x - dot.x) ** 2 + (pt.y - dot.y) ** 2);
      if (d < threshold) {
        dot.visited = true;
        playChime = true;
      }
    });
  }
  
  if (playChime) {
    sounds.playDotChime();
    
    const completedAll = activeGuideDots.every(d => d.visited);
    if (completedAll) {
      isDrawing = false;
      awardStar(activeTraceLetter, 'traceStar');
      
      document.querySelectorAll('.bippy-mascot').forEach(b => {
        b.classList.add('spin-jump');
        setTimeout(() => b.classList.remove('spin-jump'), 800);
      });
      
      setTimeout(() => {
        sounds.playFanfare();
        bippySpeak("Amazing! You traced it perfectly! 🌟", () => {
          triggerWin();
        });
      }, 400);
    }
  }
}

// ==========================================================================
// SOUND DETECTIVE MATCHING GAME
// ==========================================================================
function startMatchGame() {
  if (!currentLetterObj) return;
  
  matchGameActive = true;
  matchTargetLetter = currentLetterObj.letter;
  matchTargetWord = currentLetterObj.word.replace('_', ' ');
  
  dom.matchCardsContainer.innerHTML = '';
  dom.matchTargetSound.textContent = `/${matchTargetLetter.toLowerCase()}/`;
  
  // Gather 2 random distractors
  let distractors = [];
  while (distractors.length < 2) {
    const idx = Math.floor(Math.random() * alphabetData.length);
    const item = alphabetData[idx];
    if (item.letter !== matchTargetLetter && !distractors.includes(item)) {
      distractors.push(item);
    }
  }
  
  const cardsData = [currentLetterObj, ...distractors];
  cardsData.sort(() => Math.random() - 0.5);
  
  cardsData.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-perspective';
    
    const innerEl = document.createElement('div');
    innerEl.className = 'card-inner';
    innerEl.dataset.letter = item.letter;
    
    // Front face
    const front = document.createElement('div');
    front.className = 'card-front';
    front.innerHTML = `
      <div class="card-front-content">🎈</div>
      <p style="font-size: 1.6rem; font-weight:800; color:#bdc3c7;">?</p>
    `;
    
    // Back face
    const back = document.createElement('div');
    back.className = 'card-back';
    
    const isZ = item.letter === 'Z';
    const sat = isZ ? '0%' : '85%';
    back.style.setProperty('--theme-color-main', `hsl(${item.hue}, ${sat}, 62%)`);
    back.style.setProperty('--theme-color-bg', `hsl(${item.hue}, ${sat}, 96%)`);
    
    const letterLower = item.letter.toLowerCase();
    const img = document.createElement('img');
    img.className = 'card-back-image';
    const format = item.format || "png";
    const word = format === "svg" ? (svgWordMapping[item.letter] || item.word) : item.word;
    img.src = `assets/images/${letterLower}_${word}.${format}`;
    img.onerror = null;
    img.alt = item.word.replace('_', ' ');
    
    const name = document.createElement('p');
    name.className = 'card-back-name';
    name.textContent = item.word.replace('_', ' ');
    
    back.appendChild(img);
    back.appendChild(name);
    
    innerEl.appendChild(front);
    innerEl.appendChild(back);
    cardEl.appendChild(innerEl);
    
    dom.matchCardsContainer.appendChild(cardEl);
    
    innerEl.addEventListener('click', () => {
      handleMatchCardClick(innerEl, item);
    });
  });
  
  showScreen(dom.matchScreen);
  
  const textPrompt = `Find the picture starting with the sound /${matchTargetLetter.toLowerCase()}/! Can you find the ${matchTargetWord}?`;
  dom.bippyMatchSpeech.textContent = textPrompt;
  bippySpeak(textPrompt);
}

function handleMatchCardClick(innerEl, item) {
  if (!matchGameActive || innerEl.classList.contains('flipped')) return;
  
  innerEl.classList.add('flipped');
  sounds.playHover();
  
  if (item.letter === matchTargetLetter) {
    matchGameActive = false;
    awardStar(matchTargetLetter, 'matchStar');
    
    document.querySelectorAll('.bippy-mascot').forEach(b => {
      b.classList.add('spin-jump');
      setTimeout(() => b.classList.remove('spin-jump'), 800);
    });
    
    setTimeout(() => {
      sounds.playFanfare();
      const victoryText = `Wow! You found the ${matchTargetWord}! Outstanding!`;
      dom.bippyMatchSpeech.textContent = victoryText;
      bippySpeak(victoryText, () => {
        triggerWin();
      });
    }, 800);
  } else {
    matchGameActive = false;
    sounds.playBoing();
    shakeScreen();
    
    const wrongWord = item.word.replace('_', ' ');
    const fallbackText = `That is the ${wrongWord}! Try again to find the ${matchTargetWord}!`;
    dom.bippyMatchSpeech.textContent = fallbackText;
    
    bippySpeak(fallbackText, () => {
      setTimeout(() => {
        innerEl.classList.remove('flipped');
        matchGameActive = true;
      }, 1000);
    });
  }
}

// ==========================================================================
// GAME ENGINE - BUBBLE POP LOGIC (UPGRADED)
// ==========================================================================
function startBubblePopGame() {
  if (!currentLetterObj) return;
  
  currentScore = 0;
  dom.gameScore.textContent = '0';
  dom.gameTargetLetter.textContent = `${currentLetterObj.letter}${currentLetterObj.letter.toLowerCase()}`;
  dom.bannerTarget.textContent = `${currentLetterObj.letter}${currentLetterObj.letter.toLowerCase()}`;
  
  const progressBar = document.getElementById('game-progress-bar');
  if (progressBar) progressBar.style.width = '0%';
  
  dom.bubbleStage.innerHTML = '';
  bubblesList = [];
  activeRainbowHighlight = false;
  clearTimeout(rainbowHighlightTimer);
  
  showScreen(dom.gameScreen);
  gameActive = true;
  
  // Vocal introduction
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const popIntro = `Pop the bubbles with the letter ${currentLetterObj.letter}! Look out for special bubbles!`;
  bippySpeak(popIntro);
  
  spawnIntervalId = setInterval(spawnBubble, 850);
  physicsFrameId = requestAnimationFrame(physicsUpdate);
}

function stopGameEngine() {
  gameActive = false;
  clearInterval(spawnIntervalId);
  cancelAnimationFrame(physicsFrameId);
  bubblesList = [];
  if (dom.bubbleStage) dom.bubbleStage.innerHTML = '';
  activeRainbowHighlight = false;
  clearTimeout(rainbowHighlightTimer);
}

function spawnBubble() {
  if (!gameActive) return;
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  let rand = Math.random();
  let type = 'normal';
  if (rand < 0.05) {
    type = 'star';
  } else if (rand < 0.10) {
    type = 'rainbow';
  } else if (rand < 0.15) {
    type = 'mascot';
  }
  
  let isTarget = false;
  let letterChar = '';
  
  if (type === 'rainbow') {
    bubble.classList.add('rainbow-bubble');
    letterChar = '🌈';
    bubble.innerHTML = `<div class="bubble-inner"><span class="bubble-text">🌈</span></div>`;
  } else if (type === 'mascot') {
    bubble.classList.add('mascot-bubble');
    bubble.innerHTML = `
      <div class="bubble-inner">
        <svg viewBox="0 0 100 100" style="width:75%; height:75%;">
          <circle cx="50" cy="50" r="40" fill="#74b9ff" stroke="#0984e3" stroke-width="4" />
          <ellipse cx="35" cy="45" rx="5" ry="7" fill="#2d3436" />
          <ellipse cx="65" cy="45" rx="5" ry="7" fill="#2d3436" />
          <ellipse cx="25" cy="55" rx="5" ry="3" fill="#ff7675" opacity="0.6" />
          <ellipse cx="75" cy="55" rx="5" ry="3" fill="#ff7675" opacity="0.6" />
          <path d="M 44 54 Q 50 60 56 54" fill="none" stroke="#2d3436" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>
    `;
  } else {
    // Normal or Star
    isTarget = Math.random() < 0.45;
    if (isTarget) {
      letterChar = Math.random() < 0.5 ? currentLetterObj.letter : currentLetterObj.letter.toLowerCase();
    } else {
      let distractorIdx = Math.floor(Math.random() * alphabetData.length);
      while (alphabetData[distractorIdx].letter === currentLetterObj.letter) {
        distractorIdx = Math.floor(Math.random() * alphabetData.length);
      }
      const distItem = alphabetData[distractorIdx];
      letterChar = Math.random() < 0.5 ? distItem.letter : distItem.letter.toLowerCase();
    }
    
    if (type === 'star') {
      bubble.classList.add('star-bubble');
      bubble.innerHTML = `
        <div class="bubble-inner">
          <span class="bubble-text" style="display:flex; flex-direction:column; align-items:center; line-height:1;">
            ⭐️<span style="font-size:0.7em;">${letterChar}</span>
          </span>
        </div>
      `;
    } else {
      bubble.innerHTML = `<div class="bubble-inner"><span class="bubble-text">${letterChar}</span></div>`;
    }
  }
  
  const diameter = Math.floor(Math.random() * 30) + 75;
  bubble.style.width = `${diameter}px`;
  bubble.style.height = `${diameter}px`;
  bubble.style.fontSize = `${diameter * 0.36}px`;
  
  const stageWidth = dom.bubbleStage.clientWidth || window.innerWidth;
  const leftPos = Math.random() * (stageWidth - diameter - 20) + 10;
  bubble.style.left = `${leftPos}px`;
  bubble.style.bottom = `-${diameter}px`;
  
  if (type !== 'rainbow' && type !== 'mascot') {
    let bubbleHue;
    let isZTheme = false;
    if (isTarget) {
      bubbleHue = currentLetterObj.hue;
      isZTheme = currentLetterObj.letter === 'Z';
    } else {
      const matchObj = alphabetData.find(item => item.letter.toUpperCase() === letterChar.toUpperCase());
      bubbleHue = matchObj ? matchObj.hue : Math.floor(Math.random() * 360);
      isZTheme = letterChar.toUpperCase() === 'Z';
    }
    const sat = isZTheme ? '0%' : '85%';
    bubble.style.setProperty('--bubble-color', `hsl(${bubbleHue}, ${sat}, 68%)`);
    bubble.style.setProperty('--bubble-shadow-dark', `hsl(${bubbleHue}, ${sat}, 45%)`);
  }
  
  bubble.style.animationDelay = `${Math.random() * 2}s`;
  
  if (activeRainbowHighlight && isTarget) {
    bubble.classList.add('highlight-target');
  }
  
  dom.bubbleStage.appendChild(bubble);
  
  const bubbleObj = {
    element: bubble,
    x: leftPos,
    y: 0,
    diameter: diameter,
    speed: Math.random() * 1.4 + 1.8,
    isTarget: isTarget,
    letter: letterChar,
    isPopped: false,
    type: type
  };
  
  bubblesList.push(bubbleObj);
  
  bubble.addEventListener('mousedown', (e) => {
    e.preventDefault();
    handleBubbleClick(bubbleObj);
  });
  
  bubble.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleBubbleClick(bubbleObj);
  }, { passive: false });
}

function physicsUpdate() {
  if (!gameActive) return;
  
  const stageHeight = dom.bubbleStage.clientHeight || window.innerHeight;
  
  for (let i = bubblesList.length - 1; i >= 0; i--) {
    const b = bubblesList[i];
    b.y += b.speed;
    b.element.style.transform = `translateY(-${b.y}px)`;
    
    if (b.y > (stageHeight + b.diameter)) {
      b.element.remove();
      bubblesList.splice(i, 1);
    }
  }
  
  physicsFrameId = requestAnimationFrame(physicsUpdate);
}

function handleBubbleClick(bubble) {
  if (!bubble || bubble.isPopped || !gameActive) return;
  bubble.isPopped = true;
  
  if (bubble.type === 'rainbow') {
    sounds.playPop();
    createExplosion(bubble);
    popEffect(bubble.element);
    
    activeRainbowHighlight = true;
    document.querySelectorAll('.bubble').forEach(el => {
      const match = bubblesList.find(b => b.element === el);
      if (match && match.isTarget) {
        el.classList.add('highlight-target');
      }
    });
    
    clearTimeout(rainbowHighlightTimer);
    rainbowHighlightTimer = setTimeout(() => {
      activeRainbowHighlight = false;
      document.querySelectorAll('.bubble').forEach(el => {
        el.classList.remove('highlight-target');
      });
    }, 4000);
    
    removeBubble(bubble);
    bippySpeak("Beautiful! A rainbow bubble! Now the letters are glowing!");
  }
  else if (bubble.type === 'mascot') {
    sounds.playBippyGiggle();
    createExplosion(bubble);
    popEffect(bubble.element);
    
    currentScore += 2;
    updateProgressAndHUD();
    removeBubble(bubble);
    
    bippySpeak("Hehehe! You found Bippy!");
  }
  else if (bubble.type === 'star') {
    sounds.playPop();
    createExplosion(bubble);
    popEffect(bubble.element);
    
    // Pop nearby targets
    const rect = bubble.element.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;
    
    bubblesList.forEach(other => {
      if (other !== bubble && !other.isPopped && other.isTarget) {
        const oRect = other.element.getBoundingClientRect();
        const ox = oRect.left + oRect.width / 2;
        const oy = oRect.top + oRect.height / 2;
        const dist = Math.sqrt((bx - ox) ** 2 + (by - oy) ** 2);
        
        if (dist < 180) {
          other.isPopped = true;
          currentScore++;
          createExplosion(other);
          popEffect(other.element);
          setTimeout(() => {
            other.element.remove();
          }, 80);
        }
      }
    });
    
    currentScore++;
    updateProgressAndHUD();
    removeBubble(bubble);
  }
  else {
    // Normal bubble
    if (bubble.isTarget) {
      currentScore++;
      updateProgressAndHUD();
      sounds.playPop();
      createExplosion(bubble);
      popEffect(bubble.element);
      removeBubble(bubble);
    } else {
      sounds.playBoing();
      shakeScreen();
      
      if (currentScore > 0) {
        currentScore--;
        updateProgressAndHUD();
      }
      
      bubble.element.classList.add('screen-shake');
      bubble.element.style.border = '4px solid #ff7675';
      
      setTimeout(() => {
        if (bubble.element) {
          bubble.element.classList.remove('screen-shake');
          bubble.element.style.border = '1.5px solid rgba(255, 255, 255, 0.45)';
          bubble.isPopped = false;
        }
      }, 400);
    }
  }
}

function popEffect(el) {
  el.style.transform += ' scale(1.3)';
  el.style.opacity = '0';
  el.style.transition = 'all 0.08s ease-out';
  setTimeout(() => {
    el.remove();
  }, 80);
}

function removeBubble(b) {
  const idx = bubblesList.indexOf(b);
  if (idx > -1) bubblesList.splice(idx, 1);
}

function updateProgressAndHUD() {
  dom.gameScore.textContent = currentScore;
  const progressPercent = Math.min(100, (currentScore / WINNING_SCORE) * 100);
  const progressBar = document.getElementById('game-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }
  
  if (currentScore >= WINNING_SCORE) {
    awardStar(currentLetterObj.letter, 'popStar');
    
    document.querySelectorAll('.bippy-mascot').forEach(b => {
      b.classList.add('spin-jump');
      setTimeout(() => b.classList.remove('spin-jump'), 800);
    });
    
    setTimeout(() => {
      triggerWin();
    }, 600);
  }
}

function createExplosion(bubble) {
  const stageHeight = dom.bubbleStage.clientHeight;
  const bubbleRect = bubble.element.getBoundingClientRect();
  const stageRect = dom.bubbleStage.getBoundingClientRect();
  
  const posX = bubbleRect.left - stageRect.left + (bubble.diameter / 2);
  const posY = stageHeight - (bubbleRect.top - stageRect.top + (bubble.diameter / 2));
  
  const particleCount = 12;
  const isZ = currentLetterObj.letter === 'Z';
  const colorHue = currentLetterObj.hue;
  
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    
    const pSize = Math.floor(Math.random() * 8) + 8;
    p.style.width = `${pSize}px`;
    p.style.height = `${pSize}px`;
    
    const sat = isZ ? '0%' : '85%';
    p.style.backgroundColor = `hsl(${colorHue}, ${sat}, ${Math.floor(Math.random() * 20) + 65}%)`;
    
    p.style.left = `${posX - (pSize / 2)}px`;
    p.style.bottom = `${posY - (pSize / 2)}px`;
    
    const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.4 - 0.2);
    const distance = Math.floor(Math.random() * 50) + 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    
    dom.bubbleStage.appendChild(p);
    
    setTimeout(() => p.remove(), 600);
  }
}

function shakeScreen() {
  dom.container.classList.add('screen-shake');
  setTimeout(() => dom.container.classList.remove('screen-shake'), 400);
}

// ==========================================================================
// CONFETTI EFFECT & REWARD SCREEN
// ==========================================================================
let confettiActive = false;
let confettiParticles = [];
let confettiCtx = null;

function triggerWin() {
  stopGameEngine();
  stopBippySpeaking();
  sounds.playFanfare();
  
  const stars = getLetterStars(currentLetterObj.letter);
  
  // Set certificate and stars progress
  dom.rewardStar1.textContent = stars.traceStar ? '⭐' : '☆';
  dom.rewardStar2.textContent = stars.matchStar ? '⭐' : '☆';
  dom.rewardStar3.textContent = stars.popStar ? '⭐' : '☆';
  
  dom.certificateLetter.textContent = `${currentLetterObj.letter}${currentLetterObj.letter.toLowerCase()}`;
  
  let activeStarCount = 0;
  if (stars.traceStar) activeStarCount++;
  if (stars.matchStar) activeStarCount++;
  if (stars.popStar) activeStarCount++;
  
  let cheerMessage = '';
  if (activeStarCount === 1) {
    cheerMessage = `You earned your first star for letter ${currentLetterObj.letter}! Play more games to master it!`;
  } else if (activeStarCount === 2) {
    cheerMessage = `Two stars for letter ${currentLetterObj.letter}! You're almost there!`;
  } else if (activeStarCount === 3) {
    cheerMessage = `Superstar! You fully mastered letter ${currentLetterObj.letter}! 🏆`;
  } else {
    cheerMessage = `Hooray! You did it!`;
  }
  
  dom.rewardMessage.textContent = cheerMessage;
  
  showScreen(dom.rewardScreen);
  startConfetti();
  
  setTimeout(() => {
    bippySpeak(cheerMessage);
  }, 500);
}

function startConfetti() {
  confettiActive = true;
  const canvas = dom.confettiCanvas;
  confettiCtx = canvas.getContext('2d');
  
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  
  confettiParticles = [];
  const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];
  
  for (let i = 0; i < 80; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 6 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }
  
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  if (!confettiActive) return;
  
  const canvas = dom.confettiCanvas;
  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  let falling = false;
  confettiParticles.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotSpeed;
    
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rotation * Math.PI / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    confettiCtx.restore();
    
    if (p.y < canvas.height) falling = true;
  });
  
  if (falling) {
    requestAnimationFrame(updateConfetti);
  } else {
    confettiActive = false;
  }
}

function stopConfetti() {
  confettiActive = false;
  if (confettiCtx) {
    confettiCtx.clearRect(0, 0, dom.confettiCanvas.width, dom.confettiCanvas.height);
  }
}

function loadNextLetter() {
  stopConfetti();
  const currentIdx = alphabetData.findIndex(item => item.letter === currentLetterObj.letter);
  const nextIdx = (currentIdx + 1) % alphabetData.length;
  showDashboardScreen(alphabetData[nextIdx]);
}

function toggleAudio() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    dom.audioToggle.textContent = '🔊';
    dom.audioToggle.style.backgroundColor = '#ffffff';
    dom.audioToggle.style.borderColor = '#b2bec3';
    dom.audioToggle.setAttribute('aria-label', 'Mute sound');
    dom.audioToggle.setAttribute('aria-pressed', 'false');
  } else {
    dom.audioToggle.textContent = '🔇';
    dom.audioToggle.style.backgroundColor = '#ffeaa7';
    dom.audioToggle.style.borderColor = '#e67e22';
    dom.audioToggle.setAttribute('aria-label', 'Unmute sound');
    dom.audioToggle.setAttribute('aria-pressed', 'true');
  }
}

// ==========================================================================
// INTERACTIVE EVENT BINDINGS & INIT
// ==========================================================================
function initApp() {
  // Load local storage progress
  initProgress();
  
  // Render letters grid
  renderHomeScreen();
  
  // Dashboard routing
  dom.dashboardBackBtn.addEventListener('click', () => {
    showHomeScreen();
  });
  
  dom.dashboardVoiceBtn.addEventListener('click', () => {
    const isZ = currentLetterObj.letter === 'Z';
    const cleanWord = currentLetterObj.word.replace('_', ' ');
    bippySpeak(`${currentLetterObj.letter} is for ${cleanWord}!`);
  });
  
  dom.cardTrace.addEventListener('click', () => {
    startTraceGame();
  });
  dom.cardTrace.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startTraceGame();
    }
  });
  
  dom.cardMatch.addEventListener('click', () => {
    startMatchGame();
  });
  dom.cardMatch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startMatchGame();
    }
  });
  
  dom.cardPop.addEventListener('click', () => {
    startBubblePopGame();
  });
  dom.cardPop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startBubblePopGame();
    }
  });
  
  // Trace listeners
  dom.traceCanvas.addEventListener('mousedown', handlePointerDown);
  dom.traceCanvas.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);
  
  dom.traceCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handlePointerDown(e);
  }, { passive: false });
  
  dom.traceCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handlePointerMove(e);
  }, { passive: false });
  
  window.addEventListener('touchend', handlePointerUp);
  
  dom.traceClearBtn.addEventListener('click', () => {
    currentDrawnStrokes = [];
    activeGuideDots.forEach(d => d.visited = false);
    drawTraceCanvas();
    sounds.playHover();
  });
  
  dom.traceGuideBtn.addEventListener('click', () => {
    showGuideDotsState = !showGuideDotsState;
    dom.traceGuideBtn.textContent = `Dots: ${showGuideDotsState ? 'On' : 'Off'}`;
    drawTraceCanvas();
    sounds.playHover();
  });
  
  dom.traceBackBtn.addEventListener('click', () => {
    stopBippySpeaking();
    showDashboardScreen(currentLetterObj);
  });
  
  window.addEventListener('resize', () => {
    if (dom.traceScreen.classList.contains('active')) {
      const parent = dom.traceCanvas.parentElement;
      dom.traceCanvas.width = parent.clientWidth * window.devicePixelRatio;
      dom.traceCanvas.height = parent.clientHeight * window.devicePixelRatio;
      traceCtx = dom.traceCanvas.getContext('2d');
      traceCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawTraceCanvas();
    }
  });
  
  // Match Game Back button
  dom.matchBackBtn.addEventListener('click', () => {
    stopBippySpeaking();
    showDashboardScreen(currentLetterObj);
  });
  
  // Bubble Pop listeners
  dom.gameBackBtn.addEventListener('click', () => {
    stopGameEngine();
    stopBippySpeaking();
    showDashboardScreen(currentLetterObj);
  });
  
  dom.audioToggle.addEventListener('click', () => {
    toggleAudio();
  });
  
  // Reward screen buttons
  dom.replayBtn.addEventListener('click', () => {
    stopConfetti();
    startBubblePopGame();
  });
  
  dom.nextLetterBtn.addEventListener('click', () => {
    loadNextLetter();
  });
  
  dom.rewardHomeBtn.addEventListener('click', () => {
    stopConfetti();
    showHomeScreen();
  });
  
  // Autoplay AudioContext helper
  document.body.addEventListener('click', () => {
    sounds.init();
  }, { once: true });

  // Reset Progress Button Listener
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sounds.playHover();
      if (confirm("Are you sure you want to reset all your progress? 🗑️")) {
        localStorage.removeItem('kidsAlphabetHubProgress');
        initProgress();
        renderHomeGrid();
        const greeting = "Progress reset! Let's start a fresh new adventure! 🌟";
        document.getElementById('bippy-home-speech').textContent = greeting;
        bippySpeak(greeting);
      }
    });
  }

  // Restore and persist child's name in certificate
  if (dom.certificateNameInput) {
    dom.certificateNameInput.value = localStorage.getItem('kidsAlphabetHubChildName') || '';
    dom.certificateNameInput.addEventListener('input', () => {
      localStorage.setItem('kidsAlphabetHubChildName', dom.certificateNameInput.value);
    });
  }

  // Mascot voiceover Help buttons
  const dashboardHelpBtn = document.getElementById('dashboard-help-btn');
  if (dashboardHelpBtn) {
    dashboardHelpBtn.addEventListener('click', () => {
      sounds.playHover();
      const item = currentLetterObj;
      if (item) {
        const phond = phonicsDictionary[item.letter] || `${item.letter} says ${item.word}`;
        const dashWelcome = `Let's learn the letter ${item.letter}! ${item.letter} says ${phond.split(' says ')[0]}, as in ${item.word.replace('_', ' ')}!`;
        bippySpeak(dashWelcome);
      }
    });
  }

  const traceHelpBtn = document.getElementById('trace-help-btn');
  if (traceHelpBtn) {
    traceHelpBtn.addEventListener('click', () => {
      sounds.playHover();
      const instructions = `Trace the letter ${activeTraceLetter}! Follow the number dots with your brush!`;
      bippySpeak(instructions);
    });
  }

  const matchHelpBtn = document.getElementById('match-help-btn');
  if (matchHelpBtn) {
    matchHelpBtn.addEventListener('click', () => {
      sounds.playHover();
      const textPrompt = `Find the picture starting with the sound /${matchTargetLetter.toLowerCase()}/! Can you find the ${matchTargetWord}?`;
      bippySpeak(textPrompt);
    });
  }
}

// Register service worker
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.error('Service worker registration failed:', err);
    });
  }
});

window.addEventListener('DOMContentLoaded', initApp);
