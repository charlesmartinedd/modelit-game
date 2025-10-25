import React, { useState, useRef, useEffect } from 'react'
import './WorkspaceLevel2.css'

const WorkspaceLevel2 = ({ components, arrows, onRemoveComponent, onAddArrow, onRemoveArrow }) => {
  const [mode, setMode] = useState('move')
  const [drawingArrow, setDrawingArrow] = useState(false)
  const [arrowStart, setArrowStart] = useState(null)
  const [componentPositions, setComponentPositions] = useState({})
  const [dragging, setDragging] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const workspaceRef = useRef(null)

  // Auto-position components when added
  useEffect(() => {
    const newPositions = { ...componentPositions }
    let hasChanges = false

    components.forEach((component, index) => {
      if (!newPositions[component.id]) {
        const col = index % 3
        const row = Math.floor(index / 3)
        newPositions[component.id] = {
          x: 50 + col * 150,
          y: 50 + row * 150
        }
        hasChanges = true
      }
    })

    // Clean up removed components
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

  // Handle mouse move for dragging and arrow preview
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging || drawingArrow) {
        const workspace = workspaceRef.current?.getBoundingClientRect()
        if (!workspace) return

        const x = e.clientX - workspace.left
        const y = e.clientY - workspace.top

        setMousePos({ x, y })

        if (dragging) {
          setComponentPositions(prev => ({
            ...prev,
            [dragging]: {
              x: Math.max(0, Math.min(x - 50, workspace.width - 100)),
              y: Math.max(0, Math.min(y - 50, workspace.height - 100))
            }
          }))
        }
      }
    }

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, drawingArrow])

  const handleComponentMouseDown = (component, e) => {
    e.stopPropagation()

    if (mode === 'move') {
      setDragging(component.id)
    } else if (mode === 'arrow') {
      // Arrow mode - click to draw
      if (drawingArrow && arrowStart && arrowStart.id !== component.id) {
        // Complete arrow
        onAddArrow({
          from: arrowStart.label,
          to: component.label,
          fromId: arrowStart.id,
          toId: component.id
        })
        setDrawingArrow(false)
        setArrowStart(null)
      } else if (!drawingArrow) {
        // Start arrow
        setDrawingArrow(true)
        setArrowStart(component)
      } else {
        // Cancel (same component)
        setDrawingArrow(false)
        setArrowStart(null)
      }
    }
  }

  const handleComponentRightClick = (component, e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemoveComponent(component.id)
  }

  const handleWorkspaceClick = () => {
    if (drawingArrow) {
      setDrawingArrow(false)
      setArrowStart(null)
    }
  }

  const handleArrowClick = (arrow, e) => {
    e.stopPropagation()
    onRemoveArrow(arrow)
  }

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
    <div className="workspace-level2" ref={workspaceRef} onClick={handleWorkspaceClick}>
      <div className="workspace-header">
        <div className="header-top">
          <h3>Your Model</h3>
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === 'move' ? 'active' : ''}`}
              onClick={() => {
                setMode('move')
                setDrawingArrow(false)
                setArrowStart(null)
              }}
            >
              🖱️ Move
            </button>
            <button
              className={`mode-btn ${mode === 'arrow' ? 'active' : ''}`}
              onClick={() => setMode('arrow')}
            >
              ➡️ Arrow
            </button>
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
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX - arrowHeadSize * Math.cos(angle)}
                  y2={toY - arrowHeadSize * Math.sin(angle)}
                  stroke="#0d75bb"
                  strokeWidth="4"
                  className="arrow-line"
                />
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

          {/* Arrow preview */}
          {arrowPreview && (
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
          )}
        </svg>

        {/* Components */}
        <div className="components-canvas">
          {components.length === 0 ? (
            <div className="empty-canvas">
              <div className="empty-icon">🔬</div>
              <p>Add components from the palette below</p>
              <p className="empty-hint">Then drag them to position and draw arrows!</p>
            </div>
          ) : (
            components.map((component) => {
              const position = componentPositions[component.id] || { x: 50, y: 50 }
              const isArrowSource = drawingArrow && arrowStart?.id === component.id

              return (
                <div
                  key={component.id}
                  id={`component-${component.id}`}
                  className={`canvas-component ${isArrowSource ? 'arrow-source' : ''} ${mode === 'arrow' ? 'arrow-mode' : ''}`}
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: mode === 'move' ? 'move' : 'pointer'
                  }}
                  onMouseDown={(e) => handleComponentMouseDown(component, e)}
                  onContextMenu={(e) => handleComponentRightClick(component, e)}
                  title={mode === 'move' ? 'Drag to move • Right-click to remove' : 'Click to draw arrow • Right-click to remove'}
                >
                  <span className="component-icon">{component.icon}</span>
                  <span className="component-label">{component.label}</span>
                </div>
              )
            })
          )}
        </div>
      </div>

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
