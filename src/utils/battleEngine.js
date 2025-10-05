// ==================== INCEPTION BATTLE ENGINE ====================


// ========== MOVE DATABASE ==========
export const MOVE_TYPES = {
  // === BASIC ATTACKS (Low Cost) ===
  QUICK_STRIKE: {
    id: 'quick_strike',
    name: 'Quick Strike',
    damage: 0.9,
    energy: 15,
    cooldown: 0,
    accuracy: 95,
    timing: { enabled: true, difficulty: 'easy', window: 1000 },
    description: 'Swift slash with high accuracy',
    type: 'physical',
    color: '#ef4444',
    icon: 'PHYS'
  },
  
  PIERCE: {
    id: 'pierce',
    name: 'Piercing Thrust',
    damage: 1.0,
    energy: 18,
    cooldown: 0,
    accuracy: 92,
    timing: { enabled: true, difficulty: 'easy', window: 950 },
    description: 'Armor-piercing strike',
    type: 'physical',
    color: '#dc2626',
    icon: 'PHYS',
    ignoreDefense: 0.2
  },

  // === MEDIUM ATTACKS (Mid Cost) ===
  POWER_SLASH: {
    id: 'power_slash',
    name: 'Power Slash',
    damage: 1.6,
    energy: 30,
    cooldown: 1,
    accuracy: 85,
    timing: { enabled: true, difficulty: 'medium', window: 800 },
    description: 'Heavy strike dealing massive damage',
    type: 'physical',
    color: '#f97316',
    icon: 'PHYS'
  },

  WHIRLWIND: {
    id: 'whirlwind',
    name: 'Whirlwind Slash',
    damage: 1.2,
    energy: 35,
    cooldown: 2,
    accuracy: 82,
    timing: { enabled: true, difficulty: 'medium', window: 750 },
    description: 'Spinning attack hitting twice',
    type: 'physical',
    color: '#f59e0b',
    icon: 'PHYS',
    multiHit: 2
  },

  SHADOW_STEP: {
    id: 'shadow_step',
    name: 'Shadow Step',
    damage: 1.4,
    energy: 35,
    cooldown: 2,
    accuracy: 90,
    timing: { enabled: true, difficulty: 'hard', window: 650 },
    description: 'Teleport strike with evasion',
    type: 'special',
    color: '#8b5cf6',
    icon: 'SPEC'
  },

  VENOM_STRIKE: {
    id: 'venom_strike',
    name: 'Venom Strike',
    damage: 1.3,
    energy: 32,
    cooldown: 2,
    accuracy: 88,
    timing: { enabled: true, difficulty: 'medium', window: 750 },
    description: 'Poisonous damage over time',
    type: 'special',
    color: '#10b981',
    icon: 'SPEC',
    effects: ['poison']
  },

  FROST_BLADE: {
    id: 'frost_blade',
    name: 'Frost Blade',
    damage: 1.5,
    energy: 38,
    cooldown: 2,
    accuracy: 86,
    timing: { enabled: true, difficulty: 'hard', window: 700 },
    description: 'Icy slash that slows enemy',
    type: 'special',
    color: '#06b6d4',
    icon: 'SPEC',
    effects: ['slow']
  },

  // === HEAVY ATTACKS (High Cost) ===
  BERSERKER_RAGE: {
    id: 'berserker_rage',
    name: 'Berserker Rage',
    damage: 2.2,
    energy: 50,
    cooldown: 3,
    accuracy: 75,
    timing: { enabled: true, difficulty: 'hard', window: 650 },
    description: 'Furious assault with attack boost',
    type: 'special',
    color: '#dc2626',
    icon: 'SPEC',
    effects: ['attack_buff']
  },

  EXECUTE: {
    id: 'execute',
    name: 'Execute',
    damage: 2.8,
    energy: 55,
    cooldown: 3,
    accuracy: 70,
    timing: { enabled: true, difficulty: 'hard', window: 600 },
    description: 'Devastating finisher',
    type: 'physical',
    color: '#991b1b',
    icon: 'PHYS'
  },

  // === DEFENSIVE MOVES ===
  IRON_GUARD: {
    id: 'iron_guard',
    name: 'Iron Guard',
    damage: 0,
    energy: 20,
    cooldown: 1,
    accuracy: 100,
    timing: { enabled: false },
    description: 'Defensive stance reducing damage',
    type: 'defensive',
    color: '#0284c7',
    icon: 'DEF',
    effects: ['defense_buff']
  },

  COUNTER_STANCE: {
    id: 'counter_stance',
    name: 'Counter Stance',
    damage: 0,
    energy: 25,
    cooldown: 2,
    accuracy: 100,
    timing: { enabled: false },
    description: 'Deflect and counter attacks',
    type: 'defensive',
    color: '#059669',
    icon: 'DEF',
    effects: ['counter']
  },

  FORTIFY: {
    id: 'fortify',
    name: 'Fortify',
    damage: 0,
    energy: 30,
    cooldown: 3,
    accuracy: 100,
    timing: { enabled: false },
    description: 'Massive defense boost',
    type: 'defensive',
    color: '#1e40af',
    icon: 'DEF',
    effects: ['defense_buff_strong']
  },

  // === SUPPORT/UTILITY ===
  HEAL: {
    id: 'heal',
    name: 'Battle Meditation',
    damage: 0,
    energy: 40,
    cooldown: 4,
    accuracy: 100,
    timing: { enabled: false },
    description: 'Restore 35% HP and cleanse debuffs',
    type: 'support',
    color: '#16a34a',
    icon: 'SUPP',
    effects: ['heal', 'cleanse']
  },

  DRAIN_LIFE: {
    id: 'drain_life',
    name: 'Life Drain',
    damage: 1.4,
    energy: 35,
    cooldown: 2,
    accuracy: 88,
    timing: { enabled: true, difficulty: 'medium', window: 800 },
    description: 'Steal enemy health',
    type: 'support',
    color: '#a855f7',
    icon: 'SUPP',
    effects: ['lifesteal']
  },

  ADRENALINE: {
    id: 'adrenaline',
    name: 'Adrenaline Rush',
    damage: 0,
    energy: 25,
    cooldown: 3,
    accuracy: 100,
    timing: { enabled: false },
    description: 'Boost speed and evasion',
    type: 'support',
    color: '#fbbf24',
    icon: 'SUPP',
    effects: ['speed_buff', 'evasion']
  },

  // === ULTIMATE ABILITIES ===
  METEOR_STRIKE: {
    id: 'meteor_strike',
    name: 'Meteor Strike',
    damage: 3.5,
    energy: 80,
    cooldown: 5,
    accuracy: 72,
    timing: { enabled: true, difficulty: 'extreme', window: 500 },
    description: 'ULTIMATE: Devastating meteor from sky',
    type: 'ultimate',
    color: '#fbbf24',
    icon: 'ULT',
    effects: ['burn']
  },

  DIVINE_JUDGMENT: {
    id: 'divine_judgment',
    name: 'Divine Judgment',
    damage: 3.0,
    energy: 70,
    cooldown: 5,
    accuracy: 80,
    timing: { enabled: true, difficulty: 'extreme', window: 550 },
    description: 'ULTIMATE: Holy wrath with stun',
    type: 'ultimate',
    color: '#fbbf24',
    icon: 'ULT',
    effects: ['stun']
  },

  VOID_ANNIHILATION: {
    id: 'void_annihilation',
    name: 'Void Annihilation',
    damage: 2.8,
    energy: 75,
    cooldown: 5,
    accuracy: 78,
    timing: { enabled: true, difficulty: 'extreme', window: 520 },
    description: 'ULTIMATE: Dark energy obliteration',
    type: 'ultimate',
    color: '#7c3aed',
    icon: 'ULT',
    effects: ['defense_debuff']
  },

  LIGHTNING_STORM: {
    id: 'lightning_storm',
    name: 'Lightning Storm',
    damage: 2.6,
    energy: 65,
    cooldown: 4,
    accuracy: 85,
    timing: { enabled: true, difficulty: 'extreme', window: 550 },
    description: 'ULTIMATE: Electric barrage strikes',
    type: 'ultimate',
    color: '#0ea5e9',
    icon: 'ULT',
    multiHit: 3
  },

  APOCALYPSE: {
    id: 'apocalypse',
    name: 'Apocalypse',
    damage: 4.0,
    energy: 90,
    cooldown: 6,
    accuracy: 65,
    timing: { enabled: true, difficulty: 'extreme', window: 450 },
    description: 'ULTIMATE: Total destruction',
    type: 'ultimate',
    color: '#dc2626',
    icon: 'ULT'
  }
};

