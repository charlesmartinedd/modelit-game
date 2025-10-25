// Level 7: Reading Data (Interpreting Graphs and Results)
// Teaching students to analyze simulation outputs and understand what the data means

export const level7Iterations = [
  // ==================== Iteration 1: EASY (Single line graph interpretation) ====================
  {
    id: 'level-7-iter-1',
    difficulty: 1,
    timeLimit: 30,
    basePoints: 100,
    goalState: {
      graphData: {
        type: 'line',
        component: 'Plant Growth',
        pattern: 'increasing',
        dataPoints: [0, 2, 4, 6, 8, 10]
      },
      question: 'What happens to plant growth over time?',
      correctAnswer: 'Increases steadily'
    },
    availableAnswers: [
      'Increases steadily',
      'Decreases steadily',
      'Stays the same',
      'Goes up and down'
    ],
    hint: 'Look at the line - is it going up, down, or staying flat?'
  },

  // ==================== Iteration 2: MEDIUM-EASY (Compare two lines) ====================
  {
    id: 'level-7-iter-2',
    difficulty: 2,
    timeLimit: 30,
    basePoints: 125,
    goalState: {
      graphData: {
        type: 'line',
        components: ['Heart Rate', 'Exercise'],
        pattern: 'correlation',
        dataPoints: {
          'Heart Rate': [60, 80, 100, 120, 140],
          'Exercise': [0, 2, 4, 6, 8]
        }
      },
      question: 'What is the relationship between exercise and heart rate?',
      correctAnswer: 'Heart rate increases with exercise'
    },
    availableAnswers: [
      'Heart rate increases with exercise',
      'Heart rate decreases with exercise',
      'No relationship',
      'They are opposite'
    ],
    hint: 'When exercise goes up, what happens to heart rate?'
  },

  // ==================== Iteration 3: MEDIUM (Oscillation pattern) ====================
  {
    id: 'level-7-iter-3',
    difficulty: 3,
    timeLimit: 30,
    basePoints: 150,
    goalState: {
      graphData: {
        type: 'line',
        components: ['Predator', 'Prey'],
        pattern: 'oscillation',
        dataPoints: {
          'Predator': [5, 8, 4, 9, 3, 10],
          'Prey': [20, 15, 25, 12, 28, 10]
        }
      },
      question: 'How do predator and prey populations relate?',
      correctAnswer: 'They cycle: when prey increases, predators follow, then prey decrease'
    },
    availableAnswers: [
      'They cycle: when prey increases, predators follow, then prey decrease',
      'Both always increase together',
      'Both always decrease together',
      'They are unrelated'
    ],
    hint: 'Notice the wave pattern - one population rises after the other!'
  },

  // ==================== Iteration 4: MEDIUM-HARD (Threshold detection) ====================
  {
    id: 'level-7-iter-4',
    difficulty: 4,
    timeLimit: 30,
    basePoints: 175,
    goalState: {
      graphData: {
        type: 'line',
        components: ['Blood Sugar', 'Insulin'],
        pattern: 'threshold',
        dataPoints: {
          'Blood Sugar': [70, 90, 110, 150, 120, 90, 80],
          'Insulin': [0, 0, 0, 10, 8, 2, 0]
        },
        threshold: 100
      },
      question: 'When does insulin get released?',
      correctAnswer: 'Only when blood sugar goes above 100'
    },
    availableAnswers: [
      'Only when blood sugar goes above 100',
      'Whenever blood sugar changes',
      'Always at the same rate',
      'Only when blood sugar is below 100'
    ],
    hint: 'Look for when insulin turns ON - what is blood sugar doing at that moment?'
  },

  // ==================== Iteration 5: HARD (Multi-component system analysis) ====================
  {
    id: 'level-7-iter-5',
    difficulty: 5,
    timeLimit: 30,
    basePoints: 200,
    goalState: {
      graphData: {
        type: 'line',
        components: ['Sunlight', 'Photosynthesis', 'Oxygen', 'CO2'],
        pattern: 'day-night-cycle',
        dataPoints: {
          'Sunlight': [0, 5, 10, 10, 5, 0, 0],
          'Photosynthesis': [0, 3, 8, 8, 3, 0, 0],
          'Oxygen': [5, 8, 12, 15, 13, 10, 8],
          'CO2': [15, 12, 8, 5, 7, 10, 12]
        }
      },
      question: 'What happens during the day-night cycle?',
      correctAnswer: 'Sunlight drives photosynthesis, producing O2 and consuming CO2'
    },
    availableAnswers: [
      'Sunlight drives photosynthesis, producing O2 and consuming CO2',
      'All components increase together',
      'CO2 and O2 are unrelated to sunlight',
      'Only sunlight changes, nothing else'
    ],
    hint: 'Follow the chain: What happens when sunlight appears? What does that cause?'
  }
]
