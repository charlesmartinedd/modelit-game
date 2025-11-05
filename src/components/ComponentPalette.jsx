import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import soundManager from '../utils/sounds'
import './ComponentPalette.css'

const ComponentPalette = ({ availableComponents, onAdd }) => {
  const [selectedId, setSelectedId] = React.useState(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [hoveredId, setHoveredId] = React.useState(null)

  const handleDragStart = (e, component) => {
    setIsDragging(true)
    setSelectedId(component.icon)
    soundManager.click()

    // Set drag data
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('application/json', JSON.stringify(component))

    // Create custom drag image with more pizzazz
    const dragImage = e.currentTarget.cloneNode(true)
    dragImage.style.opacity = '0.8'
    dragImage.style.transform = 'scale(1.3) rotate(5deg)'
    dragImage.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 50, 50)
    setTimeout(() => document.body.removeChild(dragImage), 0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setTimeout(() => setSelectedId(null), 300)
  }

  // Fallback: Still support clicking for touch devices
  const handleClick = (component) => {
    setSelectedId(component.icon)
    onAdd(component, null) // null position = use default

    // Visual feedback
    setTimeout(() => setSelectedId(null), 300)
  }

  const handleMouseEnter = (component) => {
    setHoveredId(component.icon)
    soundManager.hover()
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
  }

  return (
    <div className="component-palette">
      <motion.div
        className="palette-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="emoji">🎨</span>
        <h4>Component Palette</h4>
      </motion.div>

      <div className="palette-items">
        {availableComponents.map((component, index) => (
          <motion.div
            key={component.icon + index}
            className={`palette-item ${selectedId === component.icon ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${hoveredId === component.icon ? 'hovered' : ''}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, component)}
            onDragEnd={handleDragEnd}
            onClick={() => handleClick(component)}
            onMouseEnter={() => handleMouseEnter(component)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'grab' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="palette-icon emoji"
              animate={{
                rotate: hoveredId === component.icon ? [0, -10, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {component.icon}
            </motion.div>
            <div className="palette-label">{component.label}</div>
            <AnimatePresence>
              {hoveredId === component.icon && (
                <motion.div
                  className="hover-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="palette-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="hint-icon"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          🎯
        </motion.div>
        <p>Drag components to the canvas!</p>
      </motion.div>
    </div>
  )
}

export default ComponentPalette
