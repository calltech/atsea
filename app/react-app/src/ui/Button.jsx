import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './ui.css'

const Button = ({
  label,
  children,
  onClick,
  to,
  type = 'button',
  fullWidth = false,
  style,
  labelStyle,
  icon,
  disabled = false,
}) => {
  const className = `uiButton${fullWidth ? ' uiButtonFull' : ''}`
  const content = (
    <>
      {icon}
      <span className="uiButtonLabel" style={labelStyle}>{label || children}</span>
    </>
  )

  if (to) {
    return <Link to={to} className={className} style={style}>{content}</Link>
  }

  return (
    <button type={type} className={className} onClick={onClick} style={style} disabled={disabled}>
      {content}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
}

export default Button
