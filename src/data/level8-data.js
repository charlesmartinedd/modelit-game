// Level 8: Debugging Models (Finding and Fixing Errors)
// Teaching students to identify what's wrong with a model and fix it

export const level8Iterations = [
  // ==================== Iteration 1: EASY (Missing arrow) ====================
  {
    id: 'level-8-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    brokenModel: {
      components: [
        { icon: '☀️', label: 'Sun', state: 'ON' },
        { icon: '🌱', label: 'Plant', state: 'OFF' }
      ],
      arrows: []  // MISSING: Sun → Plant
    },
    expectedBehavior: 'Plant should grow when sun shines',
    actualBehavior: 'Plant stays OFF even with sunlight',
    goalState: {
      components: [
        { icon: '☀️', label: 'Sun', state: 'ON' },
        { icon: '🌱', label: 'Plant', state: 'OFF' }
      ],
      arrows: [
        { from: 'Sun', to: 'Plant', type: 'positive' }
      ]
    },
    hint: 'The sun and plant are not connected! Add the missing arrow.'
  },

  // ==================== Iteration 2: MEDIUM-EASY (Wrong arrow direction) ====================
  {
    id: 'level-8-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    brokenModel: {
      components: [
        { icon: '🍎', label: 'Food' },
        { icon: '🫃', label: 'Stomach' }
      ],
      arrows: [
        { from: 'Stomach', to: 'Food', type: 'positive' }  // WRONG DIRECTION
      ]
    },
    expectedBehavior: 'Food goes TO stomach',
    actualBehavior: 'Arrow points the wrong way',
    goalState: {
      components: [
        { icon: '🍎', label: 'Food' },
        { icon: '🫃', label: 'Stomach' }
      ],
      arrows: [
        { from: 'Food', to: 'Stomach', type: 'positive' }
      ]
    },
    hint: 'Food should go INTO the stomach, not the other way around!'
  },

  // ==================== Iteration 3: MEDIUM (Wrong relationship type) ====================
  {
    id: 'level-8-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    brokenModel: {
      components: [
        { icon: '💊', label: 'Antibiotic', state: 'ON' },
        { icon: '🦠', label: 'Bacteria', state: 'ON' }
      ],
      arrows: [
        { from: 'Antibiotic', to: 'Bacteria', type: 'positive' }  // WRONG: should be negative
      ]
    },
    expectedBehavior: 'Antibiotic should REDUCE bacteria',
    actualBehavior: 'Bacteria increases instead of decreasing',
    goalState: {
      components: [
        { icon: '💊', label: 'Antibiotic', state: 'ON' },
        { icon: '🦠', label: 'Bacteria', state: 'ON' }
      ],
      arrows: [
        { from: 'Antibiotic', to: 'Bacteria', type: 'negative' }
      ]
    },
    hint: 'Antibiotics KILL bacteria. The arrow type is wrong - it should be negative (-)!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (Wrong component state) ====================
  {
    id: 'level-8-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    brokenModel: {
      components: [
        { icon: '🌙', label: 'Night', state: 'ON' },
        { icon: '☀️', label: 'Sunlight', state: 'ON' },  // WRONG: should be OFF at night
        { icon: '😴', label: 'Melatonin', state: 'OFF' }
      ],
      arrows: [
        { from: 'Sunlight', to: 'Melatonin', type: 'negative' },
        { from: 'Night', to: 'Melatonin', type: 'positive' }
      ]
    },
    expectedBehavior: 'At night, sunlight is OFF so melatonin turns ON',
    actualBehavior: 'Sunlight is ON during night (impossible!)',
    goalState: {
      components: [
        { icon: '🌙', label: 'Night', state: 'ON' },
        { icon: '☀️', label: 'Sunlight', state: 'OFF' },
        { icon: '😴', label: 'Melatonin', state: 'ON' }
      ],
      arrows: [
        { from: 'Sunlight', to: 'Melatonin', type: 'negative' },
        { from: 'Night', to: 'Melatonin', type: 'positive' }
      ]
    },
    hint: 'It cannot be both night AND sunny! Fix the sunlight state.'
  },

  // ==================== Iteration 5: HARD (Missing feedback loop) ====================
  {
    id: 'level-8-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    brokenModel: {
      components: [
        { icon: '🍬', label: 'Blood Sugar', state: 'ON' },
        { icon: '💉', label: 'Insulin', state: 'OFF' },
        { icon: '⚡', label: 'Energy', state: 'OFF' }
      ],
      arrows: [
        { from: 'Blood Sugar', to: 'Insulin', type: 'positive' },
        // MISSING: Insulin → Blood Sugar (negative feedback)
        { from: 'Blood Sugar', to: 'Energy', type: 'positive' }
      ]
    },
    expectedBehavior: 'Insulin should lower blood sugar (negative feedback)',
    actualBehavior: 'Blood sugar stays high forever - no regulation!',
    goalState: {
      components: [
        { icon: '🍬', label: 'Blood Sugar', state: 'ON' },
        { icon: '💉', label: 'Insulin', state: 'OFF' },
        { icon: '⚡', label: 'Energy', state: 'OFF' }
      ],
      arrows: [
        { from: 'Blood Sugar', to: 'Insulin', type: 'positive' },
        { from: 'Insulin', to: 'Blood Sugar', type: 'negative' },  // ADD THIS
        { from: 'Blood Sugar', to: 'Energy', type: 'positive' }
      ]
    },
    hint: 'Insulin is released but does not affect sugar! Add the feedback arrow: Insulin → Blood Sugar (-).'
  }
]
