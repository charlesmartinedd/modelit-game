import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkspaceLevel2.css'

const WorkspaceLevel2 = ({ components, arrows, onRemoveComponent, onAddArrow, onRemoveArrow }) => {
  const [mode, setMode] = useState('move') // 'move' or 'arrow'
  const [drawingArrow, setDrawingArrow] = useState(false)
  const [arrowStart, setArrowStart] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [componentPositions, setComponentPositions] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState(null)
  const workspaceRef = useRef(null)

  // Auto-position components in a grid when they're added
  const getComponentPosition = (index) => {
    const cols = 3
    const spacing = 150
    const offsetX = 50
    const offsetY = 50

    const col = index % cols
    const row = Math.floor(index / cols)

    return {
      x: offsetX + col * spacing,
      y: offsetY + row * spacing
    }
  }

  // Get or create position for a component
  const getStoredPosition = (componentId, index) => {
    if (componentPositions[componentId]) {
      return componentPositions[componentId]
    }
    // Return default position if not yet stored
    return getComponentPosition(index)
  }

  // Initialize and update positions
  useEffect(() => {
    const newPositions = { ...componentPositions }
    let hasChanges = false

    components.forEach((component, index) => {
      if (!newPositions[component.id]) {
        newPositions[component.id] = getComponentPosition(index)
        hasChanges = true
      }
    })

    // Clean up positions for removed components
    const currentIds = new Set(components.map(c => c.id))
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

  // Track mouse position for drawing arrow preview
  useEffect(() => {
    if (!drawingArrow) return

    const handleMouseMove = (e) => {
      const workspace = workspaceRef.current?.getBoundingClientRect()
      if (!workspace) return

      setMousePos({
        x: e.clientX - workspace.left,
        y: e.clientY - workspace.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [drawingArrow])

  const handleComponentClick = (component, event) => {
    event.stopPropagation()

    // If we're already drawing an arrow, complete it
    if (drawingArrow && arrowStart && arrowStart.id !== component.id) {
      onAddArrow({
        from: arrowStart.label,
        to: component.label,
        fromId: arrowStart.id,
        toId: component.id
      })
      setDrawingArrow(false)
      setArrowStart(null)
    } else if (!drawingArrow) {
      // Start drawing arrow from this component
      setDrawingArrow(true)
      setArrowStart(component)
    } else {
      // Clicked same component, cancel
      setDrawingArrow(false)
      setArrowStart(null)
    }
  }

  const handleWorkspaceMouseUp = () => {
    // Cancel arrow drawing if clicked on empty space
    setDrawingArrow(false)
    setArrowStart(null)
  }

  const handleComponentRightClick = (component, event) => {
    event.preventDefault()
    event.stopPropagation()
    onRemoveComponent(component.id)
  }

  const handleArrowClick = (arrow, event) => {
    event.stopPropagation()
    onRemoveArrow(arrow)
  }

  // Calculate arrow path between two components
  const getArrowPath = (fromId, toId) => {
    const fromEl = document.getElementById(`component-${fromId}`)
    const toEl = document.getElementById(`component-${toId}`)

    if (!fromEl || !toEl) return null

    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const workspace = workspaceRef.current?.getBoundingClientRect()

    if (!workspace) return null

    const fromX = fromRect.left + fromRect.width / 2 - workspace.left
    const fromY = fromRect.top + fromRect.height / 2 - workspace.top
    const toX = toRect.left + toRect.width / 2 - workspace.left
    const toY = toRect.top + toRect.height / 2 - workspace.top

    return { fromX, fromY, toX, toY }
  }

  // Get arrow preview path (from component to mouse)
  const getArrowPreviewPath = () => {
    if (!arrowStart) return null

    const fromEl = document.getElementById(`component-${arrowStart.id}`)
    if (!fromEl) return null

    const fromRect = fromEl.getBoundingClientRect()
    const workspace = workspaceRef.current?.getBoundingClientRect()
    if (!workspace) return null

    const fromX = fromRect.left + fromRect.width / 2 - workspace.left
    const fromY = fromRect.top + fromRect.height / 2 - workspace.top

    return { fromX, fromY, toX: mousePos.x, toY: mousePos.y }
  }

  const arrowPreview = drawingArrow ? getArrowPreviewPath() : null

  return (
    <div
      className="workspace-level2"
      ref={workspaceRef}
      onMouseUp={handleWorkspaceMouseUp}
    >
      <div className="workspace-header">
        <div className="header-top">
          <h3>Your Model</h3>
          <div className="mode-toggle">
            <motion.button
              className={`mode-btn ${mode === 'move' ? 'active' : ''}`}
              onClick={() => {
                setMode('move')
                setDrawingArrow(false)
                setArrowStart(null)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🖱️ Move
            </motion.button>
            <motion.button
              className={`mode-btn ${mode === 'arrow' ? 'active' : ''}`}
              onClick={() => setMode('arrow')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ➡️ Arrow
            </motion.button>
          </div>
        </div>
        <div className="workspace-instructions">
          {mode === 'move' ? (
            <span>💡 Drag components to position them anywhere on the canvas</span>
          ) : !drawingArrow ? (
            <span>🎯 Click a component to start drawing an arrow</span>
          ) : (
            <span className="drawing-mode">✨ Click another component to complete the arrow!</span>
          )}
        </div>
      </div>

      <div className="canvas-container">
        {/* SVG Layer for Arrows */}
        <svg className="arrows-layer">
          {/* Completed arrows */}
          {arrows.map((arrow, index) => {
            const path = getArrowPath(arrow.fromId, arrow.toId)
            if (!path) return null

            const { fromX, fromY, toX, toY } = path
            const angle = Math.atan2(toY - fromY, toX - fromX)
            const arrowHeadSize = 12

            return (
              <g key={index} onClick={(e) => handleArrowClick(arrow, e)} className="arrow-group">
                {/* Arrow line */}
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX - arrowHeadSize * Math.cos(angle)}
                  y2={toY - arrowHeadSize * Math.sin(angle)}
                  stroke="#0d75bb"
                  strokeWidth="4"
                  className="arrow-line"
                  markerEnd="url(#arrowhead)"
                />
                {/* Arrow head */}
                <polygon
                  points={`
                    ${toX},${toY}
                    ${toX - arrowHeadSize * Math.cos(angle - Math.PI / 6)},${toY - arrowHeadSize * Math.sin(angle - Math.PI / 6)}
                    ${toX - arrowHeadSize * Math.cos(angle + Math.PI / 6)},${toY - arrowHeadSize * Math.sin(angle + Math.PI / 6)}
                  `}
                  fill="#0d75bb"
                  className="arrow-head"
                />
              </g>
            )
          })}

          {/* Arrow preview while drawing */}
          {arrowPreview && (
            <g className="arrow-preview">
              <line
                x1={arrowPreview.fromX}
                y1={arrowPreview.fromY}
                x2={arrowPreview.toX}
                y2={arrowPreview.toY}
                stroke="#E67E22"
                strokeWidth="3"
                strokeDasharray="5,5"
                opacity="0.7"
              />
            </g>
          )}
        </svg>

        {/* Components - Draggable */}
        <div className="components-canvas">
          {components.length === 0 ? (
            <div className="empty-canvas">
              <div className="empty-icon">🔬</div>
              <p>Add components from the palette below</p>
              <p className="empty-hint">Then drag them to position and draw arrows!</p>
            </div>
          ) : (
            <AnimatePresence>
              {components.map((component, index) => {
                const position = getStoredPosition(component.id, index)

                return (
                  <motion.div
                    key={component.id}
                    id={`component-${component.id}`}
                    className={`canvas-component ${drawingArrow && arrowStart?.id === component.id ? 'arrow-source' : ''} ${mode === 'arrow' ? 'arrow-mode' : ''}`}
                    drag={mode === 'move'}
                    dragMomentum={false}
                    dragElastic={0}
                    dragConstraints={workspaceRef}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0, x: position.x, y: position.y }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.05 }}
                    onDragEnd={(event, info) => {
                      // Only fires in move mode
                      setComponentPositions(prev => ({
                        ...prev,
                        [component.id]: {
                          x: position.x + info.offset.x,
                          y: position.y + info.offset.y
                        }
                      }))
                    }}
                    onClick={(e) => {
                      // Only handle clicks in arrow mode
                      if (mode === 'arrow') {
                        handleComponentClick(component, e)
                      }
                    }}
                    onContextMenu={(e) => handleComponentRightClick(component, e)}
                    title={mode === 'move' ? 'Drag to move • Right-click to remove' : 'Click to draw arrow • Right-click to remove'}
                  >
                    <span className="component-icon">{component.icon}</span>
                    <span className="component-label">{component.label}</span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Instructions footer */}
      <div className="workspace-footer">
        <div className="control-hint">
          <span className="hint-item">🖱️ <strong>Drag</strong> = Move component</span>
          <span className="hint-item">🎯 <strong>Click → Click</strong> = Draw arrow</span>
          <span className="hint-item">🗑️ <strong>Right-click</strong> = Remove</span>
          <span className="hint-item">✖️ <strong>Click arrow</strong> = Delete arrow</span>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLevel2
