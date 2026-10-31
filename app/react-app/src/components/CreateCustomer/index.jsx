import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../ui/TextField'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import './styles.css'

class CreateCustomer extends Component {
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

  handleCreate = () => {
    const { createCustomer } = this.props

    if (!this.state.username) {
      this.setState({ error: { username: 'Username is required', password: '', form: '' } })
      return
    }
    if (!this.state.password) {
      this.setState({ error: { username: '', password: 'Password is required', form: '' } })
      return
    }

    Promise.resolve(createCustomer(this.state.username, this.state.password))
      .then(this.handleClose)
      .catch(() => {
        this.setState({
          username: '',
          password: '',
          error: { username: 'Username already exists', password: '', form: '' },
        })
      })
  }

  renderForm() {
    return (
      <div>
        <div className="userTitle">Create your Username</div>
        <div className="userInput">
          <TextField
            value={this.state.username}
            hintText="Choose a Username"
            errorText={this.state.error.username}
            onChange={this.handleUsername}
          />
        </div>
        <div className="userInput">
          <TextField
            type="password"
            value={this.state.password}
            hintText="Choose a Password"
            errorText={this.state.error.password}
            onChange={this.handlePass}
          />
        </div>
        <Button
          label="Sign up"
          onClick={this.handleCreate}
          fullWidth={true}
        />
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        isOpen={this.state.open && !this.props.isActive}
        onRequestClose={this.handleClose}
        contentLabel="Create User"
      >
        {this.renderForm()}
      </Modal>
    )
  }

  render() {
    const { isActive } = this.props
    return (
      <div>
        {!isActive
          ? <Button onClick={this.handleOpen} label="Create Account" />
          : <div />}
        {this.renderModal()}
      </div>
    )
  }
}

CreateCustomer.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

export default CreateCustomer
