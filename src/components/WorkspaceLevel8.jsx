import React, { useState, useEffect, useRef } from 'react'
import './WorkspaceLevel8.css'

const WorkspaceLevel8 = ({ iterationData, onModelFixed }) => {
  const [currentModel, setCurrentModel] = useState(null)
  const [componentPositions, setComponentPositions] = useState({})
  const [selectedArrow, setSelectedArrow] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [showTools, setShowTools] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const workspaceRef = useRef(null)

  // Initialize model when iteration changes
  useEffect(() => {
    if (iterationData && iterationData.brokenModel) {
      // Deep copy the broken model
      setCurrentModel({
        components: JSON.parse(JSON.stringify(iterationData.brokenModel.components)),
        arrows: JSON.parse(JSON.stringify(iterationData.brokenModel.arrows || []))
      })
      setIsFixed(false)
      setSelectedArrow(null)
      setSelectedComponent(null)
      setShowTools(false)
      setShowHint(false)

      // Auto-position components
      const positions = {}
      iterationData.brokenModel.components.forEach((comp, index) => {
        const col = index % 3
        const row = Math.floor(index / 3)
        positions[comp.label] = {
          x: 50 + col * 150,
          y: 50 + row * 120
        }
      })
      setComponentPositions(positions)
    }
  }, [iterationData?.id])

  if (!iterationData || !currentModel) {
    return <div className="workspace-level8">Loading...</div>
  }

  const { brokenModel, expectedBehavior, actualBehavior, goalState, hint } = iterationData

  // Check if model is fixed
  const checkIfFixed = () => {
    if (!currentModel || !goalState) return false

    // Compare components
    if (currentModel.components.length !== goalState.components.length) return false

    for (let i = 0; i < currentModel.components.length; i++) {
      const current = currentModel.components.find(c => c.label === goalState.components[i].label)
      const goal = goalState.components[i]

      if (!current) return false
      if (current.state !== goal.state && goal.state !== undefined) return false
    }

    // Compare arrows
    if (currentModel.arrows.length !== goalState.arrows.length) return false

    for (let goalArrow of goalState.arrows) {
      const matchingArrow = currentModel.arrows.find(
        a => a.from === goalArrow.from &&
             a.to === goalArrow.to &&
             a.type === goalArrow.type
      )
      if (!matchingArrow) return false
    }

    return true
  }

  // Arrow actions
  const handleDeleteArrow = (arrow) => {
    setCurrentModel(prev => ({
      ...prev,
      arrows: prev.arrows.filter(a => !(a.from === arrow.from && a.to === arrow.to))
    }))
    setSelectedArrow(null)
  }

  const handleFlipArrow = (arrow) => {
    setCurrentModel(prev => ({
      ...prev,
      arrows: prev.arrows.map(a =>
        (a.from === arrow.from && a.to === arrow.to)
          ? { ...a, from: a.to, to: a.from }
          : a
      )
    }))
    setSelectedArrow(null)
  }

  const handleChangeArrowType = (arrow) => {
    setCurrentModel(prev => ({
      ...prev,
      arrows: prev.arrows.map(a =>
        (a.from === arrow.from && a.to === arrow.to)
          ? { ...a, type: a.type === 'positive' ? 'negative' : 'positive' }
          : a
      )
    }))
    setSelectedArrow(null)
  }

  const handleAddArrow = (from, to, type) => {
    // Check if arrow already exists
    const exists = currentModel.arrows.some(a => a.from === from && a.to === to)
    if (exists) return

    setCurrentModel(prev => ({
      ...prev,
      arrows: [...prev.arrows, { from, to, type }]
    }))
  }

  // Component state actions
  const handleToggleComponentState = (component) => {
    setCurrentModel(prev => ({
      ...prev,
      components: prev.components.map(c =>
        c.label === component.label
          ? { ...c, state: c.state === 'ON' ? 'OFF' : 'ON' }
          : c
      )
    }))
    setSelectedComponent(null)
  }

  // Validate and submit
  const handleCheckSolution = () => {
    const fixed = checkIfFixed()
    setIsFixed(fixed)

    if (onModelFixed) {
      onModelFixed(fixed)
    }
  }

  const handleArrowClick = (arrow) => {
    setSelectedArrow(arrow)
    setSelectedComponent(null)
  }

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setSelectedArrow(null)
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

  const getArrowPath = (fromLabel, toLabel, containerRef) => {
    const fromEl = document.getElementById(`current-component-${fromLabel}`)
    const toEl = document.getElementById(`current-component-${toLabel}`)
    if (!fromEl || !toEl || !containerRef) return null

    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const workspace = containerRef.getBoundingClientRect()

    const fromX = fromRect.left + fromRect.width / 2 - workspace.left
    const fromY = fromRect.top + fromRect.height / 2 - workspace.top
    const toX = toRect.left + toRect.width / 2 - workspace.left
    const toY = toRect.top + toRect.height / 2 - workspace.top

    return { fromX, fromY, toX, toY }
  }

  const getGoalArrowPath = (fromLabel, toLabel) => {
    const fromEl = document.getElementById(`goal-component-${fromLabel}`)
    const toEl = document.getElementById(`goal-component-${toLabel}`)
    const goalRef = document.getElementById('goal-workspace')
    if (!fromEl || !toEl || !goalRef) return null

    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const workspace = goalRef.getBoundingClientRect()

    const fromX = fromRect.left + fromRect.width / 2 - workspace.left
    const fromY = fromRect.top + fromRect.height / 2 - workspace.top
    const toX = toRect.left + toRect.width / 2 - workspace.left
    const toY = toRect.top + toRect.height / 2 - workspace.top

    return { fromX, fromY, toX, toY }
  }

  return (
    <div className="workspace-level8">
      <div className="workspace-header">
        <div className="header-content">
          <h3>Debug Mode</h3>
          <p className="header-subtitle">Find and fix the errors in this broken model</p>
        </div>
        <button
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
        >
          <span className="hint-icon">💡</span>
          {showHint ? 'Hide' : 'Show'} Hint
        </button>
      </div>

      {/* Hint Banner */}
      {showHint && hint && (
        <div className="hint-banner">
          <span className="hint-icon">💡</span>
          <p>{hint}</p>
        </div>
      )}

      {/* Behavior Comparison */}
      <div className="behavior-section">
        <div className="behavior-card expected">
          <div className="behavior-header">
            <span className="behavior-icon">✅</span>
            <h4>Expected Behavior</h4>
          </div>
          <p>{expectedBehavior}</p>
        </div>
        <div className="behavior-card actual">
          <div className="behavior-header">
            <span className="behavior-icon">❌</span>
            <h4>Current Problem</h4>
          </div>
          <p>{actualBehavior}</p>
        </div>
      </div>

      {/* Side-by-side Model View */}
      <div className="models-container">
        {/* Current (Broken) Model */}
        <div className="model-panel current">
          <div className="panel-header">
            <h4>Current Model (Fix This!)</h4>
          </div>
          <div
            className="model-workspace"
            ref={workspaceRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg className="arrows-layer">
              {currentModel.arrows.map((arrow, index) => {
                const path = getArrowPath(arrow.from, arrow.to, workspaceRef.current)
                if (!path) return null

                const { fromX, fromY, toX, toY } = path
                const angle = Math.atan2(toY - fromY, toX - fromX)
                const arrowHeadSize = 10
                const isPositive = arrow.type === 'positive'
                const color = isPositive ? '#27ae60' : '#e74c3c'
                const isSelected = selectedArrow && selectedArrow.from === arrow.from && selectedArrow.to === arrow.to

                return (
                  <g
                    key={index}
                    className={`arrow-group ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleArrowClick(arrow)}
                  >
                    <line
                      x1={fromX}
                      y1={fromY}
                      x2={toX - arrowHeadSize * Math.cos(angle)}
                      y2={toY - arrowHeadSize * Math.sin(angle)}
                      stroke={color}
                      strokeWidth={isSelected ? '5' : '3'}
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
                      y={(fromY + toY) / 2 - 8}
                      fill={color}
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {isPositive ? '+' : '-'}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="components-layer">
              {currentModel.components.map((component, index) => {
                const position = componentPositions[component.label] || { x: 50, y: 50 }
                const isSelected = selectedComponent?.label === component.label
                const isOn = component.state === 'ON'

                return (
                  <div
                    key={index}
                    id={`current-component-${component.label}`}
                    className={`model-component ${isSelected ? 'selected' : ''} ${isOn ? 'state-on' : 'state-off'}`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`
                    }}
                    onClick={() => handleComponentClick(component)}
                  >
                    <span className="component-icon">{component.icon}</span>
                    <span className="component-label">{component.label}</span>
                    {component.state !== undefined && (
                      <span className={`state-badge ${isOn ? 'on' : 'off'}`}>
                        {isOn ? 'ON' : 'OFF'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Editing Tools */}
          {(selectedArrow || selectedComponent) && (
            <div className="tools-panel">
              {selectedArrow && (
                <div className="tool-group">
                  <h5>Arrow Tools</h5>
                  <div className="tool-buttons">
                    <button
                      className="tool-btn delete"
                      onClick={() => handleDeleteArrow(selectedArrow)}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="tool-btn flip"
                      onClick={() => handleFlipArrow(selectedArrow)}
                    >
                      🔄 Flip Direction
                    </button>
                    <button
                      className="tool-btn type"
                      onClick={() => handleChangeArrowType(selectedArrow)}
                    >
                      {selectedArrow.type === 'positive' ? '➖ Make Negative' : '➕ Make Positive'}
                    </button>
                  </div>
                </div>
              )}
              {selectedComponent && (
                <div className="tool-group">
                  <h5>Component Tools</h5>
                  <div className="tool-buttons">
                    <button
                      className="tool-btn state"
                      onClick={() => handleToggleComponentState(selectedComponent)}
                    >
                      {selectedComponent.state === 'ON' ? '⭕ Turn OFF' : '💡 Turn ON'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Goal Model */}
        <div className="model-panel goal">
          <div className="panel-header">
            <h4>Expected Model</h4>
          </div>
          <div className="model-workspace" id="goal-workspace">
            <svg className="arrows-layer">
              {goalState.arrows.map((arrow, index) => {
                const path = getGoalArrowPath(arrow.from, arrow.to)
                if (!path) return null

                const { fromX, fromY, toX, toY } = path
                const angle = Math.atan2(toY - fromY, toX - fromX)
                const arrowHeadSize = 10
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
                      strokeWidth="3"
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
                      y={(fromY + toY) / 2 - 8}
                      fill={color}
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {isPositive ? '+' : '-'}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="components-layer">
              {goalState.components.map((component, index) => {
                const position = componentPositions[component.label] || { x: 50, y: 50 }
                const isOn = component.state === 'ON'

                return (
                  <div
                    key={index}
                    id={`goal-component-${component.label}`}
                    className={`model-component ${isOn ? 'state-on' : 'state-off'}`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`
                    }}
                  >
                    <span className="component-icon">{component.icon}</span>
                    <span className="component-label">{component.label}</span>
                    {component.state !== undefined && (
                      <span className={`state-badge ${isOn ? 'on' : 'off'}`}>
                        {isOn ? 'ON' : 'OFF'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Check Solution Button */}
      <div className="actions-section">
        <button
          className="check-button"
          onClick={handleCheckSolution}
        >
          🔍 Check My Solution
        </button>

        {/* Result Feedback */}
        {isFixed !== null && (
          <div className={`result-feedback ${isFixed ? 'correct' : 'incorrect'}`}>
            {isFixed ? (
              <>
                <span className="result-icon">🎉</span>
                <div className="result-text">
                  <h4>Perfect!</h4>
                  <p>You fixed the model correctly!</p>
                </div>
              </>
            ) : (
              <>
                <span className="result-icon">🤔</span>
                <div className="result-text">
                  <h4>Not quite there yet</h4>
                  <p>Keep debugging! Compare your model with the expected model.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Instructions Footer */}
      <div className="workspace-footer">
        <div className="instructions">
          <span className="instruction-item">🎯 <strong>Click arrows or components</strong> to edit</span>
          <span className="instruction-item">🔄 <strong>Compare</strong> current vs expected</span>
          <span className="instruction-item">💡 <strong>Use hint</strong> if stuck</span>
          <span className="instruction-item">✅ <strong>Check solution</strong> when ready</span>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLevel8
