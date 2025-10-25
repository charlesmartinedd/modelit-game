import React from 'react'
import { motion } from 'framer-motion'
import './ComponentPalette.css'

const ComponentPalette = ({ availableComponents, onAdd }) => {
  const [selectedId, setSelectedId] = React.useState(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragStart = (e, component) => {
    setIsDragging(true)
    setSelectedId(component.icon)

    // Set drag data
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('application/json', JSON.stringify(component))

    // Create custom drag image
    const dragImage = e.currentTarget.cloneNode(true)
    dragImage.style.opacity = '0.7'
    dragImage.style.transform = 'scale(1.2)'
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

  return (
    <div className="component-palette">
      <div className="palette-header">
        <span className="emoji">🎨</span>
        <h4>Component Palette</h4>
      </div>

      <div className="palette-items">
        {availableComponents.map((component, index) => (
          <div
            key={component.icon + index}
            className={`palette-item ${selectedId === component.icon ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, component)}
            onDragEnd={handleDragEnd}
            onClick={() => handleClick(component)}
            style={{ cursor: 'grab' }}
          >
            <div className="palette-icon emoji">{component.icon}</div>
            <div className="palette-label">{component.label}</div>
          </div>
        ))}
      </div>

      <div className="palette-hint">
        <div className="hint-icon">🎯</div>
        <p>Drag components to the canvas!</p>
      </div>
    </div>
  )
}

export default ComponentPalette
