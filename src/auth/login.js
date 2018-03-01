import { TextField } from 'material-ui'
import Button from 'material-ui/Button'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  state = {}

  updateEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  updatePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  loginClick = () => {
    this.props.firebase.login({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    const { auth, authError } = this.props

    if (auth && auth.isLoaded && auth.email) {
      return <Redirect to="/home" />
    }

    return (
      <div>
        <TextField
          id="email"
          label="email"
          margin="normal"
          onChange={this.updateEmail}
          value={this.state.email || ''} 
        />
        <TextField
          id="password"
          label="password"
          type="password"
          margin="normal"
          onChange={this.updatePassword}
          value={this.state.password || ''} 
        />
        <Button onClick={this.loginClick}>
          Login
        </Button>
        {
          authError ? <p>{authError.message}</p> : null
        }
        <Link to="/auth/register">Register</Link>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
  authError: PropTypes.object,
  history: PropTypes.object
}