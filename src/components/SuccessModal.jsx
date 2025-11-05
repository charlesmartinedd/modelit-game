import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './SuccessModal.css'

const getSuccessMessage = (streak) => {
  const messages = {
    mega: [
      "🌟 LEGENDARY! You're unstoppable!",
      "🔥 ON FIRE! That's a mega streak!",
      "⚡ PHENOMENAL! Keep it going!",
      "💫 INCREDIBLE! You're a natural!"
    ],
    high: [
      "🎯 Excellent! You're crushing it!",
      "🚀 Awesome! Great momentum!",
      "✨ Fantastic work! Keep going!",
      "🎨 Brilliant! You've got this!"
    ],
    medium: [
      "👏 Great job! Building momentum!",
      "💪 Nice work! You're improving!",
      "⭐ Well done! Keep it up!",
      "🎪 Sweet! You're getting good!"
    ],
    default: [
      "✅ Perfect! You did it!",
      "🎉 Success! Well played!",
      "👍 Nailed it! Great work!",
      "🌈 Excellent! Moving forward!"
    ]
  }

  let category = 'default'
  if (streak >= 10) category = 'mega'
  else if (streak >= 5) category = 'high'
  else if (streak >= 3) category = 'medium'

  const options = messages[category]
  return options[Math.floor(Math.random() * options.length)]
}

const SuccessModal = ({ points, streak, onNext }) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(getSuccessMessage(streak))
  }, [streak])

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
        {/* Extra celebration for high streaks */}
        {streak >= 5 && (
          <motion.div
            className="streak-burst"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [1, 0.8, 0]
            }}
            transition={{ duration: 1.5 }}
          />
        )}

        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <div className="checkmark-circle">
            <motion.div
              className="checkmark"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: 2
              }}
            >
              ✓
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.h2>

        <motion.p
          className="success-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {streak >= 5 ? `Amazing ${streak}-streak combo! 🔥` : "You matched all the components!"}
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
