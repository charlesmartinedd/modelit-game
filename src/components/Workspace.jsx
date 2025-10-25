import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Workspace.css'

const Workspace = ({ components, onRemove }) => {
  const [componentPositions, setComponentPositions] = useState({})
  const [dragging, setDragging] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const workspaceRef = useRef(null)

  // Clean up positions for removed components
  useEffect(() => {
    const currentIds = new Set(components.map(c => c.id))
    const newPositions = { ...componentPositions }
    let hasChanges = false

    Object.keys(newPositions).forEach(id => {
      if (!currentIds.has(id)) {
        delete newPositions[id]
        hasChanges = true
      }
    })

    if (hasChanges) {
      setComponentPositions(newPositions)
    }
  }, [components])

  // Set positions for new components from drop location
  useEffect(() => {
    components.forEach(component => {
      if (!componentPositions[component.id] && component._dropPosition) {
        setComponentPositions(prev => ({
          ...prev,
          [component.id]: component._dropPosition
        }))
      } else if (!componentPositions[component.id]) {
        // Default position for components without drop position
        const index = components.indexOf(component)
        setComponentPositions(prev => ({
          ...prev,
          [component.id]: {
            x: 50 + (index % 3) * 150,
            y: 50 + Math.floor(index / 3) * 150
          }
        }))
      }
    })
  }, [components])

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const workspace = workspaceRef.current?.getBoundingClientRect()
        if (!workspace) return

        const x = e.clientX - workspace.left
        const y = e.clientY - workspace.top
        setMousePos({ x, y })

        setComponentPositions(prev => ({
          ...prev,
          [dragging]: {
            x: Math.max(0, Math.min(x - 50, workspace.width - 100)),
            y: Math.max(0, Math.min(y - 50, workspace.height - 100))
          }
        }))
      }
    }

    const handleMouseUp = () => {
      if (dragging) setDragging(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const handleComponentMouseDown = (component, e) => {
    e.stopPropagation()
    setDragging(component.id)
  }

  const handleComponentRightClick = (component, e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(component.id)
  }

  // Handle drop from palette
  const handleDrop = (e) => {
    e.preventDefault()
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'))
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - 50
      const y = e.clientY - rect.top - 50

      if (typeof window.currentLevelAddComponent === 'function') {
        window.currentLevelAddComponent({ ...componentData, _dropPosition: { x, y } })
      }
    } catch (err) {
      console.error('Drop error:', err)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  return (
    <div className="workspace">
      <div className="workspace-header">
        <span className="emoji">🔬</span>
        <h3>Your Workspace</h3>
        {components.length > 0 && (
          <span className="component-count">{components.length} added</span>
        )}
      </div>

      <div
        className="workspace-canvas"
        ref={workspaceRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {components.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="empty-icon emoji">👇</div>
            <p>Drag components from below to add them here!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {components.map((component) => {
              const position = componentPositions[component.id] || { x: 50, y: 50 }

              return (
                <motion.div
                  key={component.id}
                  className="workspace-component"
                  style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: 'move'
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05 }}
                  onMouseDown={(e) => handleComponentMouseDown(component, e)}
                  onContextMenu={(e) => handleComponentRightClick(component, e)}
                >
                  <div className="component-icon emoji">{component.icon}</div>
                  <div className="component-label">{component.label}</div>
                  <div className="remove-hint">Right-click to remove</div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Workspace
