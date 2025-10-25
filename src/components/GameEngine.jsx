import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameHeader from './GameHeader'
import GoalPanel from './GoalPanel'
import Workspace from './Workspace'
import WorkspaceLevel2 from './WorkspaceLevel2'
import WorkspaceLevel3 from './WorkspaceLevel3'
import WorkspaceLevel4 from './WorkspaceLevel4'
import WorkspaceLevel5 from './WorkspaceLevel5'
import WorkspaceLevel6 from './WorkspaceLevel6'
import WorkspaceLevel7 from './WorkspaceLevel7'
import WorkspaceLevel8 from './WorkspaceLevel8'
import WorkspaceLevel9 from './WorkspaceLevel9'
import WorkspaceLevel10 from './WorkspaceLevel10'
import ComponentPalette from './ComponentPalette'
import SuccessModal from './SuccessModal'
import soundManager from '../utils/sounds'

// Import all level data
import { level1Iterations } from '../data/level1-data'
import { level2Iterations } from '../data/level2-data'
import { level3Iterations } from '../data/level3-data'
import { level4Iterations } from '../data/level4-data'
import { level5Iterations } from '../data/level5-data'
import { level6Iterations } from '../data/level6-data'
import { level7Iterations } from '../data/level7-data'
import { level8Iterations } from '../data/level8-data'
import { level9Iterations } from '../data/level9-data'
import { level10Iterations } from '../data/level10-data'

// Map levels to their data
const levelData = {
  1: level1Iterations,
  2: level2Iterations,
  3: level3Iterations,
  4: level4Iterations,
  5: level5Iterations,
  6: level6Iterations,
  7: level7Iterations,
  8: level8Iterations,
  9: level9Iterations,
  10: level10Iterations,
}

const levelInfo = {
  1: { name: 'Adding Components', icon: '🧩' },
  2: { name: 'Adding Arrows', icon: '➡️' },
  3: { name: 'Relationship Types', icon: '🔀' },
  4: { name: 'Component Properties', icon: '⚙️' },
  5: { name: 'Conditional Logic', icon: '🧠' },
  6: { name: 'Running Simulations', icon: '▶️' },
  7: { name: 'Reading Data', icon: '📊' },
  8: { name: 'Debugging Models', icon: '🐛' },
  9: { name: 'Multi-Scale Systems', icon: '🌐' },
  10: { name: 'Complete Modeling', icon: '🏆' },
}

