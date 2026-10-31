import React from 'react'
import PropTypes from 'prop-types'
import './ui.css'

const TextField = ({
  type = 'text',
  name,
  value,
  onChange,
  hintText,
  placeholder,
  errorText,
}) => (
  <div className="uiTextField">
    <input
      className={`uiInput${errorText ? ' uiInputError' : ''}`}
      type={type}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      placeholder={hintText || placeholder || ''}
    />
    {errorText ? <div className="uiErrorMessage">{errorText}</div> : null}
  </div>
)

TextField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  hintText: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.node,
}

export default TextField
