import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  checkout,
  purchaseOrder,
} from '../actions'
import { getTotal, getCartProducts, getTotalProducts } from '../reducers'
import SuccessMessage from '../components/SuccessMessage'
import Checkout from '../components/Checkout'

class CheckoutContainer extends Component {
  state = {
    orderComplete: false,
  }

  handleSuccess = () => {
    this.setState({ orderComplete: true })
  }

  handleSubmit = async () => {
    const { totalProducts, purchaseOrder } = this.props

    if (totalProducts === 0) {
      throw new Error('Please add to cart first...')
    }

    try {
      await purchaseOrder()
      this.handleSuccess()
    } catch (err) {
      throw new Error('Please login before completing order...')
    }
  }

  renderCheckout() {
    const { products, total, totalProducts, checkout } = this.props
    return (
      <Checkout
        products={products}
        total={total}
        totalProducts={totalProducts}
        onCheckoutClicked={() => checkout(products)}
        handleSubmit={this.handleSubmit}
      />
    )
  }

  renderSuccess() {
    return (
      <SuccessMessage
        message="You have successfully placed an order!"
        label="Continue Shopping"
        to="/"
      />
    )
  }

  render() {
    return (
      <div>
        {this.state.orderComplete
          ? this.renderSuccess()
          : this.renderCheckout()}
      </div>
    )
  }
}

CheckoutContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  total: PropTypes.string,
  totalProducts: PropTypes.number,
  purchaseOrder: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state),
  totalProducts: getTotalProducts(state),
})

export default connect(
  mapStateToProps,
  { checkout, purchaseOrder }
)(CheckoutContainer)
