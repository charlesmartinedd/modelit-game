import React from 'react'
import { motion } from 'framer-motion'
import './GoalPanel.css'

const GoalPanel = ({ goalState }) => {
  const hasArrows = goalState.arrows && goalState.arrows.length > 0

  return (
    <div className="goal-panel">
      <div className="panel-header">
        <span className="emoji">🎯</span>
        <h2>Goal</h2>
      </div>

      <div className="panel-subtitle">
        {hasArrows ? 'Build this model:' : 'Add these components to your workspace!'}
      </div>

      <div className="goal-components">
        {goalState.components.map((component, index) => (
          <motion.div
            key={index}
            className="goal-component"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
          >
            <div className="component-icon emoji">{component.icon}</div>
            <div className="component-label">{component.label}</div>
          </motion.div>
        ))}
      </div>

      {hasArrows && (
        <div className="goal-arrows">
          <div className="arrows-title">Connections:</div>
          {goalState.arrows.map((arrow, index) => (
            <motion.div
              key={index}
              className="goal-arrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className="arrow-from">{arrow.from}</span>
              <span className="arrow-symbol">→</span>
              <span className="arrow-to">{arrow.to}</span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="hint-section">
        <div className="hint-icon">💡</div>
        <p className="hint-text">
          {hasArrows
            ? 'Drag components to the canvas, then draw arrows between them!'
            : 'Drag components from the palette below to build your model!'}
        </p>
      </div>
    </div>
  )
}

export default GoalPanel