// ========== DEFENSIVE ACTIONS ==========
export const DEFENSIVE_ACTIONS = {
  BLOCK: {
    id: 'block',
    name: 'Block',
    damageReduction: 0.3,
    timing: { enabled: true, window: 600 },
    description: 'Reduce 30% damage'
  },
  PERFECT_BLOCK: {
    id: 'perfect_block',
    name: 'Perfect Block',
    damageReduction: 0.8,
    timing: { enabled: true, window: 300 },
    description: 'Reduce 80% damage'
  },
  PARRY: {
    id: 'parry',
    name: 'Parry',
    damageReduction: 0.5,
    counterDamage: 0.5,
    timing: { enabled: true, window: 400 },
    description: 'Reduce 50% + counter'
  },
  PERFECT_PARRY: {
    id: 'perfect_parry',
    name: 'Perfect Parry',
    damageReduction: 0.95,
    counterDamage: 0.8,
    timing: { enabled: true, window: 200 },
    description: 'Block 95% + strong counter'
  }
};

// ========== DAMAGE CALCULATION ==========
export const calculateAdvancedDamage = (attacker, defender, move, timingBonus = 1) => {
  let baseAtk = attacker.stats.attack;
  let baseDef = defender.stats.defense;
  
  // Ignore defense for certain moves
  if (move.ignoreDefense) {
    baseDef *= (1 - move.ignoreDefense);
  }
  
  // Base damage formula
  const baseDamage = (baseAtk * move.damage) - (baseDef * 0.35);
  
  // Speed advantage calculation
  const speedRatio = attacker.stats.speed / Math.max(1, defender.stats.speed);
  const speedBonus = Math.max(0, Math.min(0.5, (speedRatio - 1) * 0.35));
  
  // Critical hit system
  const critChance = Math.min(0.3, (attacker.stats.speed / 280) + 0.12);
  const isCrit = Math.random() < critChance;
  const critMultiplier = isCrit ? 2.0 : 1.0;
  
  // Accuracy check
  const hitChance = move.accuracy / 100;
  const isMiss = Math.random() > hitChance;
  
  if (isMiss) {
    return { 
      damage: 0, 
      isCrit: false, 
      isMiss: true, 
      effects: [],
      multiHit: 1
    };
  }
  
  // Calculate final damage
  let finalDamage = Math.max(12, Math.floor(
    baseDamage * (1 + speedBonus) * critMultiplier * timingBonus
  ));
  
  // Multi-hit modifier
  if (move.multiHit && move.multiHit > 1) {
    const hitCount = move.multiHit;
    finalDamage = Math.floor(finalDamage * hitCount * 0.85); // Slight reduction per hit
  }
  
  return {
    damage: finalDamage,
    isCrit,
    isMiss: false,
    effects: move.effects || [],
    multiHit: move.multiHit || 1
  };
};

