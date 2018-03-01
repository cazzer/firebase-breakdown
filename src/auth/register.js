import { TextField } from 'material-ui'
import Button from 'material-ui/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Register extends React.Component {
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

  registerClick = () => {
    this.props.firebase.createUser({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    const { auth, authError, history } = this.props

    if (auth.isLoaded && auth.email) {
      history.push('/home')
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
        <Button onClick={this.registerClick}>
          Register
        </Button>
        {
          authError ? <p>{authError.message}</p> : null
        }
        <Link to="/auth/login">Login</Link>
      </div>
    )
  }
}

Register.propTypes = {
  firebase: PropTypes.shape({
    createUser: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
  authError: PropTypes.object,
  history: PropTypes.object
}