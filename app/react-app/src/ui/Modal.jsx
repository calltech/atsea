import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './ui.css'

const Modal = ({ isOpen, onRequestClose, children, contentLabel }) => {
  useEffect(() => {
    if (!isOpen || !onRequestClose) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onRequestClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onRequestClose])

  if (!isOpen) return null

  return (
    <div
      className="uiOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && onRequestClose) onRequestClose()
      }}
    >
      <div className="uiModal" role="dialog" aria-modal="true" aria-label={contentLabel || 'Dialog'}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
  contentLabel: PropTypes.string,
}

export default Modal
