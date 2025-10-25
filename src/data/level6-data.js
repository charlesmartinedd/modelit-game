// Level 6: Running Simulations (Play Button - See Model in Action)
// Teaching students to run their model and observe how it behaves over time

export const level6Iterations = [
  // ==================== Iteration 1: EASY (Observe simple propagation) ====================
  {
    id: 'level-6-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sun', state: 'ON' },
        { icon: '🌱', label: 'Plant', state: 'OFF' }
      ],
      arrows: [
        { from: 'Sun', to: 'Plant', type: 'positive' }
      ],
      simulation: {
        steps: 3,
        expectedOutcome: [
          { step: 0, state: { Sun: 'ON', Plant: 'OFF' } },
          { step: 1, state: { Sun: 'ON', Plant: 'ON' } },
          { step: 2, state: { Sun: 'ON', Plant: 'ON' } }
        ]
      }
    },
    availableComponents: [
      { icon: '☀️', label: 'Sun' },
      { icon: '🌱', label: 'Plant' },
      { icon: '💧', label: 'Water' }
    ],
    hint: 'Build the model, then click PLAY. Watch the plant turn ON when sun activates it!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (Two-step cascade) ====================
  {
    id: 'level-6-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '🔥', label: 'Fire', state: 'ON' },
        { icon: '💧', label: 'Water', state: 'OFF' },
        { icon: '💨', label: 'Steam', state: 'OFF' }
      ],
      arrows: [
        { from: 'Fire', to: 'Water', type: 'positive' },
        { from: 'Water', to: 'Steam', type: 'positive' }
      ],
      simulation: {
        steps: 3,
        expectedOutcome: [
          { step: 0, state: { Fire: 'ON', Water: 'OFF', Steam: 'OFF' } },
          { step: 1, state: { Fire: 'ON', Water: 'ON', Steam: 'OFF' } },
          { step: 2, state: { Fire: 'ON', Water: 'ON', Steam: 'ON' } }
        ]
      }
    },
    availableComponents: [
      { icon: '🔥', label: 'Fire' },
      { icon: '💧', label: 'Water' },
      { icon: '💨', label: 'Steam' },
      { icon: '🌡️', label: 'Heat' }
    ],
    hint: 'Watch the cascade: Fire → Water heats → Steam rises. Takes 2 steps!'
  },

  // ==================== Iteration 3: MEDIUM (Inhibition effect) ====================
  {
    id: 'level-6-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🦠', label: 'Bacteria', state: 'ON' },
        { icon: '💊', label: 'Antibiotic', state: 'ON' },
        { icon: '😷', label: 'Infection', state: 'ON' }
      ],
      arrows: [
        { from: 'Bacteria', to: 'Infection', type: 'positive' },
        { from: 'Antibiotic', to: 'Bacteria', type: 'negative' }
      ],
      simulation: {
        steps: 3,
        expectedOutcome: [
          { step: 0, state: { Bacteria: 'ON', Antibiotic: 'ON', Infection: 'ON' } },
          { step: 1, state: { Bacteria: 'OFF', Antibiotic: 'ON', Infection: 'ON' } },
          { step: 2, state: { Bacteria: 'OFF', Antibiotic: 'ON', Infection: 'OFF' } }
        ]
      }
    },
    availableComponents: [
      { icon: '🦠', label: 'Bacteria' },
      { icon: '💊', label: 'Antibiotic' },
      { icon: '😷', label: 'Infection' },
      { icon: '🛡️', label: 'Immune' }
    ],
    hint: 'Run simulation: Antibiotic kills bacteria (-), then infection clears!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (Feedback loop stabilization) ====================
  {
    id: 'level-6-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '🍬', label: 'Glucose', state: 'ON' },
        { icon: '💉', label: 'Insulin', state: 'OFF' },
        { icon: '⚡', label: 'Energy', state: 'OFF' }
      ],
      arrows: [
        { from: 'Glucose', to: 'Insulin', type: 'positive' },
        { from: 'Insulin', to: 'Glucose', type: 'negative' },
        { from: 'Glucose', to: 'Energy', type: 'positive' }
      ],
      simulation: {
        steps: 4,
        expectedOutcome: [
          { step: 0, state: { Glucose: 'ON', Insulin: 'OFF', Energy: 'OFF' } },
          { step: 1, state: { Glucose: 'ON', Insulin: 'ON', Energy: 'ON' } },
          { step: 2, state: { Glucose: 'OFF', Insulin: 'ON', Energy: 'ON' } },
          { step: 3, state: { Glucose: 'OFF', Insulin: 'OFF', Energy: 'OFF' } }
        ]
      }
    },
    availableComponents: [
      { icon: '🍬', label: 'Glucose' },
      { icon: '💉', label: 'Insulin' },
      { icon: '⚡', label: 'Energy' },
      { icon: '🫃', label: 'Pancreas' }
    ],
    hint: 'Watch the feedback loop balance: High glucose triggers insulin, which lowers glucose!'
  },

  // ==================== Iteration 5: HARD (Oscillation - predator/prey) ====================
  {
    id: 'level-6-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '🐰', label: 'Rabbits', state: 'ON' },
        { icon: '🦊', label: 'Foxes', state: 'OFF' },
        { icon: '🌾', label: 'Grass', state: 'ON' }
      ],
      arrows: [
        { from: 'Grass', to: 'Rabbits', type: 'positive' },
        { from: 'Rabbits', to: 'Foxes', type: 'positive' },
        { from: 'Foxes', to: 'Rabbits', type: 'negative' },
        { from: 'Rabbits', to: 'Grass', type: 'negative' }
      ],
      simulation: {
        steps: 5,
        expectedOutcome: [
          { step: 0, state: { Rabbits: 'ON', Foxes: 'OFF', Grass: 'ON' } },
          { step: 1, state: { Rabbits: 'ON', Foxes: 'ON', Grass: 'OFF' } },
          { step: 2, state: { Rabbits: 'OFF', Foxes: 'ON', Grass: 'OFF' } },
          { step: 3, state: { Rabbits: 'OFF', Foxes: 'OFF', Grass: 'ON' } },
          { step: 4, state: { Rabbits: 'ON', Foxes: 'OFF', Grass: 'ON' } }
        ]
      }
    },
    availableComponents: [
      { icon: '🐰', label: 'Rabbits' },
      { icon: '🦊', label: 'Foxes' },
      { icon: '🌾', label: 'Grass' },
      { icon: '🌱', label: 'Plants' }
    ],
    hint: 'Run 5 steps and watch the ecosystem cycle: populations rise and fall!'
  }
]
