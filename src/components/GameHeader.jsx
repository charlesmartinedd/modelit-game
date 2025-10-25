import React from 'react'
import { motion } from 'framer-motion'
import './GameHeader.css'

const GameHeader = ({ level, levelName, points, streak, timeRemaining, iteration, totalIterations, onHome }) => {
  const getTimerColor = () => {
    if (timeRemaining > 20) return '#27ae60' // Green
    if (timeRemaining > 10) return '#E67E22' // Orange
    return '#e74c3c' // Red
  }

  return (
    <div className="game-header">
      <div className="header-left">
        {onHome && (
          <motion.button
            className="home-button"
            onClick={onHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Return to Home"
          >
            <span className="emoji">🏠</span>
          </motion.button>
        )}
        <div className="level-info">
          <div className="level-badge">
            <span className="emoji">🎮</span>
            <span>Level {level}</span>
          </div>
          <div className="subtitle">{levelName || 'Adding Components'}</div>
        </div>
      </div>

      <div className="header-center">
        <div className="iteration-tracker">
          <span className="iteration-number">{iteration}</span>
          <span className="iteration-divider">/</span>
          <span className="iteration-total">{totalIterations}</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(iteration / totalIterations) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="header-right">
        <div className="stat-item points">
          <span className="emoji">⭐</span>
          <motion.span
            key={points}
            initial={{ scale: 1.5, color: '#F5A623' }}
            animate={{ scale: 1, color: '#333' }}
            transition={{ duration: 0.3 }}
          >
            {points.toLocaleString()}
          </motion.span>
        </div>

        {streak > 0 && (
          <motion.div
            className="stat-item streak"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <span className="emoji">🔥</span>
            <span>{streak}</span>
          </motion.div>
        )}

        <div className="stat-item timer" style={{ color: getTimerColor() }}>
          <span className="emoji">⏱️</span>
          <motion.span
            animate={{
              scale: timeRemaining <= 5 ? [1, 1.1, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: timeRemaining <= 5 ? Infinity : 0
            }}
          >
            0:{timeRemaining.toString().padStart(2, '0')}
          </motion.span>
        </div>
      </div>
    </div>
  )
}

export default GameHeader
