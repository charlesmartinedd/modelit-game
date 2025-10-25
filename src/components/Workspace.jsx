import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Workspace.css'

const Workspace = ({ components, onRemove }) => {
  return (
    <div className="workspace">
      <div className="workspace-header">
        <span className="emoji">🔬</span>
        <h3>Your Workspace</h3>
        {components.length > 0 && (
          <span className="component-count">{components.length} added</span>
        )}
      </div>

      <div className="workspace-canvas">
        {components.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="empty-icon emoji">👇</div>
            <p>Tap components below to add them here!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                className="workspace-component"
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  x: (index % 3) * 140 + 20,
                  y: Math.floor(index / 3) * 140 + 20
                }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRemove(component.id)}
              >
                <div className="component-icon emoji">{component.icon}</div>
                <div className="component-label">{component.label}</div>
                <div className="remove-hint">Tap to remove</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Workspace
