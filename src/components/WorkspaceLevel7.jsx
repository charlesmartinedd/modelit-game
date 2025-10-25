import React, { useState, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './WorkspaceLevel7.css'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const WorkspaceLevel7 = ({ iterationData, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Reset state when iteration changes
  useEffect(() => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowHint(false)
  }, [iterationData.id])

  if (!iterationData || !iterationData.goalState) {
    return <div className="workspace-level7">Loading...</div>
  }

  const { goalState, availableAnswers, hint } = iterationData
  const { graphData, question, correctAnswer } = goalState

  // Prepare chart data
  const getChartData = () => {
    const isMultiComponent = graphData.components && Array.isArray(graphData.components)

    // Generate time steps for X-axis
    let maxLength = 0
    if (isMultiComponent) {
      maxLength = Math.max(...Object.values(graphData.dataPoints).map(arr => arr.length))
    } else {
      maxLength = graphData.dataPoints.length
    }
    const timeSteps = Array.from({ length: maxLength }, (_, i) => `T${i}`)

    // Color palette for different components
    const componentColors = [
      { border: '#0d75bb', bg: 'rgba(13, 117, 187, 0.1)' }, // Primary blue
      { border: '#E67E22', bg: 'rgba(230, 126, 34, 0.1)' },  // Orange
      { border: '#27ae60', bg: 'rgba(39, 174, 96, 0.1)' },   // Green
      { border: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)' }    // Red
    ]

    const datasets = []

    if (isMultiComponent) {
      // Multiple components
      graphData.components.forEach((component, index) => {
        const color = componentColors[index % componentColors.length]
        datasets.push({
          label: component,
          data: graphData.dataPoints[component],
          borderColor: color.border,
          backgroundColor: color.bg,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: color.border,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        })
      })
    } else {
      // Single component
      const color = componentColors[0]
      datasets.push({
        label: graphData.component,
        data: graphData.dataPoints,
        borderColor: color.border,
        backgroundColor: color.bg,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: color.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      })
    }

    return {
      labels: timeSteps,
      datasets
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Segoe UI', 'Arial', sans-serif",
            weight: '600'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(35, 35, 35, 0.95)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '600'
          },
          color: '#727272'
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#232323'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '600'
          },
          color: '#727272'
        },
        title: {
          display: true,
          text: 'Value',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#232323'
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  const handleAnswerClick = (answer) => {
    if (isSubmitted) return
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    setIsSubmitted(true)
    const correct = selectedAnswer === correctAnswer
    setIsCorrect(correct)

    // Call parent callback
    if (onAnswerSubmit) {
      onAnswerSubmit(correct, selectedAnswer)
    }
  }

  const chartData = getChartData()

  return (
    <div className="workspace-level7">
      <div className="workspace-header">
        <h3>Data Analysis</h3>
        <p className="header-subtitle">Read the graph and answer the question below</p>
      </div>

      <div className="content-container">
        {/* Graph Display Section */}
        <div className="graph-section">
          <div className="graph-container">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Threshold indicator if present */}
          {graphData.threshold !== undefined && (
            <div className="threshold-info">
              <span className="threshold-label">Threshold:</span>
              <span className="threshold-value">{graphData.threshold}</span>
            </div>
          )}
        </div>

        {/* Question and Answers Section */}
        <div className="question-section">
          <div className="question-card">
            <div className="question-header">
              <span className="question-icon">❓</span>
              <h4>Question</h4>
            </div>
            <p className="question-text">{question}</p>
          </div>

          <div className="answers-container">
            {availableAnswers.map((answer, index) => {
              const isSelected = selectedAnswer === answer
              const isCorrectAnswer = isSubmitted && answer === correctAnswer
              const isWrongAnswer = isSubmitted && isSelected && answer !== correctAnswer

              return (
                <button
                  key={index}
                  className={`answer-option ${isSelected ? 'selected' : ''} ${isCorrectAnswer ? 'correct' : ''} ${isWrongAnswer ? 'wrong' : ''}`}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isSubmitted}
                >
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="answer-text">{answer}</span>
                  {isCorrectAnswer && <span className="result-icon">✓</span>}
                  {isWrongAnswer && <span className="result-icon">✗</span>}
                </button>
              )
            })}
          </div>

          {/* Hint Section */}
          {!isSubmitted && hint && (
            <div className="hint-section">
              <button
                className={`hint-toggle ${showHint ? 'active' : ''}`}
                onClick={() => setShowHint(!showHint)}
              >
                <span className="hint-icon">💡</span>
                {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
              {showHint && (
                <div className="hint-content">
                  {hint}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!isSubmitted && (
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          )}

          {/* Result Feedback */}
          {isSubmitted && (
            <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-icon-large">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <div className="result-message">
                {isCorrect ? (
                  <>
                    <h4>Excellent!</h4>
                    <p>You correctly interpreted the data!</p>
                  </>
                ) : (
                  <>
                    <h4>Not quite!</h4>
                    <p>The correct answer is: <strong>{correctAnswer}</strong></p>
                    {hint && (
                      <p className="result-hint">
                        <span className="hint-icon">💡</span>
                        {hint}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with instructions */}
      <div className="workspace-footer">
        <div className="instructions">
          <span className="instruction-item">📊 <strong>Study the graph</strong></span>
          <span className="instruction-item">🤔 <strong>Think about patterns</strong></span>
          <span className="instruction-item">✅ <strong>Select your answer</strong></span>
          {!isSubmitted && <span className="instruction-item">💡 <strong>Use hint if needed</strong></span>}
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLevel7
