// Sound Effects Manager
// Using web Audio API for simple, high-quality sounds

class SoundManager {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.enabled = true
    this.volume = 0.3
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  // Generate sound using oscillators (no file downloads needed!)
  playTone(frequency, duration, type = 'sine', volume = this.volume) {
    if (!this.enabled) return

    this.init()
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    )

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  // Click sound - short, pleasant beep
  click() {
    this.playTone(800, 0.1, 'sine', 0.2)
  }

  // Add component - higher pitch, quick
  addComponent() {
    const ctx = this.audioContext || new (window.AudioContext || window.webkitAudioContext)()
    this.audioContext = ctx

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(523, ctx.currentTime) // C5
    oscillator.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.1) // G5
    oscillator.type = 'triangle'

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }

  // Remove component - lower pitch, descending
  removeComponent() {
    const ctx = this.audioContext || new (window.AudioContext || window.webkitAudioContext)()
    this.audioContext = ctx

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(523, ctx.currentTime) // C5
    oscillator.frequency.exponentialRampToValueAtTime(262, ctx.currentTime + 0.1) // C4
    oscillator.type = 'triangle'

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }

  // Success - triumphant chord progression
  success(streak = 0) {
    const ctx = this.audioContext || new (window.AudioContext || window.webkitAudioContext)()
    this.audioContext = ctx

    // More intense sound for higher streaks
    const baseNotes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    const megaNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51] // Add E6 for mega streaks

    const notes = streak >= 5 ? megaNotes : baseNotes
    const volume = Math.min(0.3, 0.2 + (streak * 0.01))

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = freq
      oscillator.type = streak >= 10 ? 'square' : 'triangle'

      const startTime = ctx.currentTime + i * 0.08
      gainNode.gain.setValueAtTime(volume, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })

    // Extra sparkle for mega streaks
    if (streak >= 10) {
      setTimeout(() => this.playTone(1568, 0.2, 'sine', 0.25), 200)
    }
  }

  // Timer warning - pulsing beep
  timerWarning() {
    this.playTone(440, 0.2, 'square', 0.15)
  }

  // Level complete - fanfare!
  levelComplete() {
    const ctx = this.audioContext || new (window.AudioContext || window.webkitAudioContext)()
    this.audioContext = ctx

    // C major scale going up
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      const startTime = ctx.currentTime + i * 0.08
      gainNode.gain.setValueAtTime(0.25, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.4)
    })
  }

  // Hover sound - subtle
  hover() {
    this.playTone(600, 0.05, 'sine', 0.1)
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol))
  }
}

// Create singleton instance
const soundManager = new SoundManager()

export default soundManager
