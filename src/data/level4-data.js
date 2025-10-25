// Level 4: Component Properties (ON/OFF States)
// Teaching students that components can have different states, like switches

export const level4Iterations = [
  // ==================== Iteration 1: EASY (2 components with states) ====================
  {
    id: 'level-4-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '💡', label: 'Light', state: 'ON' },
        { icon: '🔌', label: 'Switch', state: 'ON' }
      ],
      arrows: [
        { from: 'Switch', to: 'Light', type: 'positive' }
      ]
    },
    availableComponents: [
      { icon: '💡', label: 'Light' },
      { icon: '🔌', label: 'Switch' },
      { icon: '🔋', label: 'Battery' }
    ],
    hint: 'Turn both Switch and Light ON. When the switch is ON, the light turns ON!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (3 components, mixed states) ====================
  {
    id: 'level-4-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '🦠', label: 'Virus', state: 'ON' },
        { icon: '🛡️', label: 'Immune System', state: 'ON' },
        { icon: '😷', label: 'Sick', state: 'OFF' }
      ],
      arrows: [
        { from: 'Virus', to: 'Sick', type: 'positive' },
        { from: 'Immune System', to: 'Sick', type: 'negative' }
      ]
    },
    availableComponents: [
      { icon: '🦠', label: 'Virus' },
      { icon: '🛡️', label: 'Immune System' },
      { icon: '😷', label: 'Sick' },
      { icon: '💊', label: 'Medicine' }
    ],
    hint: 'Virus is ON, Immune System is ON, but you stay healthy (Sick is OFF)!'
  },

  // ==================== Iteration 3: MEDIUM (4 components, cause and effect) ====================
  {
    id: 'level-4-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🏃', label: 'Exercise', state: 'ON' },
        { icon: '🫀', label: 'Heart Rate', state: 'ON' },
        { icon: '💦', label: 'Sweat', state: 'ON' },
        { icon: '😴', label: 'Tired', state: 'OFF' }
      ],
      arrows: [
        { from: 'Exercise', to: 'Heart Rate', type: 'positive' },
        { from: 'Exercise', to: 'Sweat', type: 'positive' },
        { from: 'Exercise', to: 'Tired', type: 'positive' }
      ]
    },
    availableComponents: [
      { icon: '🏃', label: 'Exercise' },
      { icon: '🫀', label: 'Heart Rate' },
      { icon: '💦', label: 'Sweat' },
      { icon: '😴', label: 'Tired' },
      { icon: '💪', label: 'Muscle' }
    ],
    hint: 'During exercise: Heart Rate ON, Sweat ON, but not tired YET (OFF)!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (4 components, inhibition logic) ====================
  {
    id: 'level-4-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sunlight', state: 'OFF' },
        { icon: '🌙', label: 'Darkness', state: 'ON' },
        { icon: '😴', label: 'Melatonin', state: 'ON' },
        { icon: '💤', label: 'Sleep', state: 'ON' }
      ],
      arrows: [
        { from: 'Sunlight', to: 'Melatonin', type: 'negative' },
        { from: 'Darkness', to: 'Melatonin', type: 'positive' },
        { from: 'Melatonin', to: 'Sleep', type: 'positive' }
      ]
    },
    availableComponents: [
      { icon: '☀️', label: 'Sunlight' },
      { icon: '🌙', label: 'Darkness' },
      { icon: '😴', label: 'Melatonin' },
      { icon: '💤', label: 'Sleep' },
      { icon: '🧠', label: 'Brain' }
    ],
    hint: 'At night: Sunlight OFF, Darkness ON → Melatonin ON → Sleep ON!'
  },

  // ==================== Iteration 5: HARD (5 components, complex logic) ====================
  {
    id: 'level-4-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '🍬', label: 'Sugar', state: 'ON' },
        { icon: '📈', label: 'Blood Glucose', state: 'ON' },
        { icon: '💉', label: 'Insulin', state: 'ON' },
        { icon: '🔋', label: 'Energy Storage', state: 'ON' },
        { icon: '⚠️', label: 'High Blood Sugar', state: 'OFF' }
      ],
      arrows: [
        { from: 'Sugar', to: 'Blood Glucose', type: 'positive' },
        { from: 'Blood Glucose', to: 'Insulin', type: 'positive' },
        { from: 'Insulin', to: 'Energy Storage', type: 'positive' },
        { from: 'Insulin', to: 'Blood Glucose', type: 'negative' },
        { from: 'Blood Glucose', to: 'High Blood Sugar', type: 'positive' }
      ]
    },
    availableComponents: [
      { icon: '🍬', label: 'Sugar' },
      { icon: '📈', label: 'Blood Glucose' },
      { icon: '💉', label: 'Insulin' },
      { icon: '🔋', label: 'Energy Storage' },
      { icon: '⚠️', label: 'High Blood Sugar' },
      { icon: '🫃', label: 'Pancreas' }
    ],
    hint: 'Healthy response: Sugar eaten, insulin released, glucose normalized (High Blood Sugar OFF)!'
  }
]
