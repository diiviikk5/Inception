// Using actual game characters as AI opponents
export const AI_OPPONENTS = [
  {
    id: 'ai-shadow-knight',
    name: "Shadow Knight",
    description: "A dark warrior from the nightmare realm",
    image: "/characters/shadow-knight.jpg",
    rarity: "Legendary",
    stats: { attack: 92, defense: 78, speed: 85 },
    class: "Warrior",
    element: "Dark",
    isAI: true
  },
  {
    id: 'ai-demon-warrior',
    name: "Demon Warrior",
    description: "Fearsome demon with infernal power",
    image: "/characters/demon-warrior.jpg",
    rarity: "Legendary",
    stats: { attack: 98, defense: 82, speed: 75 },
    class: "Warrior",
    element: "Fire",
    isAI: true
  },
  {
    id: 'ai-vampire-lord',
    name: "Vampire Lord",
    description: "Ancient bloodsucker with life-drain abilities",
    image: "/characters/vampire-lord.jpg",
    rarity: "Epic",
    stats: { attack: 90, defense: 70, speed: 95 },
    class: "Assassin",
    element: "Dark",
    isAI: true
  },
  {
    id: 'ai-flame-knight',
    name: "Flame Knight",
    description: "Champion of fire with blazing sword",
    image: "/characters/flame-knight.jpg",
    rarity: "Epic",
    stats: { attack: 94, defense: 88, speed: 78 },
    class: "Warrior",
    element: "Fire",
    isAI: true
  },
  {
    id: 'ai-celestial-angel',
    name: "Celestial Angel",
    description: "Divine protector with wings of pure light",
    image: "/characters/celestial-angel.jpg",
    rarity: "Mythic",
    stats: { attack: 88, defense: 95, speed: 90 },
    class: "Support",
    element: "Light",
    isAI: true
  },
  {
    id: 'ai-holy-paladin',
    name: "Holy Paladin",
    description: "Sacred warrior blessed with divine protection",
    image: "/characters/holy-paladin.jpg",
    rarity: "Epic",
    stats: { attack: 86, defense: 96, speed: 72 },
    class: "Tank",
    element: "Light",
    isAI: true
  },
  {
    id: 'ai-dreamweaver',
    name: "Dreamweaver",
    description: "Mystic sage who manipulates reality",
    image: "/characters/dreamweaver.jpg",
    rarity: "Rare",
    stats: { attack: 85, defense: 80, speed: 88 },
    class: "Mage",
    element: "Arcane",
    isAI: true
  },
  {
    id: 'ai-nature-sage',
    name: "Nature Sage",
    description: "Ancient druid with power over nature",
    image: "/characters/nature-sage.jpg",
    rarity: "Rare",
    stats: { attack: 75, defense: 85, speed: 70 },
    class: "Mage",
    element: "Nature",
    isAI: true
  }
];

/**
 * Get a completely random AI opponent
 */
export const getRandomOpponent = () => {
  const randomIndex = Math.floor(Math.random() * AI_OPPONENTS.length);
  return { ...AI_OPPONENTS[randomIndex] };
};

/**
 * Get random opponent based on difficulty
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 */
export const getOpponentByDifficulty = (difficulty = 'medium') => {
  let filtered = [];
  
  switch(difficulty.toLowerCase()) {
    case 'easy':
      // Low attack opponents (75-85)
      filtered = AI_OPPONENTS.filter(opp => opp.stats.attack < 86);
      break;
    case 'medium':
      // Medium attack opponents (86-92)
      filtered = AI_OPPONENTS.filter(opp => opp.stats.attack >= 86 && opp.stats.attack < 94);
      break;
    case 'hard':
      // High attack opponents (94+)
      filtered = AI_OPPONENTS.filter(opp => opp.stats.attack >= 94);
      break;
    default:
      filtered = AI_OPPONENTS;
  }
  
  if (filtered.length === 0) filtered = AI_OPPONENTS;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return { ...filtered[randomIndex] };
};

/**
 * Get opponent similar in strength to player's character
 * @param {number} playerAttack - Player's attack stat
 */
export const getBalancedOpponent = (playerAttack) => {
  const attackRange = 10; // Look for opponents within ±10 attack points
  
  let filtered = AI_OPPONENTS.filter(opp => 
    Math.abs(opp.stats.attack - playerAttack) <= attackRange
  );
  
  // If no balanced opponent found, return any opponent
  if (filtered.length === 0) filtered = AI_OPPONENTS;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return { ...filtered[randomIndex] };
};

/**
 * Get opponent by class (for strategic matchmaking)
 * @param {string} classType - Warrior, Mage, Tank, etc.
 */
export const getOpponentByClass = (classType) => {
  let filtered = AI_OPPONENTS.filter(opp => 
    opp.class.toLowerCase() === classType.toLowerCase()
  );
  
  if (filtered.length === 0) filtered = AI_OPPONENTS;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return { ...filtered[randomIndex] };
};

/**
 * Get multiple random opponents (for selection screen)
 * @param {number} count - Number of opponents to return
 */
export const getMultipleOpponents = (count = 3) => {
  const shuffled = [...AI_OPPONENTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, AI_OPPONENTS.length));
};
