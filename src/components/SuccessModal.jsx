import React from 'react'
import { motion } from 'framer-motion'
import './SuccessModal.css'

const SuccessModal = ({ points, streak, onNext }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onNext}
    >
      <motion.div
        className="success-modal"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
        >
          <div className="checkmark-circle">
            <div className="checkmark">✓</div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Perfect! 🎉
        </motion.h2>

        <motion.p
          className="success-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You matched all the components!
        </motion.p>

        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="stat-box">
            <div className="stat-icon emoji">⭐</div>
            <div className="stat-value">{points.toLocaleString()}</div>
            <div className="stat-label">Total Points</div>
          </div>

          {streak > 1 && (
            <div className="stat-box">
              <div className="stat-icon emoji">🔥</div>
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Streak</div>
            </div>
          )}
        </motion.div>

        <motion.button
          className="next-button"
          onClick={onNext}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Challenge
          <span className="emoji">→</span>
        </motion.button>

        <motion.p
          className="tap-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default SuccessModal
