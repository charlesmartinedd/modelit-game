import React, { useState, useRef, useEffect } from 'react'
import './WorkspaceLevel10.css'

const WorkspaceLevel10 = ({
  components,
  arrows,
  onRemoveComponent,
  onAddArrow,
  onRemoveArrow,
  onUpdateComponentState,
  scenario = '',
  hint = '',
  isMultiScale = false,
  availableScales = []
}) => {
  const [mode, setMode] = useState('move')
  const [arrowType, setArrowType] = useState('positive')
  const [drawingArrow, setDrawingArrow] = useState(false)
  const [arrowStart, setArrowStart] = useState(null)
  const [componentPositions, setComponentPositions] = useState({})
  const [dragging, setDragging] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [activeScale, setActiveScale] = useState(availableScales[0] || null)
  const [scenarioExpanded, setScenarioExpanded] = useState(true)
  const workspaceRef = useRef(null)

  // Determine if we're using multi-scale mode
  const scales = isMultiScale ? [...new Set(components.map(c => c.scale))].filter(Boolean) : []
  const displayScales = scales.length > 0 ? scales : availableScales

  // Filter components by scale if multi-scale
  const visibleComponents = isMultiScale && activeScale
    ? components.filter(c => c.scale === activeScale)
    : components

  // Get arrows for current view
  const visibleArrows = isMultiScale && activeScale
    ? arrows.filter(arrow => {
        const fromComp = components.find(c => c.id === arrow.fromId)
        const toComp = components.find(c => c.id === arrow.toId)
        return fromComp && toComp && fromComp.scale === toComp.scale && fromComp.scale === activeScale
      })
    : arrows

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

  // Handle mouse move
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
      if (dragging) setDragging(null)
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
      if (drawingArrow && arrowStart && arrowStart.id !== component.id) {
        onAddArrow({
          from: arrowStart.label,
          to: component.label,
          fromId: arrowStart.id,
          toId: component.id,
          type: arrowType,
          crossScale: isMultiScale && arrowStart.scale !== component.scale,
          fromScale: arrowStart.scale,
          toScale: component.scale
        })
        setDrawingArrow(false)
        setArrowStart(null)
      } else if (!drawingArrow) {
        setDrawingArrow(true)
        setArrowStart(component)
      } else {
        setDrawingArrow(false)
        setArrowStart(null)
      }
    } else if (mode === 'state') {
      setSelectedComponent(component)
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
    if (selectedComponent) {
      setSelectedComponent(null)
    }
  }

  // Drag and drop handlers
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

  const handleStateChange = (componentId, newState) => {
    onUpdateComponentState(componentId, newState)
    setSelectedComponent(null)
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
    <div className="workspace-level10">
      {/* Scenario Panel */}
      {scenario && (
        <div className={`scenario-panel ${scenarioExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="scenario-header" onClick={() => setScenarioExpanded(!scenarioExpanded)}>
            <div className="scenario-title">
              <span className="scenario-icon">📋</span>
              <span>Challenge Scenario</span>
            </div>
            <button className="toggle-btn">
              {scenarioExpanded ? '▼' : '▶'}
            </button>
          </div>
          {scenarioExpanded && (
            <div className="scenario-content">
              <p className="scenario-text">{scenario}</p>
              {hint && (
                <div className="scenario-hint">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">{hint}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="workspace-header">
        <div className="header-top">
          <h3>
            <span className="level-badge">FINAL LEVEL</span>
            Complete Model
          </h3>
          <div className="controls-group">
            <div className="mode-toggle">
              <button
                className={`mode-btn ${mode === 'move' ? 'active' : ''}`}
                onClick={() => {
                  setMode('move')
                  setDrawingArrow(false)
                  setArrowStart(null)
                  setSelectedComponent(null)
                }}
              >
                🖱️ Move
              </button>
              <button
                className={`mode-btn ${mode === 'arrow' ? 'active' : ''}`}
                onClick={() => {
                  setMode('arrow')
                  setSelectedComponent(null)
                }}
              >
                ➡️ Arrow
              </button>
              <button
                className={`mode-btn ${mode === 'state' ? 'active' : ''}`}
                onClick={() => {
                  setMode('state')
                  setDrawingArrow(false)
                  setArrowStart(null)
                }}
              >
                ⚙️ State
              </button>
            </div>
            {mode === 'arrow' && (
              <div className="arrow-type-selector">
                <button
                  className={`type-btn positive ${arrowType === 'positive' ? 'active' : ''}`}
                  onClick={() => setArrowType('positive')}
                >
                  + Activation
                </button>
                <button
                  className={`type-btn negative ${arrowType === 'negative' ? 'active' : ''}`}
                  onClick={() => setArrowType('negative')}
                >
                  - Inhibition
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scale Tabs (if multi-scale) */}
        {isMultiScale && displayScales.length > 0 && (
          <div className="scale-tabs">
            {displayScales.map((scale) => {
              const scaleComponents = components.filter(c => c.scale === scale)
              const hasComponents = scaleComponents.length > 0

              return (
                <button
                  key={scale}
                  className={`scale-tab ${activeScale === scale ? 'active' : ''} ${hasComponents ? 'has-components' : ''}`}
                  onClick={() => setActiveScale(scale)}
                >
                  <span className="scale-icon">{getScaleIcon(scale)}</span>
                  <span className="scale-name">{scale}</span>
                  {hasComponents && <span className="component-count">{scaleComponents.length}</span>}
                </button>
              )
            })}
          </div>
        )}

        <div className="workspace-instructions">
          {mode === 'move' && <span>💡 Build your complete model - use ALL skills from Levels 1-9!</span>}
          {mode === 'arrow' && !drawingArrow && <span>🎯 Draw arrows to show relationships (+ activation, - inhibition)</span>}
          {mode === 'arrow' && drawingArrow && (
            <span className="drawing-mode">
              ✨ Click another component to complete the {arrowType === 'positive' ? 'green (+)' : 'red (-)'} arrow!
            </span>
          )}
          {mode === 'state' && <span>⚙️ Set initial states (ON/OFF) to prepare for simulation</span>}
        </div>
      </div>

      <div
        className="canvas-container"
        ref={workspaceRef}
        onClick={handleWorkspaceClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <svg className="arrows-layer">
          {visibleArrows.map((arrow, index) => {
            const path = getArrowPath(arrow.fromId, arrow.toId)
            if (!path) return null

            const { fromX, fromY, toX, toY } = path
            const angle = Math.atan2(toY - fromY, toX - fromX)
            const arrowHeadSize = 12
            const isPositive = arrow.type === 'positive'
            const color = isPositive ? '#27ae60' : '#e74c3c'

            return (
              <g key={index} className="arrow-group">
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX - arrowHeadSize * Math.cos(angle)}
                  y2={toY - arrowHeadSize * Math.sin(angle)}
                  stroke={color}
                  strokeWidth="4"
                  className="arrow-line"
                />
                <polygon
                  points={`
                    ${toX},${toY}
                    ${toX - arrowHeadSize * Math.cos(angle - Math.PI / 6)},${toY - arrowHeadSize * Math.sin(angle - Math.PI / 6)}
                    ${toX - arrowHeadSize * Math.cos(angle + Math.PI / 6)},${toY - arrowHeadSize * Math.sin(angle + Math.PI / 6)}
                  `}
                  fill={color}
                  className="arrow-head"
                />
                <text
                  x={(fromX + toX) / 2}
                  y={(fromY + toY) / 2 - 10}
                  fill={color}
                  fontSize="20"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {isPositive ? '+' : '-'}
                </text>
              </g>
            )
          })}

          {arrowPreview && (
            <>
              <line
                x1={arrowPreview.fromX}
                y1={arrowPreview.fromY}
                x2={arrowPreview.toX}
                y2={arrowPreview.toY}
                stroke={arrowType === 'positive' ? '#27ae60' : '#e74c3c'}
                strokeWidth="3"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <text
                x={(arrowPreview.fromX + arrowPreview.toX) / 2}
                y={(arrowPreview.fromY + arrowPreview.toY) / 2 - 10}
                fill={arrowType === 'positive' ? '#27ae60' : '#e74c3c'}
                fontSize="20"
                fontWeight="bold"
                textAnchor="middle"
                opacity="0.7"
              >
                {arrowType === 'positive' ? '+' : '-'}
              </text>
            </>
          )}
        </svg>

        <div className="components-canvas">
          {visibleComponents.length === 0 ? (
            <div className="empty-canvas">
              <div className="empty-icon">🎓</div>
              <p className="empty-title">You're a modeling master!</p>
              <p>Build your complete biological model from scratch</p>
              <p className="empty-hint">Add components, draw arrows, set states, and simulate!</p>
              <div className="skills-checklist">
                <div className="skill-item">✓ Components & Connections</div>
                <div className="skill-item">✓ Activation & Inhibition</div>
                <div className="skill-item">✓ States & Logic</div>
                <div className="skill-item">✓ Simulation & Debugging</div>
                {isMultiScale && <div className="skill-item">✓ Multi-Scale Systems</div>}
              </div>
            </div>
          ) : (
            visibleComponents.map((component) => {
              const position = componentPositions[component.id] || { x: 50, y: 50 }
              const isArrowSource = drawingArrow && arrowStart?.id === component.id
              const isSelected = selectedComponent?.id === component.id
              const isOn = component.state === 'ON'

              return (
                <div key={component.id}>
                  <div
                    id={`component-${component.id}`}
                    className={`canvas-component ${isArrowSource ? 'arrow-source' : ''} ${isSelected ? 'selected' : ''} ${isOn ? 'state-on' : 'state-off'}`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      cursor: mode === 'move' ? 'move' : 'pointer'
                    }}
                    onMouseDown={(e) => mode === 'move' && handleComponentMouseDown(component, e)}
                    onClick={(e) => (mode === 'arrow' || mode === 'state') && handleComponentMouseDown(component, e)}
                    onContextMenu={(e) => handleComponentRightClick(component, e)}
                  >
                    <span className="component-icon">{component.icon}</span>
                    <span className="component-label">{component.label}</span>
                    <div className="state-indicator">
                      <span className={`state-badge ${isOn ? 'on' : 'off'}`}>
                        {isOn ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    {isMultiScale && component.scale && (
                      <div className="scale-badge">{component.scale}</div>
                    )}
                  </div>

                  {isSelected && mode === 'state' && (
                    <div
                      className="state-popup"
                      style={{
                        left: `${position.x + 120}px`,
                        top: `${position.y}px`
                      }}
                    >
                      <div className="popup-header">Set State</div>
                      <button
                        className="state-option on"
                        onClick={() => handleStateChange(component.id, 'ON')}
                      >
                        💡 ON
                      </button>
                      <button
                        className="state-option off"
                        onClick={() => handleStateChange(component.id, 'OFF')}
                      >
                        ⭕ OFF
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      
    </div>
  )
}

// Helper function to get scale icon
const getScaleIcon = (scale) => {
  const icons = {
    'Molecular': '⚛️',
    'Genetic': '🧬',
    'Cellular': '🔬',
    'Tissue': '🧫',
    'Organ': '🫀',
    'Organism': '🧍',
    'Ecosystem': '🌍'
  }
  return icons[scale] || '🔬'
}

export default WorkspaceLevel10
