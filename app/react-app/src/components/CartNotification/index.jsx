import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const CartNotification = ({ showItemAdded }) => (
  <div className={`cartNotification${showItemAdded ? ' cartNotificationVisible' : ''}`}>
    Added to your cart
  </div>
)

CartNotification.propTypes = {
  showItemAdded: PropTypes.bool,
}

CartNotification.defaultProps = {
  showItemAdded: false,
}

export default CartNotification
