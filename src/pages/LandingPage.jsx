import React from 'react'
import { motion } from 'framer-motion'
import { colors, gradients } from '../theme'
import './LandingPage.css'

const LandingPage = ({ onStart, onLevelSelect }) => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <motion.div
          className="logo-section"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="logo-icon">🔬</div>
          <h1 className="game-title">
            <span className="model-text">Model</span>
            <span className="it-text">It!</span>
            <span className="rapid-badge">RAPID</span>
          </h1>
        </motion.div>

        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Master the fundamentals of biological modeling
        </motion.p>

        <motion.div
          className="levels-preview"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="test-mode-hint" style={{ textAlign: 'center', color: '#E67E22', marginBottom: '15px', fontSize: '14px' }}>
            ✨ Testing Mode: Click any level to play directly!
          </p>
          <div className="level-grid">
            {[
              { id: 1, name: 'Adding Components', icon: '🧩' },
              { id: 2, name: 'Adding Arrows', icon: '➡️' },
              { id: 3, name: 'Relationship Types', icon: '🔀' },
              { id: 4, name: 'Component Properties', icon: '⚙️' },
              { id: 5, name: 'Conditional Logic', icon: '🧠' },
              { id: 6, name: 'Running Simulations', icon: '▶️' },
              { id: 7, name: 'Reading Data', icon: '📊' },
              { id: 8, name: 'Debugging Models', icon: '🐛' },
              { id: 9, name: 'Multi-Scale Systems', icon: '🌐' },
              { id: 10, name: 'Complete Modeling', icon: '🏆' },
            ].map((level, index) => (
              <motion.div
                key={level.id}
                className="level-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => onLevelSelect && onLevelSelect(level.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="level-number">Level {level.id}</div>
                <div className="level-icon">{level.icon}</div>
                <div className="level-name">{level.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="start-button"
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Training</span>
            <span className="start-icon">🚀</span>
          </motion.button>

          <p className="subtext">
            Powered by <strong>Cell Collective</strong> • 50 Challenges • 10 Levels
          </p>
        </motion.div>

        <motion.div
          className="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>Instant Feedback</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>Guided Learning</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧬</span>
            <span>Real Biology</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