const GameEngine = ({ level, onLevelComplete, totalPoints, onHome }) => {
  const iterations = levelData[level] || level1Iterations.slice(0, 5) // Fallback to 5 iterations
  const [currentIteration, setCurrentIteration] = useState(0)
  const [studentModel, setStudentModel] = useState([])
  const [studentArrows, setStudentArrows] = useState([]) // For Level 2+
  const [studentRules, setStudentRules] = useState([]) // For Level 5+
  const [selectedAnswer, setSelectedAnswer] = useState(null) // For Level 7
  const [points, setPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(level >= 2 ? 60 : 30) // More time for levels with arrows
  const [showSuccess, setShowSuccess] = useState(false)
  const [isTimerActive, setIsTimerActive] = useState(true)

  const iteration = iterations[currentIteration]

  // Timer logic
  useEffect(() => {
    if (!isTimerActive || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimerActive(false)
          handleTimeout()
          return 0
        }
        if (prev === 6) {
          soundManager.timerWarning()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerActive, timeRemaining])

  // Check for completion
  useEffect(() => {
    if (studentModel.length === 0) return
    checkCompletion()
  }, [studentModel, studentArrows])

  const checkCompletion = () => {
    const goalComponents = iteration.goalState.components
    const goalArrows = iteration.goalState.arrows || []

    // Check components
    if (studentModel.length !== goalComponents.length) return

    const componentsMatch = goalComponents.every(goal =>
      studentModel.some(student =>
        student.icon === goal.icon &&
        (student.label.toLowerCase().includes(goal.label.toLowerCase()) ||
         goal.label.toLowerCase().includes(student.label.toLowerCase()))
      )
    )

    if (!componentsMatch) return

    // For Level 1, only check components
    if (level === 1) {
      handleSuccess()
      return
    }

    // For Level 2+, also check arrows
    if (studentArrows.length !== goalArrows.length) return

    // Fuzzy matching for arrows - match by component labels
    const arrowsMatch = goalArrows.every(goalArrow => {
      return studentArrows.some(studentArrow => {
        // Find components by label matching
        const fromMatch = studentModel.find(c =>
          c.label.toLowerCase().includes(goalArrow.from.toLowerCase()) ||
          goalArrow.from.toLowerCase().includes(c.label.toLowerCase())
        )
        const toMatch = studentModel.find(c =>
          c.label.toLowerCase().includes(goalArrow.to.toLowerCase()) ||
          goalArrow.to.toLowerCase().includes(c.label.toLowerCase())
        )

        // Check if arrow connects the right components
        return fromMatch && toMatch &&
               studentArrow.from === fromMatch.label &&
               studentArrow.to === toMatch.label &&
               (!goalArrow.type || studentArrow.type === goalArrow.type)
      })
    })

    if (arrowsMatch) {
      handleSuccess()
    }
  }

  const handleSuccess = () => {
    setIsTimerActive(false)

    const basePoints = iteration.basePoints
    const speedBonus = timeRemaining > 20 ? 50 : 0
    const streakBonus = streak * 10
    const totalIterationPoints = basePoints + speedBonus + streakBonus

    setPoints(prev => prev + totalIterationPoints)
    setStreak(prev => prev + 1)
    setShowSuccess(true)

    soundManager.success()
    triggerConfetti()
  }

  const handleTimeout = () => {
    setStreak(0)
    setTimeout(() => {
      nextIteration()
    }, 2000)
  }

  const nextIteration = () => {
    setShowSuccess(false)

    if (currentIteration < iterations.length - 1) {
      setCurrentIteration(prev => prev + 1)
      setStudentModel([])
      setStudentArrows([])
      setTimeRemaining(level >= 2 ? 60 : 30) // Reset with more time for levels with arrows
      setIsTimerActive(true)
    } else {
      // Level complete!
      onLevelComplete(level, points)
    }
  }

  const addComponent = (component) => {
    soundManager.addComponent()
    setStudentModel(prev => [...prev, { ...component, id: Date.now() }])
  }

  const removeComponent = (id) => {
    soundManager.removeComponent()
    // Also remove arrows connected to this component
    setStudentArrows(prev => prev.filter(arrow => arrow.fromId !== id && arrow.toId !== id))
    setStudentModel(prev => prev.filter(c => c.id !== id))
  }

  const addArrow = (arrow) => {
    soundManager.addComponent() // Reuse add sound
    setStudentArrows(prev => [...prev, arrow])
  }

  const removeArrow = (arrow) => {
    soundManager.removeComponent() // Reuse remove sound
    setStudentArrows(prev => prev.filter(a =>
      !(a.fromId === arrow.fromId && a.toId === arrow.toId)
    ))
  }

  const updateComponentState = (componentId, newState) => {
    soundManager.click()
    setStudentModel(prev => prev.map(c =>
      c.id === componentId ? { ...c, state: newState } : c
    ))
  }

  const addRule = (rule) => {
    soundManager.addComponent()
    setStudentRules(prev => [...prev, rule])
  }

  const removeRule = (ruleIndex) => {
    soundManager.removeComponent()
    setStudentRules(prev => prev.filter((_, index) => index !== ruleIndex))
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    // Check answer for Level 7
    if (answer === iteration.goalState.correctAnswer) {
      handleSuccess()
    }
  }

  const triggerConfetti = () => {
    const colors = ['#0d75bb', '#E67E22', '#27ae60', '#f39c12']
    const confettiCount = 50

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 0.3 + 's'
      document.body.appendChild(confetti)

      setTimeout(() => confetti.remove(), 3000)
    }
  }

  return (
    <div className="game-container">
      <GameHeader
        level={level}
        levelName={levelInfo[level].name}
        points={totalPoints + points}
        streak={streak}
        timeRemaining={timeRemaining}
        iteration={currentIteration + 1}
        totalIterations={iterations.length}
        onHome={onHome}
      />

      <div className="game-content">
        <motion.div
          className="left-panel"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GoalPanel goalState={iteration.goalState} />
        </motion.div>

        <motion.div
          className="right-panel"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Render appropriate workspace for each level */}
          {level === 1 && (
            <Workspace
              components={studentModel}
              onRemove={removeComponent}
            />
          )}

          {level === 2 && (
            <WorkspaceLevel2
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
            />
          )}

          {level === 3 && (
            <WorkspaceLevel3
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
            />
          )}

          {level === 4 && (
            <WorkspaceLevel4
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
              onUpdateComponentState={updateComponentState}
            />
          )}

          {level === 5 && (
            <WorkspaceLevel5
              components={studentModel}
              arrows={studentArrows}
              rules={studentRules}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
              onUpdateComponentState={updateComponentState}
              onAddRule={addRule}
              onRemoveRule={removeRule}
            />
          )}

          {level === 6 && (
            <WorkspaceLevel6
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
              onUpdateComponentState={updateComponentState}
              goalState={iteration.goalState}
            />
          )}

          {level === 7 && (
            <WorkspaceLevel7
              iteration={iteration}
              onAnswerSelect={handleAnswerSelect}
              selectedAnswer={selectedAnswer}
            />
          )}

          {level === 8 && (
            <WorkspaceLevel8
              iteration={iteration}
              onComplete={handleSuccess}
            />
          )}

          {level === 9 && (
            <WorkspaceLevel9
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
              onUpdateComponentState={updateComponentState}
            />
          )}

          {level === 10 && (
            <WorkspaceLevel10
              components={studentModel}
              arrows={studentArrows}
              onRemoveComponent={removeComponent}
              onAddArrow={addArrow}
              onRemoveArrow={removeArrow}
              onUpdateComponentState={updateComponentState}
              scenario={iteration.scenario || iteration.hint}
            />
          )}

          {/* Show component palette for levels that need it (1-6, 9-10) */}
          {(level >= 1 && level <= 6) || level === 9 || level === 10 ? (
            <ComponentPalette
              availableComponents={iteration.availableComponents}
              onAdd={addComponent}
            />
          ) : null}
        </motion.div>
      </div>

      {showSuccess && (
        <SuccessModal
          points={totalPoints + points}
          streak={streak}
          onNext={nextIteration}
        />
      )}
    </div>
  )
}

export default GameEngine
