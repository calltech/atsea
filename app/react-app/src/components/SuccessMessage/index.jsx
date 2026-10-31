import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/Button'
import './styles.css'

const SuccessMessage = ({ message, label, handleClick, to }) => {
  const styles = {
    color: '#fff',
    backgroundColor: '#099CEC',
  }
  const labelStyles = {
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontWeight: 600,
  }
  return (
    <div className="successContainer">
      <div className="successMessage">
        {message}
      </div>
      <div className="successButton">
        <Button
          label={label}
          onClick={handleClick}
          to={to}
          style={styles}
          labelStyle={labelStyles}
        />
      </div>
    </div>
  )
}

SuccessMessage.propTypes = {
  label: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  to: PropTypes.string,
}

export default SuccessMessage
