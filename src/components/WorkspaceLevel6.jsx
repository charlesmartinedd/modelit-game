import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkspaceLevel6.css'

const WorkspaceLevel6 = ({
  components,
  arrows,
  onRemoveComponent,
  onAddArrow,
  onRemoveArrow,
  onUpdateComponentState,
  expectedOutcome = []
}) => {
  const [mode, setMode] = useState('move')
  const [arrowType, setArrowType] = useState('positive')
  const [drawingArrow, setDrawingArrow] = useState(false)
  const [arrowStart, setArrowStart] = useState(null)
  const [componentPositions, setComponentPositions] = useState({})
  const [dragging, setDragging] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedComponent, setSelectedComponent] = useState(null)

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [simulationHistory, setSimulationHistory] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  const workspaceRef = useRef(null)
  const simulationIntervalRef = useRef(null)

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

  // Cleanup simulation interval on unmount
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current)
      }
    }
  }, [])

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
          type: arrowType
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

  const handleStateChange = (componentId, newState) => {
    onUpdateComponentState(componentId, newState)
    setSelectedComponent(null)
  }

  // Simulation Logic
  const runSimulationStep = (currentComponents) => {
    const newComponents = [...currentComponents]
    const componentMap = new Map(newComponents.map(c => [c.label, c]))

    // Process each arrow to determine state changes
    arrows.forEach(arrow => {
      const sourceComp = componentMap.get(arrow.from)
      const targetComp = componentMap.get(arrow.to)

      if (sourceComp && targetComp) {
        if (arrow.type === 'positive') {
          // Activation: if source is ON, turn target ON
          if (sourceComp.state === 'ON') {
            targetComp.state = 'ON'
          }
        } else if (arrow.type === 'negative') {
          // Inhibition: if source is ON, turn target OFF
          if (sourceComp.state === 'ON') {
            targetComp.state = 'OFF'
          }
        }
      }
    })

    return newComponents
  }

  const startSimulation = () => {
    if (components.length === 0 || arrows.length === 0) {
      alert('Add components and arrows before running simulation!')
      return
    }

    setIsSimulating(true)
    setIsPlaying(true)
    setCurrentStep(0)

    // Initialize history with current state
    const initialState = components.map(c => ({ ...c }))
    const history = [initialState]

    // Run simulation for multiple steps
    let currentState = initialState
    const maxSteps = expectedOutcome.length > 0 ? expectedOutcome.length : 5

    for (let step = 1; step < maxSteps; step++) {
      currentState = runSimulationStep(currentState)
      history.push(currentState.map(c => ({ ...c })))
    }

    setSimulationHistory(history)

    // Auto-play through steps
    let stepIndex = 0
    simulationIntervalRef.current = setInterval(() => {
      stepIndex++
      if (stepIndex >= history.length) {
        clearInterval(simulationIntervalRef.current)
        setIsPlaying(false)
      } else {
        setCurrentStep(stepIndex)
        // Update component states in parent
        history[stepIndex].forEach(comp => {
          onUpdateComponentState(comp.id, comp.state)
        })
      }
    }, 1500) // 1.5 seconds per step
  }

  const pauseSimulation = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
      simulationIntervalRef.current = null
    }
    setIsPlaying(false)
  }

  const resumeSimulation = () => {
    if (!isPlaying && currentStep < simulationHistory.length - 1) {
      setIsPlaying(true)
      let stepIndex = currentStep

      simulationIntervalRef.current = setInterval(() => {
        stepIndex++
        if (stepIndex >= simulationHistory.length) {
          clearInterval(simulationIntervalRef.current)
          setIsPlaying(false)
        } else {
          setCurrentStep(stepIndex)
          simulationHistory[stepIndex].forEach(comp => {
            onUpdateComponentState(comp.id, comp.state)
          })
        }
      }, 1500)
    }
  }

  const resetSimulation = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
      simulationIntervalRef.current = null
    }
    setIsSimulating(false)
    setIsPlaying(false)
    setCurrentStep(0)
    setSimulationHistory([])

    // Reset to initial states
    if (simulationHistory.length > 0) {
      simulationHistory[0].forEach(comp => {
        onUpdateComponentState(comp.id, comp.state)
      })
    }
  }

  const stepForward = () => {
    if (currentStep < simulationHistory.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      simulationHistory[nextStep].forEach(comp => {
        onUpdateComponentState(comp.id, comp.state)
      })
    }
  }

  const stepBackward = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      simulationHistory[prevStep].forEach(comp => {
        onUpdateComponentState(comp.id, comp.state)
      })
    }
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
    <div className="workspace-level6">
      <div className="main-workspace" ref={workspaceRef} onClick={handleWorkspaceClick}>
        <div className="workspace-header">
          <div className="header-top">
            <h3>Your Model</h3>
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
                  disabled={isPlaying}
                >
                  🖱️ Move
                </button>
                <button
                  className={`mode-btn ${mode === 'arrow' ? 'active' : ''}`}
                  onClick={() => {
                    setMode('arrow')
                    setSelectedComponent(null)
                  }}
                  disabled={isPlaying}
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
                  disabled={isPlaying}
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
          <div className="workspace-instructions">
            {!isSimulating && mode === 'move' && <span>💡 Build your model, then click PLAY to run simulation!</span>}
            {!isSimulating && mode === 'arrow' && !drawingArrow && <span>🎯 Click a component to start drawing a {arrowType === 'positive' ? 'green (+)' : 'red (-)'} arrow</span>}
            {!isSimulating && mode === 'arrow' && drawingArrow && <span className="drawing-mode">✨ Click another component to complete the arrow!</span>}
            {!isSimulating && mode === 'state' && <span>⚙️ Click a component to toggle its state (ON/OFF)</span>}
            {isSimulating && <span className="sim-mode">🎬 Watching simulation at Step {currentStep + 1} of {simulationHistory.length}</span>}
          </div>
        </div>

        <div className="canvas-container">
          <svg className="arrows-layer">
            {arrows.map((arrow, index) => {
              const path = getArrowPath(arrow.fromId, arrow.toId)
              if (!path) return null

              const { fromX, fromY, toX, toY } = path
              const angle = Math.atan2(toY - fromY, toX - fromX)
              const arrowHeadSize = 12
              const isPositive = arrow.type === 'positive'
              const color = isPositive ? '#27ae60' : '#e74c3c'

              // Animate arrows during simulation
              const isActive = isSimulating && isPlaying

              return (
                <g key={index} className={`arrow-group ${isActive ? 'animating' : ''}`}>
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
                  {isActive && (
                    <motion.circle
                      cx={fromX}
                      cy={fromY}
                      r="5"
                      fill={color}
                      initial={{ cx: fromX, cy: fromY }}
                      animate={{
                        cx: toX,
                        cy: toY
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
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
              </>
            )}
          </svg>

          <div className="components-canvas">
            {components.length === 0 ? (
              <div className="empty-canvas">
                <div className="empty-icon">🔬</div>
                <p>Add components from the palette below</p>
                <p className="empty-hint">Then click PLAY to simulate!</p>
              </div>
            ) : (
              components.map((component) => {
                const position = componentPositions[component.id] || { x: 50, y: 50 }
                const isArrowSource = drawingArrow && arrowStart?.id === component.id
                const isSelected = selectedComponent?.id === component.id
                const isOn = component.state === 'ON'

                return (
                  <div key={component.id}>
                    <motion.div
                      id={`component-${component.id}`}
                      className={`canvas-component ${isArrowSource ? 'arrow-source' : ''} ${isSelected ? 'selected' : ''} ${isOn ? 'state-on' : 'state-off'}`}
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        cursor: mode === 'move' && !isPlaying ? 'move' : 'pointer'
                      }}
                      onMouseDown={(e) => !isPlaying && mode === 'move' && handleComponentMouseDown(component, e)}
                      onClick={(e) => !isPlaying && (mode === 'arrow' || mode === 'state') && handleComponentMouseDown(component, e)}
                      onContextMenu={(e) => !isPlaying && handleComponentRightClick(component, e)}
                      animate={isSimulating ? {
                        scale: isOn ? [1, 1.1, 1] : 1,
                      } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: isSimulating && isOn ? Infinity : 0,
                        repeatDelay: 0.5
                      }}
                    >
                      <span className="component-icon">{component.icon}</span>
                      <span className="component-label">{component.label}</span>
                      <div className="state-indicator">
                        <span className={`state-badge ${isOn ? 'on' : 'off'}`}>
                          {isOn ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </motion.div>

                    {isSelected && mode === 'state' && !isPlaying && (
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

      {/* Simulation Control Panel */}
      <div className="simulation-panel">
        <div className="sim-panel-header">
          <h3>🎬 Simulation Controls</h3>
        </div>

        <div className="sim-controls">
          {!isSimulating ? (
            <button className="sim-btn play" onClick={startSimulation}>
              ▶️ PLAY
            </button>
          ) : (
            <>
              {isPlaying ? (
                <button className="sim-btn pause" onClick={pauseSimulation}>
                  ⏸️ Pause
                </button>
              ) : (
                <button className="sim-btn resume" onClick={resumeSimulation}>
                  ▶️ Resume
                </button>
              )}
              <button className="sim-btn reset" onClick={resetSimulation}>
                🔄 Reset
              </button>
            </>
          )}
        </div>

        {isSimulating && (
          <div className="step-controls">
            <button
              className="step-btn"
              onClick={stepBackward}
              disabled={currentStep === 0 || isPlaying}
            >
              ⏮️
            </button>
            <div className="step-display">
              Step {currentStep + 1} / {simulationHistory.length}
            </div>
            <button
              className="step-btn"
              onClick={stepForward}
              disabled={currentStep >= simulationHistory.length - 1 || isPlaying}
            >
              ⏭️
            </button>
          </div>
        )}

        {/* Timeline View */}
        {isSimulating && simulationHistory.length > 0 && (
          <div className="timeline-view">
            <h4>Timeline</h4>
            <div className="timeline-steps">
              {simulationHistory.map((stepState, stepIndex) => (
                <div
                  key={stepIndex}
                  className={`timeline-step ${stepIndex === currentStep ? 'active' : ''}`}
                  onClick={() => {
                    if (!isPlaying) {
                      setCurrentStep(stepIndex)
                      stepState.forEach(comp => {
                        onUpdateComponentState(comp.id, comp.state)
                      })
                    }
                  }}
                >
                  <div className="step-number">{stepIndex}</div>
                  <div className="step-states">
                    {stepState.map(comp => (
                      <div
                        key={comp.id}
                        className={`mini-state ${comp.state === 'ON' ? 'on' : 'off'}`}
                        title={`${comp.label}: ${comp.state}`}
                      >
                        {comp.icon}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sim-info">
          <p>
            <strong>How it works:</strong>
          </p>
          <ul>
            <li>Build your model with components, arrows, and initial states</li>
            <li>Click PLAY to watch the simulation unfold over time</li>
            <li>Green arrows (+) activate components</li>
            <li>Red arrows (-) inhibit components</li>
            <li>Use step controls to examine each moment</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLevel6
