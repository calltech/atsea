import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/Button'
import AddIcon from './AddIcon'
import './styles.css'

export default class GridTile extends Component {
  addToCart = () => {
    const { onAddToCartClicked, productId } = this.props
    onAddToCartClicked(productId)
  }

  render() {
    const { price, name, description, image } = this.props
    return (
      <div className="tile">
        <div className="tileImage">
          <img
            alt="Logo"
            src={image}
          />
        </div>
        <div className="tileTitle">
          {name}
        </div>
        <div className="tileDescription">
          {description}
        </div>
        <div className="titleBottom">
          <div className="tilePrice">
            {price}
          </div>
          <div className="tileAdd">
            <Button
              onClick={this.addToCart}
              labelStyle={{ color: '#099CEC' }}
              label="Add"
              icon={<AddIcon />}
            />
          </div>
        </div>
      </div>
    )
  }
}

GridTile.propTypes = {
  productId: PropTypes.number,
  price: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onAddToCartClicked: PropTypes.func.isRequired,
}
