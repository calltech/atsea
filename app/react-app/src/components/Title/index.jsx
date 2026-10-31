import React from 'react'
import PropTypes from 'prop-types'
import Cart from '../../components/Cart'
import Button from '../../ui/Button'
import './styles.css'
import '../globalStyles.css'

const Title = ({ totalProducts, showItemAdded }) => (
  <div className="globalContainer">
    <div className="titleBar">
      <div className="productsSection">
        Products
      </div>
      <div className="checkout-button">
        <Button
          style={{
            color: '#fff',
            backgroundColor: '#099CEC',
          }}
          labelStyle={{
            textTransform: 'none',
            fontFamily: 'Open Sans',
            fontWeight: 600,
          }}
          label="Checkout"
          to="/checkout"
        />
      </div>
      <Cart
        total={totalProducts}
        showItemAdded={showItemAdded}
      />
    </div>
  </div>
)

Title.propTypes = {
  totalProducts: PropTypes.number,
  showItemAdded: PropTypes.bool,
}

export default Title
