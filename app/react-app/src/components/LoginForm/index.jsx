import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../ui/TextField'
import Button from '../../ui/Button'
import validate from './validate'
import './styles.css'

class LoginForm extends Component {
  state = {
    values: { username: '', password: '' },
    errors: {},
    error: null,
    submitting: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState(state => ({
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: undefined },
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const errors = validate(this.state.values)
    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
      return
    }

    this.setState({ submitting: true, error: null })
    Promise.resolve(this.props.onSubmit(this.state.values))
      .catch(err => this.setState({ error: err.message || 'Error logging in.' }))
      .finally(() => this.setState({ submitting: false }))
  }

  render() {
    const { values, errors, error, submitting } = this.state
    return (
      <div className="loginFormContent">
        <form onSubmit={this.handleSubmit}>
          <div className="loginFormHeader">Sign in to your account</div>
          <div className="loginFormRow">
            <TextField
              name="username"
              value={values.username}
              hintText="Username"
              errorText={errors.username}
              onChange={this.handleChange}
            />
            <TextField
              type="password"
              name="password"
              value={values.password}
              hintText="Password"
              errorText={errors.password}
              onChange={this.handleChange}
            />
          </div>
          {error ? <span className="errorMessage">{error}</span> : null}
          <div className="loginFormButton">
            <Button
              label="Sign in"
              type="submit"
              disabled={submitting}
              style={{ color: '#fff', backgroundColor: '#099CEC' }}
              labelStyle={{ textTransform: 'none', fontFamily: 'Open Sans', fontWeight: 600 }}
            />
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
