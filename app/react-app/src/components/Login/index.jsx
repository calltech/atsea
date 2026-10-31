import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../ui/TextField'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import './styles.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    open: false,
    error: {
      username: '',
      password: '',
      form: '',
    },
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePass = (event) => {
    this.setState({ password: event.target.value })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      username: '',
      password: '',
      open: false,
      error: { username: '', password: '', form: '' },
    })
  }

  handleLogin = () => {
    const { loginCustomer } = this.props

    if (!this.state.username) {
      this.setState({ error: { username: 'Username is required', password: '', form: '' } })
      return
    }
    if (!this.state.password) {
      this.setState({ error: { username: '', password: 'Password is required', form: '' } })
      return
    }

    Promise.resolve(loginCustomer(this.state.username, this.state.password))
      .then(this.handleClose)
      .catch(() => {
        this.setState({
          username: '',
          password: '',
          error: { username: 'User not found', password: '', form: '' },
        })
      })
  }

  handleLogout = () => {
    this.props.logoutCustomer()
  }

  renderForm() {
    return (
      <div>
        <div className="loginTitle">Sign in to your account</div>
        <div className="userInput">
          <TextField
            value={this.state.username}
            hintText="Username"
            errorText={this.state.error.username}
            onChange={this.handleUsername}
          />
        </div>
        <div className="loginInput">
          <TextField
            type="password"
            value={this.state.password}
            hintText="Password"
            errorText={this.state.error.password}
            onChange={this.handlePass}
          />
        </div>
        <Button
          onClick={this.handleLogin}
          label="Login"
          fullWidth={true}
        />
      </div>
    )
  }

  renderLogin() {
    return (
      <Modal
        isOpen={this.state.open && !this.props.isActive}
        onRequestClose={this.handleClose}
        contentLabel="Sign In"
      >
        {this.renderForm()}
      </Modal>
    )
  }

  renderActive() {
    return (
      <div>
        <Button
          onClick={this.handleLogout}
          label="Logout"
        />
      </div>
    )
  }

  render() {
    const { isActive } = this.props
    return (
      <div>
        {isActive
          ? this.renderActive()
          : <Button onClick={this.handleOpen} label="Login" />}
        {this.renderLogin()}
      </div>
    )
  }
}

Login.propTypes = {
  loginCustomer: PropTypes.func.isRequired,
  logoutCustomer: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

export default Login
