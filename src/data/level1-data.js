// Level 1: Adding Components
// Teaching students to add "nodes" to the graph - the first fundamental skill

export const level1Iterations = [
  // ==================== Iteration 1: EASY (2 components) ====================
  {
    id: 'level-1-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '🍭', label: 'Sugar' },
        { icon: '⚡', label: 'Energy' }
      ]
    },
    availableComponents: [
      { icon: '🍭', label: 'Sugar' },
      { icon: '⚡', label: 'Energy' },
      { icon: '💧', label: 'Water' }
    ],
    hint: 'Add Sugar and Energy to your workspace!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (3 components) ====================
  {
    id: 'level-1-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '🍎', label: 'Food' },
        { icon: '🦷', label: 'Teeth' },
        { icon: '😋', label: 'Mouth' }
      ]
    },
    availableComponents: [
      { icon: '🍎', label: 'Food' },
      { icon: '🦷', label: 'Teeth' },
      { icon: '😋', label: 'Mouth' },
      { icon: '💧', label: 'Water' },
      { icon: '🫃', label: 'Stomach' }
    ],
    hint: 'What do you need to eat? Food, Teeth, and your Mouth!'
  },

  // ==================== Iteration 3: MEDIUM (4 components) ====================
  {
    id: 'level-1-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🫀', label: 'Heart' },
        { icon: '🫁', label: 'Lungs' },
        { icon: '💨', label: 'Oxygen' },
        { icon: '❤️', label: 'Blood' }
      ]
    },
    availableComponents: [
      { icon: '🫀', label: 'Heart' },
      { icon: '🫁', label: 'Lungs' },
      { icon: '💨', label: 'Oxygen' },
      { icon: '❤️', label: 'Blood' },
      { icon: '🧠', label: 'Brain' },
      { icon: '💪', label: 'Muscle' }
    ],
    hint: 'The circulatory system has a heart, lungs, oxygen, and blood!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (5 components) ====================
  {
    id: 'level-1-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '👁️', label: 'Eyes' },
        { icon: '👂', label: 'Ears' },
        { icon: '👃', label: 'Nose' },
        { icon: '👅', label: 'Tongue' },
        { icon: '✋', label: 'Skin' }
      ]
    },
    availableComponents: [
      { icon: '👁️', label: 'Eyes' },
      { icon: '👂', label: 'Ears' },
      { icon: '👃', label: 'Nose' },
      { icon: '👅', label: 'Tongue' },
      { icon: '✋', label: 'Skin' },
      { icon: '🧠', label: 'Brain' },
      { icon: '💪', label: 'Muscle' },
      { icon: '🦴', label: 'Bone' }
    ],
    hint: 'Your brain connects to all 5 senses!'
  },

  // ==================== Iteration 5: HARD (6 components) ====================
  {
    id: 'level-1-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sunlight' },
        { icon: '💧', label: 'Water' },
        { icon: '🍃', label: 'Chlorophyll' },
        { icon: '☁️', label: 'CO2' },
        { icon: '🍬', label: 'Glucose' },
        { icon: '💨', label: 'O2' }
      ]
    },
    availableComponents: [
      { icon: '☀️', label: 'Sunlight' },
      { icon: '💧', label: 'Water' },
      { icon: '🍃', label: 'Chlorophyll' },
      { icon: '☁️', label: 'CO2' },
      { icon: '🍬', label: 'Glucose' },
      { icon: '💨', label: 'O2' },
      { icon: '🌱', label: 'Plant' },
      { icon: '🌍', label: 'Soil' }
    ],
    hint: 'Complete photosynthesis: sunlight, water, chlorophyll, CO2, glucose, and oxygen!'
  }
]
