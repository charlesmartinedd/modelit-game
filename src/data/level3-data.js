// Level 3: Relationship Types (Positive/Negative Influences)
// Teaching students that arrows can have different effects: + (activation) or - (inhibition)

export const level3Iterations = [
  // ==================== Iteration 1: EASY (2 components, 1 positive arrow) ====================
  {
    id: 'level-3-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '☕', label: 'Coffee' },
        { icon: '😃', label: 'Energy' }
      ],
      arrows: [
        { from: 'Coffee', to: 'Energy', type: 'positive', label: '+' }
      ]
    },
    availableComponents: [
      { icon: '☕', label: 'Coffee' },
      { icon: '😃', label: 'Energy' },
      { icon: '😴', label: 'Sleepy' }
    ],
    hint: 'Coffee INCREASES energy. Use a positive (+) arrow!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (2 components, 1 negative arrow) ====================
  {
    id: 'level-3-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '🦠', label: 'Bacteria' },
        { icon: '💊', label: 'Antibiotic' }
      ],
      arrows: [
        { from: 'Antibiotic', to: 'Bacteria', type: 'negative', label: '-' }
      ]
    },
    availableComponents: [
      { icon: '🦠', label: 'Bacteria' },
      { icon: '💊', label: 'Antibiotic' },
      { icon: '🛡️', label: 'Immune' }
    ],
    hint: 'Antibiotics REDUCE bacteria. Use a negative (-) arrow!'
  },

  // ==================== Iteration 3: MEDIUM (4 components, mixed arrows) ====================
  {
    id: 'level-3-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🍕', label: 'Eating' },
        { icon: '🍬', label: 'Blood Sugar' },
        { icon: '💉', label: 'Insulin' },
        { icon: '⚡', label: 'Energy' }
      ],
      arrows: [
        { from: 'Eating', to: 'Blood Sugar', type: 'positive', label: '+' },
        { from: 'Blood Sugar', to: 'Insulin', type: 'positive', label: '+' },
        { from: 'Insulin', to: 'Blood Sugar', type: 'negative', label: '-' },
        { from: 'Blood Sugar', to: 'Energy', type: 'positive', label: '+' }
      ]
    },
    availableComponents: [
      { icon: '🍕', label: 'Eating' },
      { icon: '🍬', label: 'Blood Sugar' },
      { icon: '💉', label: 'Insulin' },
      { icon: '⚡', label: 'Energy' },
      { icon: '🫃', label: 'Stomach' }
    ],
    hint: 'Eating raises sugar (+), insulin lowers it (-). Create feedback loop!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (4 components, complex feedback) ====================
  {
    id: 'level-3-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '🐰', label: 'Rabbits' },
        { icon: '🦊', label: 'Foxes' },
        { icon: '🌾', label: 'Grass' },
        { icon: '💀', label: 'Death' }
      ],
      arrows: [
        { from: 'Grass', to: 'Rabbits', type: 'positive', label: '+' },
        { from: 'Rabbits', to: 'Grass', type: 'negative', label: '-' },
        { from: 'Rabbits', to: 'Foxes', type: 'positive', label: '+' },
        { from: 'Foxes', to: 'Rabbits', type: 'negative', label: '-' }
      ]
    },
    availableComponents: [
      { icon: '🐰', label: 'Rabbits' },
      { icon: '🦊', label: 'Foxes' },
      { icon: '🌾', label: 'Grass' },
      { icon: '💀', label: 'Death' },
      { icon: '🌱', label: 'Plants' }
    ],
    hint: 'Predator-prey model: Grass feeds rabbits (+), rabbits eaten by foxes (-)!'
  },

  // ==================== Iteration 5: HARD (5 components, negative feedback loop) ====================
  {
    id: 'level-3-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '🌡️', label: 'Body Temp' },
        { icon: '🧠', label: 'Brain' },
        { icon: '💦', label: 'Sweat' },
        { icon: '🥶', label: 'Shivering' },
        { icon: '🎯', label: 'Normal Temp' }
      ],
      arrows: [
        { from: 'Body Temp', to: 'Brain', type: 'positive', label: '+' },
        { from: 'Brain', to: 'Sweat', type: 'positive', label: '+' },
        { from: 'Sweat', to: 'Body Temp', type: 'negative', label: '-' },
        { from: 'Body Temp', to: 'Shivering', type: 'negative', label: '-' },
        { from: 'Shivering', to: 'Body Temp', type: 'positive', label: '+' }
      ]
    },
    availableComponents: [
      { icon: '🌡️', label: 'Body Temp' },
      { icon: '🧠', label: 'Brain' },
      { icon: '💦', label: 'Sweat' },
      { icon: '🥶', label: 'Shivering' },
      { icon: '🎯', label: 'Normal Temp' },
      { icon: '❤️', label: 'Blood' }
    ],
    hint: 'Homeostasis: Too hot → sweat (-), too cold → shiver (+). Balance it!'
  }
]
