import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  createCustomer,
  loginCustomer,
} from '../../actions'
import {
  getIP,
  getHost,
} from '../../reducers'
import LoginForm from '../LoginForm'
import CreateUserForm from '../CreateUserForm'
import SuccessMessage from '../SuccessMessage'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import Logo from '../Logo'
import './styles.css'
import '../globalStyles.css'
import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from '../../actions/storage'

class TopNav extends Component {
  state = {
    isCreateModalOpen: false,
    isLoginModalOpen: false,
    authenticated: getJwtToken() !== null,
    createUserSuccessful: false,
  }

  handleLoginSuccess = (token) => {
    if (token) setJwtToken(token)
    this.setState({ authenticated: true })
  }

  handleCreateUser = async (values) => {
    const { createCustomer, loginCustomer } = this.props
    await createCustomer(values.username, values.password)
    this.setState({ createUserSuccessful: true })
    const { token } = await loginCustomer(values.username, values.password)
    this.handleLoginSuccess(token)
  }

  handleLogin = async (values) => {
    const { loginCustomer } = this.props
    const { token } = await loginCustomer(values.username, values.password)
    this.handleLoginSuccess(token)
    this.setState({ isLoginModalOpen: false })
  }

  renderContainerId() {
    const { ip, host } = this.props
    return (
      <div className="containerSection">
        {`IP: ${ip} HOST: ${host}`}
      </div>
    )
  }

  toggleCreateModal = () => {
    this.setState(state => ({
      isCreateModalOpen: !state.isCreateModalOpen,
    }))
  }

  toggleLoginModal = () => {
    this.setState(state => ({
      isLoginModalOpen: !state.isLoginModalOpen,
    }))
  }

  closeCreateModal = () => {
    this.setState({ isCreateModalOpen: false, createUserSuccessful: false })
  }

  renderCreateModal = () => {
    const successMessage = 'Congratulations! Your account has been created!'
    const content = this.state.createUserSuccessful
      ? <SuccessMessage
        message={successMessage}
        label="Continue Shopping"
        handleClick={this.closeCreateModal}
      />
      : <CreateUserForm onSubmit={this.handleCreateUser} />
    return (
      <Modal
        isOpen={this.state.isCreateModalOpen}
        onRequestClose={this.closeCreateModal}
        contentLabel="Create User"
      >
        <div className="formContainer">
          {content}
        </div>
      </Modal>
    )
  }

  renderLoginModal = () => {
    return (
      <Modal
        isOpen={this.state.isLoginModalOpen}
        onRequestClose={this.toggleLoginModal}
        contentLabel="Sign In"
      >
        <div className="formContainer">
          <LoginForm onSubmit={this.handleLogin} />
        </div>
      </Modal>
    )
  }

  renderUnauthenticated() {
    const styles = {
      color: '#fff',
    }
    const labelStyles = {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      fontWeight: 600,
    }

    return (
      <div>
        <Button
          style={styles}
          labelStyle={labelStyles}
          onClick={this.toggleCreateModal}
          label="Create User"
        />
        <Button
          style={styles}
          labelStyle={labelStyles}
          onClick={this.toggleLoginModal}
          label="Sign in"
        />
      </div>
    )
  }

  renderAuthenticated() {
    const styles = {
      color: '#fff',
    }
    const labelStyles = {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      fontWeight: 600,
    }
    return (
      <div>
        <span className="welcomeMessage">
          Welcome!
        </span>
        <Button
          style={styles}
          labelStyle={labelStyles}
          onClick={this.removeToken}
          label="Sign out"
        />
      </div>
    )
  }

  removeToken = () => {
    removeJwtToken()
    this.setState({
      isCreateModalOpen: false,
      isLoginModalOpen: false,
      authenticated: false,
      createUserSuccessful: false,
    })
  }

  render() {
    return (
      <div className="globalContainer">
        <div className="navHeader">
          <div className="navLogo">
            <Logo />
          </div>
          <div className="navUser">
            {this.renderContainerId()}
            <div className="buttonSection">
              {this.state.authenticated
                ? this.renderAuthenticated()
                : this.renderUnauthenticated()}
            </div>
            {this.renderCreateModal()}
            {this.renderLoginModal()}
          </div>
        </div>
      </div>
    )
  }
}

TopNav.propTypes = {
  ip: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  createCustomer: PropTypes.func.isRequired,
  loginCustomer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ip: getIP(state),
  host: getHost(state),
})

export default connect(mapStateToProps, {
  createCustomer,
  loginCustomer,
})(TopNav)