// ========== TIMING BONUS CALCULATION ==========
export const calculateTimingBonus = (reactionTime, move) => {
  if (!move.timing || !move.timing.enabled) {
    return { bonus: 1.0, rating: 'OK', color: '#ffffff' };
  }
  
  const window = move.timing.window;
  const perfectWindow = window * 0.28;
  const greatWindow = window * 0.55;
  const goodWindow = window * 0.85;
  
  if (reactionTime <= perfectWindow) {
    return { bonus: 2.5, rating: 'PERFECT!', color: '#fbbf24' };
  } else if (reactionTime <= greatWindow) {
    return { bonus: 1.8, rating: 'GREAT!', color: '#10b981' };
  } else if (reactionTime <= goodWindow) {
    return { bonus: 1.3, rating: 'GOOD', color: '#06b6d4' };
  } else if (reactionTime <= window) {
    return { bonus: 0.8, rating: 'OK', color: '#9ca3af' };
  } else {
    return { bonus: 0.4, rating: 'MISSED', color: '#ef4444' };
  }
};

// ========== DEFENSIVE RESULT CALCULATION ==========
export const calculateDefensiveResult = (reactionTime, incomingDamage, actionType = 'BLOCK') => {
  const action = DEFENSIVE_ACTIONS[actionType];
  
  if (!action || !action.timing) {
    return {
      damageReduction: 0.2,
      counterDamage: 0,
      rating: 'FAILED',
      color: '#ef4444'
    };
  }
  
  const window = action.timing.window;
  const perfectWindow = window * 0.4;
  
  if (reactionTime <= perfectWindow) {
    // Perfect timing
    const perfectAction = actionType === 'BLOCK' 
      ? DEFENSIVE_ACTIONS.PERFECT_BLOCK 
      : DEFENSIVE_ACTIONS.PERFECT_PARRY;
    
    return {
      damageReduction: perfectAction.damageReduction,
      counterDamage: perfectAction.counterDamage || 0,
      rating: 'PERFECT!',
      color: '#fbbf24'
    };
  } else if (reactionTime <= window) {
    // Good timing
    return {
      damageReduction: action.damageReduction,
      counterDamage: action.counterDamage ? action.counterDamage * 0.6 : 0,
      rating: 'GOOD',
      color: '#10b981'
    };
  } else {
    // Failed timing
    return {
      damageReduction: 0.1,
      counterDamage: 0,
      rating: 'LATE',
      color: '#f59e0b'
    };
  }
};

