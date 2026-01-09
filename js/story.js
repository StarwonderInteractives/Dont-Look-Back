const story = {
  // EPISODE 1 — THE CORRIDOR
  start: {
    text: "You wake up in a dark corridor. The air is thick and stale. A faint whisper echoes from ahead.",
    choices: [
      { text: "Move forward cautiously", next: "chapter2", sanity: -5 },
      { text: "Shout to see if anyone is there", next: "gameOver", sanity: -10 },
      { text: "Stay still and listen", next: "chapter2", sanity: -2 }
    ]
  },

  // EPISODE 2 — THE ROOMS
  chapter2: {
    text: "You enter the first room. Shadows flicker along the walls, dancing with the dim light of a broken lamp.",
    choices: [
      { text: "Investigate the shadows", next: "chapter3", sanity: -10 },
      { text: "Ignore and continue", next: "chapter3", sanity: -5 },
      { text: "Try to find another exit", next: "escapeEnding", sanity: -5 }
    ]
  },

  // EPISODE 3 — THE PRESENCE
  chapter3: {
    text: "A heavy presence is felt. The walls seem to breathe, and a whisper calls your name.",
    choices: [
      { text: "Face the presence", next: "possessedEnding", sanity: -20 },
      { text: "Hide in the shadows", next: "escapeEnding", sanity: -10 },
      { text: "Run back", next: "gameOver", sanity: -15 }
    ]
  },

  // EPISODE 4 — THE TRUTH
  chapter4: {
    text: "You reach a room with mirrors lining the walls. Each reflection shows fragments of your fears. The corridor seems endless, looping behind you.",
    choices: [
      { text: "Step into the mirrors", next: "possessedEnding", sanity: -25 },
      { text: "Turn back", next: "escapeEnding", sanity: -5 },
      { text: "Scream into the void", next: "gameOver", sanity: -15 }
    ]
  },

  // ENDINGS
  gameOver: {
    text: "Your mind fractures. The corridor no longer needs you.",
    choices: []
  },

  escapeEnding: {
    text: "You manage to escape. The corridor fades behind you.",
    choices: []
  },

  possessedEnding: {
    text: "The corridor claims you. You are now part of its shadows.",
    choices: []
  }
};