import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../theme'
import soundManager from '../utils/sounds'
import './Tutorial.css'

const tutorialSteps = [
  {
    title: "Welcome to ModelIt! Rapid",
    content: "Learn to build biological models just like scientists use Cell Collective!",
    icon: "🎓",
    button: "Let's Start!"
  },
  {
    title: "Your Goal",
    content: "The left panel shows components you need to add. Match them exactly!",
    icon: "🎯",
    button: "Got it!"
  },
  {
    title: "Your Workspace",
    content: "Tap icons from the palette below to add them to your workspace. Tap components in the workspace to remove them.",
    icon: "🔬",
    button: "Makes sense!"
  },
  {
    title: "Beat the Clock!",
    content: "Complete each challenge in 30 seconds. Earn points and build streaks!",
    icon: "⏱️",
    button: "I'm Ready!"
  }
]

const Tutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const step = tutorialSteps[currentStep]

  const handleNext = () => {
    soundManager.click()

    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="tutorial-page">
      <div className="tutorial-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="tutorial-card"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="tutorial-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              {step.icon}
            </motion.div>

            <motion.h2
              className="tutorial-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {step.title}
            </motion.h2>

            <motion.p
              className="tutorial-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {step.content}
            </motion.p>

            <motion.button
              className="tutorial-button"
              onClick={handleNext}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {step.button}
            </motion.button>

            <div className="tutorial-progress">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'complete' : ''}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Tutorial
