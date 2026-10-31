import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/Button'
import TextField from '../../ui/TextField'
import './styles.css'

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  cardNumber: '',
  cvv: '',
  expirationDate: '',
  company: '',
  title: '',
  address: '',
  city: '',
}

class CustomerInfoForm extends Component {
  state = {
    values: INITIAL_VALUES,
    error: null,
    submitting: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState(state => ({
      values: { ...state.values, [name]: value },
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ submitting: true, error: null })
    Promise.resolve(this.props.onSubmit(this.state.values))
      .catch(err => this.setState({ error: err.message || 'Unable to complete order.' }))
      .finally(() => this.setState({ submitting: false }))
  }

  renderField(name, hintText, type) {
    return (
      <TextField
        type={type}
        name={name}
        value={this.state.values[name]}
        hintText={hintText}
        onChange={this.handleChange}
      />
    )
  }

  renderCredit() {
    return (
      <div>
        <div className="infoHeader">Credit Card Information</div>
        <div className="infoRow">
          {this.renderField('firstName', 'First Name')}
          {this.renderField('lastName', 'Last Name')}
        </div>
        <div className="infoRow">
          {this.renderField('cardNumber', 'Card Number')}
          {this.renderField('cvv', 'CVV')}
        </div>
        <div className="infoRow">
          {this.renderField('expirationDate', 'MM/YY')}
        </div>
      </div>
    )
  }

  renderBilling() {
    return (
      <div>
        <div className="infoHeader">Billing Information</div>
        <div className="infoRow">
          {this.renderField('company', 'Company')}
          {this.renderField('title', 'Title')}
        </div>
        <div className="infoRow">
          {this.renderField('address', 'Address')}
          {this.renderField('city', 'City')}
        </div>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className="infoButton">
        <Button
          label="Continue Shopping"
          to="/"
          style={{ color: '#099CEC' }}
          labelStyle={{ textTransform: 'none', fontFamily: 'Open Sans', fontWeight: 600 }}
        />
        <Button
          label="Complete Order"
          type="submit"
          disabled={this.state.submitting}
          style={{ color: '#fff', backgroundColor: '#099CEC' }}
          labelStyle={{ textTransform: 'none', fontFamily: 'Open Sans', fontWeight: 600 }}
        />
      </div>
    )
  }

  render() {
    const { error } = this.state
    return (
      <div className="infoSection">
        <form onSubmit={this.handleSubmit}>
          {this.renderCredit()}
          {this.renderBilling()}
          {error ? <span className="loginErrorMessage">{error}</span> : null}
          {this.renderButtons()}
        </form>
      </div>
    )
  }
}

CustomerInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CustomerInfoForm
