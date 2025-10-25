import React from 'react'
import { motion } from 'framer-motion'
import { colors } from '../theme'
import soundManager from '../utils/sounds'
import './GameComplete.css'

const GameComplete = ({ totalPoints, onRestart }) => {
  return (
    <div className="game-complete-page">
      <div className="complete-container">
        <motion.div
          className="trophy-animation"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          🏆
        </motion.div>

        <motion.h1
          className="complete-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Congratulations!
        </motion.h1>

        <motion.p
          className="complete-subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          You've mastered all 10 fundamentals of biological modeling!
        </motion.p>

        <motion.div
          className="stats-display"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{totalPoints.toLocaleString()}</div>
            <div className="stat-label">Total Points</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">50</div>
            <div className="stat-label">Challenges Complete</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏅</div>
            <div className="stat-value">10</div>
            <div className="stat-label">Levels Mastered</div>
          </div>
        </motion.div>

        <motion.div
          className="achievement-list"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h3>You Learned:</h3>
          <div className="achievements">
            {[
              '🧩 Adding Components',
              '➡️ Creating Relationships',
              '🔀 Relationship Types',
              '⚙️ Component Properties',
              '🧠 Conditional Logic',
              '▶️ Running Simulations',
              '📊 Reading Data',
              '🐛 Debugging Models',
              '🌐 Multi-Scale Systems',
              '🏆 Complete Modeling'
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-item"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.05 }}
              >
                {achievement}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="complete-actions"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <button
            className="action-button primary"
            onClick={onRestart}
          >
            Play Again
          </button>

          <button
            className="action-button secondary"
            onClick={() => window.open('https://cellcollective.org', '_blank')}
          >
            Try Cell Collective
          </button>
        </motion.div>

        <motion.p
          className="footer-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          You're now ready to build real biological models in Cell Collective!
        </motion.p>
      </div>
    </div>
  )
}

export default GameComplete
