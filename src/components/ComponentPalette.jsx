import React from 'react'
import { motion } from 'framer-motion'
import './ComponentPalette.css'

const ComponentPalette = ({ availableComponents, onAdd }) => {
  const [selectedId, setSelectedId] = React.useState(null)

  const handleClick = (component) => {
    setSelectedId(component.icon)
    onAdd(component)

    // Visual feedback
    setTimeout(() => setSelectedId(null), 300)
  }

  return (
    <div className="component-palette">
      <div className="palette-header">
        <span className="emoji">🎨</span>
        <h4>Component Palette</h4>
      </div>

      <div className="palette-items">
        {availableComponents.map((component, index) => (
          <motion.button
            key={component.icon + index}
            className={`palette-item ${selectedId === component.icon ? 'selected' : ''}`}
            onClick={() => handleClick(component)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.05,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="palette-icon emoji">{component.icon}</div>
            <div className="palette-label">{component.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="palette-hint">
        <div className="hint-icon">✨</div>
        <p>Tap any component to add it!</p>
      </div>
    </div>
  )
}

export default ComponentPalette
