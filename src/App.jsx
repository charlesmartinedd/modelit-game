import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import Tutorial from './pages/Tutorial'
import GameEngine from './components/GameEngine'
import GameComplete from './pages/GameComplete'
import soundManager from './utils/sounds'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('landing') // 'landing', 'tutorial', 'playing', 'complete'
  const [currentLevel, setCurrentLevel] = useState(1)
  const [totalPoints, setTotalPoints] = useState(0)
  const [completedLevels, setCompletedLevels] = useState([])

  const handleStartGame = () => {
    soundManager.click()
    setGameState('tutorial')
  }

  const handleLevelSelect = (levelNumber) => {
    soundManager.click()
    setCurrentLevel(levelNumber)
    setGameState('playing')
  }

  const handleTutorialComplete = () => {
    soundManager.success()
    setGameState('playing')
    setCurrentLevel(1)
  }

  const handleLevelComplete = (level, points) => {
    soundManager.levelComplete()
    setTotalPoints(prev => prev + points)
    setCompletedLevels(prev => [...prev, level])

    if (level === 10) {
      // Game complete!
      setTimeout(() => setGameState('complete'), 2000)
    } else {
      // Next level
      setTimeout(() => setCurrentLevel(level + 1), 2000)
    }
  }

  const handleRestart = () => {
    soundManager.click()
    setGameState('landing')
    setCurrentLevel(1)
    setTotalPoints(0)
    setCompletedLevels([])
  }

  const handleHome = () => {
    soundManager.click()
    setGameState('landing')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <LandingPage
            key="landing"
            onStart={handleStartGame}
            onLevelSelect={handleLevelSelect}
          />
        )}

        {gameState === 'tutorial' && (
          <Tutorial key="tutorial" onComplete={handleTutorialComplete} />
        )}

        {gameState === 'playing' && (
          <GameEngine
            key={`level-${currentLevel}`}
            level={currentLevel}
            onLevelComplete={handleLevelComplete}
            totalPoints={totalPoints}
            onHome={handleHome}
          />
        )}

        {gameState === 'complete' && (
          <GameComplete
            key="complete"
            totalPoints={totalPoints}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
