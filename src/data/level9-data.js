// Level 9: Multi-Scale Systems (Connecting Different Levels of Organization)
// Teaching students that models can span from molecules → cells → organs → organisms

export const level9Iterations = [
  // ==================== Iteration 1: EASY (Cell → Tissue) ====================
  {
    id: 'level-9-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      scales: [
        {
          name: 'Cellular',
          components: [
            { icon: '⚡', label: 'Muscle Cell', state: 'ON' }
          ]
        },
        {
          name: 'Tissue',
          components: [
            { icon: '💪', label: 'Muscle Tissue', state: 'OFF' }
          ]
        }
      ],
      crossScaleArrows: [
        { from: 'Muscle Cell', to: 'Muscle Tissue', type: 'positive', label: 'Many cells = tissue' }
      ]
    },
    availableComponents: {
      'Cellular': [
        { icon: '⚡', label: 'Muscle Cell' },
        { icon: '🧬', label: 'DNA' }
      ],
      'Tissue': [
        { icon: '💪', label: 'Muscle Tissue' },
        { icon: '🫀', label: 'Heart' }
      ]
    },
    hint: 'Individual muscle cells combine to form muscle tissue. Connect the scales!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (Molecular → Cellular → Organ) ====================
  {
    id: 'level-9-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      scales: [
        {
          name: 'Molecular',
          components: [
            { icon: '💨', label: 'Oxygen', state: 'ON' }
          ]
        },
        {
          name: 'Cellular',
          components: [
            { icon: '🔬', label: 'Blood Cell', state: 'OFF' }
          ]
        },
        {
          name: 'Organ',
          components: [
            { icon: '🫁', label: 'Lungs', state: 'OFF' }
          ]
        }
      ],
      crossScaleArrows: [
        { from: 'Oxygen', to: 'Blood Cell', type: 'positive' },
        { from: 'Blood Cell', to: 'Lungs', type: 'positive' }
      ]
    },
    availableComponents: {
      'Molecular': [{ icon: '💨', label: 'Oxygen' }, { icon: '💧', label: 'Water' }],
      'Cellular': [{ icon: '🔬', label: 'Blood Cell' }, { icon: '⚡', label: 'Neuron' }],
      'Organ': [{ icon: '🫁', label: 'Lungs' }, { icon: '🫀', label: 'Heart' }]
    },
    hint: 'Oxygen (molecular) → enters blood cells → makes lungs work. Build the chain!'
  },

  // ==================== Iteration 3: MEDIUM (Gene → Protein → Cell Function) ====================
  {
    id: 'level-9-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      scales: [
        {
          name: 'Genetic',
          components: [
            { icon: '🧬', label: 'Insulin Gene', state: 'ON' }
          ]
        },
        {
          name: 'Molecular',
          components: [
            { icon: '💉', label: 'Insulin Protein', state: 'OFF' }
          ]
        },
        {
          name: 'Cellular',
          components: [
            { icon: '🔋', label: 'Glucose Uptake', state: 'OFF' }
          ]
        },
        {
          name: 'Organism',
          components: [
            { icon: '📉', label: 'Blood Sugar Drops', state: 'OFF' }
          ]
        }
      ],
      crossScaleArrows: [
        { from: 'Insulin Gene', to: 'Insulin Protein', type: 'positive', label: 'Transcription' },
        { from: 'Insulin Protein', to: 'Glucose Uptake', type: 'positive', label: 'Cell Signaling' },
        { from: 'Glucose Uptake', to: 'Blood Sugar Drops', type: 'positive', label: 'Systemic Effect' }
      ]
    },
    availableComponents: {
      'Genetic': [{ icon: '🧬', label: 'Insulin Gene' }, { icon: '📜', label: 'DNA' }],
      'Molecular': [{ icon: '💉', label: 'Insulin Protein' }, { icon: '🍬', label: 'Glucose' }],
      'Cellular': [{ icon: '🔋', label: 'Glucose Uptake' }, { icon: '🔬', label: 'Cell' }],
      'Organism': [{ icon: '📉', label: 'Blood Sugar Drops' }, { icon: '⚡', label: 'Energy' }]
    },
    hint: 'Gene → Protein → Cell function → Body response. Connect all 4 scales!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (Ecosystem with multiple scales) ====================
  {
    id: 'level-9-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      scales: [
        {
          name: 'Cellular',
          components: [
            { icon: '🍃', label: 'Chloroplast', state: 'ON' }
          ]
        },
        {
          name: 'Organism',
          components: [
            { icon: '🌱', label: 'Plant', state: 'OFF' },
            { icon: '🐰', label: 'Rabbit', state: 'OFF' }
          ]
        },
        {
          name: 'Ecosystem',
          components: [
            { icon: '🌍', label: 'Food Web', state: 'OFF' }
          ]
        }
      ],
      crossScaleArrows: [
        { from: 'Chloroplast', to: 'Plant', type: 'positive' },
        { from: 'Plant', to: 'Rabbit', type: 'positive' },
        { from: 'Rabbit', to: 'Food Web', type: 'positive' }
      ]
    },
    availableComponents: {
      'Cellular': [{ icon: '🍃', label: 'Chloroplast' }, { icon: '⚡', label: 'Mitochondria' }],
      'Organism': [{ icon: '🌱', label: 'Plant' }, { icon: '🐰', label: 'Rabbit' }, { icon: '🦊', label: 'Fox' }],
      'Ecosystem': [{ icon: '🌍', label: 'Food Web' }, { icon: '🌊', label: 'Water Cycle' }]
    },
    hint: 'Energy flows from chloroplasts (cellular) → plants → animals → ecosystem!'
  },

  // ==================== Iteration 5: HARD (Complete multi-scale immune response) ====================
  {
    id: 'level-9-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      scales: [
        {
          name: 'Molecular',
          components: [
            { icon: '🦠', label: 'Virus Protein', state: 'ON' }
          ]
        },
        {
          name: 'Cellular',
          components: [
            { icon: '🛡️', label: 'Immune Cell', state: 'OFF' },
            { icon: '💣', label: 'Antibody', state: 'OFF' }
          ]
        },
        {
          name: 'Tissue',
          components: [
            { icon: '🔥', label: 'Inflammation', state: 'OFF' }
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
        { from: 'Virus Protein', to: 'Immune Cell', type: 'positive', label: 'Detection' },
        { from: 'Immune Cell', to: 'Antibody', type: 'positive', label: 'Production' },
        { from: 'Antibody', to: 'Inflammation', type: 'positive', label: 'Immune Response' },
        { from: 'Inflammation', to: 'Fever', type: 'positive', label: 'Systemic Signal' },
        { from: 'Fever', to: 'Recovery', type: 'positive', label: 'Healing Process' }
      ]
    },
    availableComponents: {
      'Molecular': [{ icon: '🦠', label: 'Virus Protein' }, { icon: '💉', label: 'Vaccine' }],
      'Cellular': [{ icon: '🛡️', label: 'Immune Cell' }, { icon: '💣', label: 'Antibody' }, { icon: '🔬', label: 'T-Cell' }],
      'Tissue': [{ icon: '🔥', label: 'Inflammation' }, { icon: '🩸', label: 'Blood Flow' }],
      'Organism': [{ icon: '🤒', label: 'Fever' }, { icon: '💪', label: 'Recovery' }, { icon: '😷', label: 'Symptoms' }]
    },
    hint: 'Complete immune cascade: Virus detected → cells respond → tissue inflames → body fights back!'
  }
]