// ========== AI DECISION MAKING ==========
export const generateSmartAI = (aiCharacter, playerCharacter, playerHP, aiHP, turn) => {
  const aiHPPercent = (aiHP / aiCharacter.maxHp) * 100;
  const playerHPPercent = (playerHP / (1000 + playerCharacter.stats.defense * 10)) * 100;
  
  // Emergency heal
  if (aiHPPercent < 25 && turn % 5 !== 0 && Math.random() < 0.8) {
    return MOVE_TYPES.HEAL;
  }
  
  // Finish off low HP player with ultimates
  if (playerHPPercent < 35 && turn > 3) {
    const finishers = [
      MOVE_TYPES.METEOR_STRIKE,
      MOVE_TYPES.DIVINE_JUDGMENT,
      MOVE_TYPES.APOCALYPSE,
      MOVE_TYPES.BERSERKER_RAGE
    ];
    return finishers[Math.floor(Math.random() * finishers.length)];
  }
  
  // Use ultimate abilities periodically
  if (turn > 5 && turn % 5 === 0 && Math.random() < 0.5) {
    const ultimates = [
      MOVE_TYPES.METEOR_STRIKE,
      MOVE_TYPES.DIVINE_JUDGMENT,
      MOVE_TYPES.VOID_ANNIHILATION,
      MOVE_TYPES.LIGHTNING_STORM
    ];
    return ultimates[Math.floor(Math.random() * ultimates.length)];
  }
  
  // Defensive when low HP
  if (aiHPPercent < 50 && Math.random() < 0.25) {
    const defensive = [
      MOVE_TYPES.IRON_GUARD,
      MOVE_TYPES.FORTIFY,
      MOVE_TYPES.COUNTER_STANCE
    ];
    return defensive[Math.floor(Math.random() * defensive.length)];
  }
  
  // Normal attack rotation
  const normalAttacks = [
    MOVE_TYPES.QUICK_STRIKE,
    MOVE_TYPES.POWER_SLASH,
    MOVE_TYPES.SHADOW_STEP,
    MOVE_TYPES.PIERCE,
    MOVE_TYPES.VENOM_STRIKE,
    MOVE_TYPES.FROST_BLADE,
    MOVE_TYPES.DRAIN_LIFE,
    MOVE_TYPES.WHIRLWIND
  ];
  
  return normalAttacks[Math.floor(Math.random() * normalAttacks.length)];
};

// ========== AI OPPONENT GENERATION ==========
export const generateAIOpponent = (playerLevel = 1, playerCharacter) => {
  const names = [
    'Shadow Reaper', 'Void Stalker', 'Cyber Demon', 'Plasma Titan',
    'Neon Phantom', 'Quantum Beast', 'Dark Warlord', 'Storm Breaker',
    'Crimson Blade', 'Frost King', 'Thunder God', 'Death Knight',
    'Chaos Bringer', 'Soul Harvester', 'Inferno Drake'
  ];
  
  const classes = [
    'Berserker', 'Assassin', 'Tank', 'Mage', 'Warrior', 
    'Paladin', 'Necromancer', 'Ranger', 'Duelist'
  ];
  
  const elements = [
    'Fire', 'Ice', 'Lightning', 'Dark', 'Holy', 
    'Poison', 'Arcane', 'Chaos'
  ];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const characterClass = classes[Math.floor(Math.random() * classes.length)];
  const element = elements[Math.floor(Math.random() * elements.length)];
  
  // Balanced stats (95-105% of player)
  const statVariation = 0.95 + (Math.random() * 0.1);
  
  const stats = {
    attack: Math.floor((playerCharacter?.stats.attack || 85) * statVariation),
    defense: Math.floor((playerCharacter?.stats.defense || 75) * statVariation),
    speed: Math.floor((playerCharacter?.stats.speed || 80) * statVariation)
  };
  
  const maxHp = 1000 + (stats.defense * 10);
  
  return {
    id: `ai_${Date.now()}_${Math.random()}`,
    name,
    class: characterClass,
    element,
    rarity: 'AI Boss',
    stats,
    hp: maxHp,
    maxHp,
    image: '/characters/shadow-knight.jpg',
    isAI: true,
    level: playerLevel
  };
};

// ========== BATTLE REWARDS CALCULATION ==========
export const calculateBattleRewards = (winner, loser, turnsUsed) => {
  const baseBoost = 6;
  const speedBonus = turnsUsed < 12 ? 4 : turnsUsed < 20 ? 2 : 0;
  const perfectionBonus = turnsUsed < 8 ? 2 : 0;
  
  return {
    attack: winner.stats.attack + baseBoost + speedBonus + perfectionBonus,
    defense: winner.stats.defense + baseBoost + Math.floor(speedBonus * 0.5),
    speed: winner.stats.speed + Math.floor((baseBoost + speedBonus) * 0.8),
    xp: 180 + (turnsUsed * 10),
    gold: 100 + (turnsUsed * 20)
  };
};

// ========== HEAL APPLICATION ==========
export const applyHeal = (currentHP, maxHP) => {
  const healAmount = Math.floor(maxHP * 0.35); // 35% heal
  return Math.min(maxHP, currentHP + healAmount);
};
