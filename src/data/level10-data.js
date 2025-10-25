// Level 10: Complete Modeling (Putting It All Together)
// Final level combining all skills: components, arrows, types, states, logic, simulation, debugging, and multi-scale

export const level10Iterations = [
  // ==================== Iteration 1: MEDIUM (Simple complete model) ====================
  {
    id: 'level-10-iter-1',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    scenario: 'Model how a plant responds to sunlight',
    goalState: {
      components: [
        { icon: '☀️', label: 'Sunlight', state: 'ON' },
        { icon: '🍃', label: 'Chlorophyll', state: 'OFF' },
        { icon: '💧', label: 'Water', state: 'ON' },
        { icon: '🍬', label: 'Glucose', state: 'OFF' },
        { icon: '💨', label: 'O2', state: 'OFF' }
      ],
      arrows: [
        { from: 'Sunlight', to: 'Chlorophyll', type: 'positive' },
        { from: 'Water', to: 'Chlorophyll', type: 'positive' },
        { from: 'Chlorophyll', to: 'Glucose', type: 'positive' },
        { from: 'Chlorophyll', to: 'O2', type: 'positive' }
      ],
      mustSimulate: true,
      expectedSteps: 2
    },
    availableComponents: [
      { icon: '☀️', label: 'Sunlight' },
      { icon: '🍃', label: 'Chlorophyll' },
      { icon: '💧', label: 'Water' },
      { icon: '🍬', label: 'Glucose' },
      { icon: '💨', label: 'O2' },
      { icon: '🌱', label: 'Plant' },
      { icon: '🌍', label: 'Soil' }
    ],
    hint: 'Build the photosynthesis model, set initial states, run simulation!'
  },

  // ==================== Iteration 2: MEDIUM-HARD (Feedback control system) ====================
  {
    id: 'level-10-iter-2',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    scenario: 'Model blood sugar regulation with insulin feedback',
    goalState: {
      components: [
        { icon: '🍕', label: 'Eating', state: 'ON' },
        { icon: '📈', label: 'Blood Sugar', state: 'OFF' },
        { icon: '🫃', label: 'Pancreas', state: 'OFF' },
        { icon: '💉', label: 'Insulin', state: 'OFF' },
        { icon: '🔋', label: 'Cells Store Energy', state: 'OFF' }
      ],
      arrows: [
        { from: 'Eating', to: 'Blood Sugar', type: 'positive' },
        { from: 'Blood Sugar', to: 'Pancreas', type: 'positive' },
        { from: 'Pancreas', to: 'Insulin', type: 'positive' },
        { from: 'Insulin', to: 'Cells Store Energy', type: 'positive' },
        { from: 'Insulin', to: 'Blood Sugar', type: 'negative' }  // Negative feedback
      ],
      mustSimulate: true,
      expectedSteps: 4,
      rules: [
        {
          condition: 'IF Blood Sugar > threshold',
          action: 'THEN Pancreas releases Insulin'
        }
      ]
    },
    availableComponents: [
      { icon: '🍕', label: 'Eating' },
      { icon: '📈', label: 'Blood Sugar' },
      { icon: '🫃', label: 'Pancreas' },
      { icon: '💉', label: 'Insulin' },
      { icon: '🔋', label: 'Cells Store Energy' },
      { icon: '⚡', label: 'Energy' },
      { icon: '🍬', label: 'Glucose' }
    ],
    hint: 'Create negative feedback loop: Sugar high → Insulin → Sugar low!'
  },

  // ==================== Iteration 3: HARD (Multi-component ecosystem) ====================
  {
    id: 'level-10-iter-3',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    scenario: 'Model a predator-prey ecosystem with grass',
    goalState: {
      components: [
        { icon: '🌾', label: 'Grass', state: 'ON' },
        { icon: '🐰', label: 'Rabbits', state: 'OFF' },
        { icon: '🦊', label: 'Foxes', state: 'OFF' },
        { icon: '💀', label: 'Rabbit Deaths', state: 'OFF' },
        { icon: '🌱', label: 'Grass Growth', state: 'ON' }
      ],
      arrows: [
        { from: 'Grass', to: 'Rabbits', type: 'positive' },
        { from: 'Rabbits', to: 'Grass', type: 'negative' },  // Rabbits eat grass
        { from: 'Rabbits', to: 'Foxes', type: 'positive' },
        { from: 'Foxes', to: 'Rabbit Deaths', type: 'positive' },
        { from: 'Rabbit Deaths', to: 'Rabbits', type: 'negative' },
        { from: 'Grass Growth', to: 'Grass', type: 'positive' }
      ],
      mustSimulate: true,
      expectedSteps: 5
    },
    availableComponents: [
      { icon: '🌾', label: 'Grass' },
      { icon: '🐰', label: 'Rabbits' },
      { icon: '🦊', label: 'Foxes' },
      { icon: '💀', label: 'Rabbit Deaths' },
      { icon: '🌱', label: 'Grass Growth' },
      { icon: '☀️', label: 'Sunlight' },
      { icon: '💧', label: 'Rain' }
    ],
    hint: 'Build the full food web with multiple feedback loops. Watch it oscillate!'
  },

  // ==================== Iteration 4: VERY HARD (Multi-scale immune response) ====================
  {
    id: 'level-10-iter-4',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 225,
    scenario: 'Model the immune system fighting an infection across scales',
    goalState: {
      scales: [
        {
          name: 'Molecular',
          components: [
            { icon: '🦠', label: 'Pathogen', state: 'ON' }
          ]
        },
        {
          name: 'Cellular',
          components: [
            { icon: '🛡️', label: 'White Blood Cell', state: 'OFF' },
            { icon: '💣', label: 'Antibodies', state: 'OFF' }
          ]
        },
        {
          name: 'Organism',
          components: [
            { icon: '🤒', label: 'Fever', state: 'OFF' },
            { icon: '💪', label: 'Recovery', state: 'OFF' }
          ]
        }
      ],
      crossScaleArrows: [
        { from: 'Pathogen', to: 'White Blood Cell', type: 'positive' },
        { from: 'White Blood Cell', to: 'Antibodies', type: 'positive' },
        { from: 'Antibodies', to: 'Pathogen', type: 'negative' },  // Antibodies kill pathogen
        { from: 'White Blood Cell', to: 'Fever', type: 'positive' },
        { from: 'Fever', to: 'Recovery', type: 'positive' },
        { from: 'Antibodies', to: 'Recovery', type: 'positive' }
      ],
      mustSimulate: true,
      expectedSteps: 4
    },
    availableComponents: {
      'Molecular': [{ icon: '🦠', label: 'Pathogen' }, { icon: '💊', label: 'Medicine' }],
      'Cellular': [{ icon: '🛡️', label: 'White Blood Cell' }, { icon: '💣', label: 'Antibodies' }, { icon: '🔬', label: 'T-Cell' }],
      'Organism': [{ icon: '🤒', label: 'Fever' }, { icon: '💪', label: 'Recovery' }, { icon: '😷', label: 'Symptoms' }]
    },
    hint: 'Build across 3 scales: Pathogen triggers cells, cells fight back, body recovers!'
  },

  // ==================== Iteration 5: ULTIMATE (Climate and ecosystem model) ====================
  {
    id: 'level-10-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 250,
    scenario: 'Model climate change effects on an ecosystem',
    goalState: {
      components: [
        { icon: '🏭', label: 'CO2 Emissions', state: 'ON' },
        { icon: '🌡️', label: 'Global Temperature', state: 'OFF' },
        { icon: '🧊', label: 'Ice Melting', state: 'OFF' },
        { icon: '🌊', label: 'Sea Level', state: 'OFF' },
        { icon: '🐻‍❄️', label: 'Polar Bears', state: 'ON' },
        { icon: '🐟', label: 'Fish', state: 'ON' },
        { icon: '🌲', label: 'Forests', state: 'ON' }
      ],
      arrows: [
        { from: 'CO2 Emissions', to: 'Global Temperature', type: 'positive' },
        { from: 'Global Temperature', to: 'Ice Melting', type: 'positive' },
        { from: 'Ice Melting', to: 'Sea Level', type: 'positive' },
        { from: 'Ice Melting', to: 'Polar Bears', type: 'negative' },
        { from: 'Sea Level', to: 'Fish', type: 'negative' },
        { from: 'Global Temperature', to: 'Forests', type: 'negative' },
        { from: 'Forests', to: 'CO2 Emissions', type: 'negative' }  // Forests absorb CO2
      ],
      mustSimulate: true,
      expectedSteps: 5,
      debugging: {
        brokenArrow: { from: 'Forests', to: 'CO2 Emissions' },
        fixRequired: 'Students must identify the negative feedback from forests'
      }
    },
    availableComponents: [
      { icon: '🏭', label: 'CO2 Emissions' },
      { icon: '🌡️', label: 'Global Temperature' },
      { icon: '🧊', label: 'Ice Melting' },
      { icon: '🌊', label: 'Sea Level' },
      { icon: '🐻‍❄️', label: 'Polar Bears' },
      { icon: '🐟', label: 'Fish' },
      { icon: '🌲', label: 'Forests' },
      { icon: '☀️', label: 'Solar Energy' },
      { icon: '💨', label: 'Wind' }
    ],
    hint: 'Model the FULL climate system: emissions, warming, ecosystems, and feedback loops!'
  }
]
