// Level 2: Adding Arrows (Relationships)
// Teaching students to connect components with directional arrows

export const level2Iterations = [
  // ==================== Iteration 1: EASY (2 components, 1 arrow) ====================
  {
    id: 'level-2-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sun' },
        { icon: '🌱', label: 'Plant' }
      ],
      arrows: [
        { from: 'Sun', to: 'Plant', label: 'Energy' }
      ]
    },
    availableComponents: [
      { icon: '☀️', label: 'Sun' },
      { icon: '🌱', label: 'Plant' },
      { icon: '💧', label: 'Water' }
    ],
    hint: 'The Sun provides energy to the Plant. Draw an arrow from Sun to Plant!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (3 components, 2 arrows) ====================
  {
    id: 'level-2-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '🍎', label: 'Food' },
        { icon: '😋', label: 'Mouth' },
        { icon: '🫃', label: 'Stomach' }
      ],
      arrows: [
        { from: 'Food', to: 'Mouth', label: 'Chewing' },
        { from: 'Mouth', to: 'Stomach', label: 'Swallowing' }
      ]
    },
    availableComponents: [
      { icon: '🍎', label: 'Food' },
      { icon: '😋', label: 'Mouth' },
      { icon: '🫃', label: 'Stomach' },
      { icon: '🦷', label: 'Teeth' },
      { icon: '💧', label: 'Water' }
    ],
    hint: 'Food goes to your Mouth, then to your Stomach. Create a chain!'
  },

  // ==================== Iteration 3: MEDIUM (4 components, 3 arrows) ====================
  {
    id: 'level-2-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🫁', label: 'Lungs' },
        { icon: '💨', label: 'Oxygen' },
        { icon: '❤️', label: 'Blood' },
        { icon: '💪', label: 'Muscles' }
      ],
      arrows: [
        { from: 'Lungs', to: 'Oxygen', label: 'Breathing' },
        { from: 'Oxygen', to: 'Blood', label: 'Absorption' },
        { from: 'Blood', to: 'Muscles', label: 'Delivery' }
      ]
    },
    availableComponents: [
      { icon: '🫁', label: 'Lungs' },
      { icon: '💨', label: 'Oxygen' },
      { icon: '❤️', label: 'Blood' },
      { icon: '💪', label: 'Muscles' },
      { icon: '🫀', label: 'Heart' },
      { icon: '🧠', label: 'Brain' }
    ],
    hint: 'Oxygen flows from Lungs → Blood → Muscles. Build the pathway!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (4 components, 4 arrows - branching) ====================
  {
    id: 'level-2-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '🧠', label: 'Brain' },
        { icon: '👁️', label: 'Eyes' },
        { icon: '👂', label: 'Ears' },
        { icon: '👃', label: 'Nose' }
      ],
      arrows: [
        { from: 'Eyes', to: 'Brain', label: 'Vision' },
        { from: 'Ears', to: 'Brain', label: 'Hearing' },
        { from: 'Nose', to: 'Brain', label: 'Smell' }
      ]
    },
    availableComponents: [
      { icon: '🧠', label: 'Brain' },
      { icon: '👁️', label: 'Eyes' },
      { icon: '👂', label: 'Ears' },
      { icon: '👃', label: 'Nose' },
      { icon: '👅', label: 'Tongue' },
      { icon: '✋', label: 'Skin' }
    ],
    hint: 'All senses send information TO the Brain. Multiple arrows pointing to one target!'
  },

  // ==================== Iteration 5: HARD (5 components, 5 arrows - cycle) ====================
  {
    id: 'level-2-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sunlight' },
        { icon: '🌱', label: 'Plant' },
        { icon: '🍬', label: 'Glucose' },
        { icon: '🐰', label: 'Rabbit' },
        { icon: '💨', label: 'CO2' }
      ],
      arrows: [
        { from: 'Sunlight', to: 'Plant', label: 'Energy' },
        { from: 'Plant', to: 'Glucose', label: 'Photosynthesis' },
        { from: 'Glucose', to: 'Rabbit', label: 'Eating' },
        { from: 'Rabbit', to: 'CO2', label: 'Breathing' },
        { from: 'CO2', to: 'Plant', label: 'Absorption' }
      ]
    },
    availableComponents: [
      { icon: '☀️', label: 'Sunlight' },
      { icon: '🌱', label: 'Plant' },
      { icon: '🍬', label: 'Glucose' },
      { icon: '🐰', label: 'Rabbit' },
      { icon: '💨', label: 'CO2' },
      { icon: '💧', label: 'Water' },
      { icon: '🌍', label: 'Soil' }
    ],
    hint: 'Create a complete cycle: Sun → Plant → Glucose → Rabbit → CO2 → Plant!'
  }
]
