// Level 5: Conditional Logic (IF-THEN Rules)
// Teaching students that components respond differently based on conditions

export const level5Iterations = [
  // ==================== Iteration 1: EASY (Simple IF-THEN) ====================
  {
    id: 'level-5-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      components: [
        { icon: '🌡️', label: 'Temp > 100°F', state: 'ON' },
        { icon: '🔥', label: 'Fever', state: 'ON' }
      ],
      rules: [
        {
          condition: 'IF Temp > 100°F is ON',
          action: 'THEN Fever is ON'
        }
      ]
    },
    availableComponents: [
      { icon: '🌡️', label: 'Temp > 100°F' },
      { icon: '🔥', label: 'Fever' },
      { icon: '😷', label: 'Sick' }
    ],
    hint: 'IF temperature is high, THEN you have a fever. Simple cause and effect!'
  },

  // ==================== Iteration 2: MEDIUM-EASY (IF-THEN-ELSE) ====================
  {
    id: 'level-5-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      components: [
        { icon: '☀️', label: 'Sunlight', state: 'ON' },
        { icon: '🌱', label: 'Photosynthesis', state: 'ON' },
        { icon: '🌙', label: 'Night', state: 'OFF' }
      ],
      rules: [
        {
          condition: 'IF Sunlight is ON',
          action: 'THEN Photosynthesis is ON'
        },
        {
          condition: 'IF Sunlight is OFF',
          action: 'THEN Photosynthesis is OFF'
        }
      ]
    },
    availableComponents: [
      { icon: '☀️', label: 'Sunlight' },
      { icon: '🌱', label: 'Photosynthesis' },
      { icon: '🌙', label: 'Night' },
      { icon: '💧', label: 'Water' }
    ],
    hint: 'IF there is sunlight, plants make energy. IF no sunlight, they stop!'
  },

  // ==================== Iteration 3: MEDIUM (Multiple conditions - AND logic) ====================
  {
    id: 'level-5-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      components: [
        { icon: '🔥', label: 'Heat', state: 'ON' },
        { icon: '💧', label: 'Water', state: 'ON' },
        { icon: '🍝', label: 'Pasta', state: 'ON' },
        { icon: '🍲', label: 'Cooked', state: 'ON' }
      ],
      rules: [
        {
          condition: 'IF Heat is ON AND Water is ON AND Pasta is ON',
          action: 'THEN Cooked is ON'
        }
      ]
    },
    availableComponents: [
      { icon: '🔥', label: 'Heat' },
      { icon: '💧', label: 'Water' },
      { icon: '🍝', label: 'Pasta' },
      { icon: '🍲', label: 'Cooked' },
      { icon: '🧂', label: 'Salt' }
    ],
    hint: 'You need ALL three (Heat AND Water AND Pasta) to cook!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (OR logic with thresholds) ====================
  {
    id: 'level-5-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      components: [
        { icon: '🦠', label: 'Virus', state: 'ON' },
        { icon: '🤧', label: 'Bacteria', state: 'OFF' },
        { icon: '🛡️', label: 'Immune Response', state: 'ON' }
      ],
      rules: [
        {
          condition: 'IF Virus is ON OR Bacteria is ON',
          action: 'THEN Immune Response is ON'
        }
      ]
    },
    availableComponents: [
      { icon: '🦠', label: 'Virus' },
      { icon: '🤧', label: 'Bacteria' },
      { icon: '🛡️', label: 'Immune Response' },
      { icon: '💊', label: 'Medicine' }
    ],
    hint: 'Immune system activates if EITHER virus OR bacteria is present!'
  },

  // ==================== Iteration 5: HARD (Complex nested conditions) ====================
  {
    id: 'level-5-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      components: [
        { icon: '🍬', label: 'Blood Sugar High', state: 'ON' },
        { icon: '🏃', label: 'Exercise', state: 'OFF' },
        { icon: '💉', label: 'Insulin Release', state: 'ON' },
        { icon: '📉', label: 'Lower Glucose', state: 'ON' },
        { icon: '⚡', label: 'Energy to Cells', state: 'ON' }
      ],
      rules: [
        {
          condition: 'IF Blood Sugar High is ON AND Exercise is OFF',
          action: 'THEN Insulin Release is ON'
        },
        {
          condition: 'IF Insulin Release is ON',
          action: 'THEN Lower Glucose is ON AND Energy to Cells is ON'
        }
      ]
    },
    availableComponents: [
      { icon: '🍬', label: 'Blood Sugar High' },
      { icon: '🏃', label: 'Exercise' },
      { icon: '💉', label: 'Insulin Release' },
      { icon: '📉', label: 'Lower Glucose' },
      { icon: '⚡', label: 'Energy to Cells' },
      { icon: '🫃', label: 'Pancreas' }
    ],
    hint: 'IF sugar is high but not exercising, THEN insulin kicks in to balance it!'
  }
]
