import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, withFirestore } from 'react-redux-firebase'

import './app.css'
import Register from './auth/register'
import Login from './auth/login'
import Home from './home'
import Edit from './edit'

const $Login = compose(
  firebaseConnect(),
  withRouter,
  connect(({ firebase: { auth, authError } }) => ({ auth, authError }))
)(Login)

const $Register = compose(
  firebaseConnect(),
  withRouter,
  connect(({ firebase: { auth, authError } }) => ({ auth, authError }))
)(Register)

const $Edit = compose(
  firestoreConnect(props => {
    return props.match.params.itemId
      ? [{
        collection: 'items',
        doc: props.match.params.itemId,
      }]
      : []
  }),
  connect(({ firebase: { auth }, firestore: { data }}, props) => ({
    auth,
    item: data && data.items && data.items[props.match.params.itemId],
    itemId: props.match.params.itemId
  }))
)(Edit)

class App extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <div className="App">
        {auth.isLoaded && auth.isEmpty &&
          <Redirect to="/auth/login" />
        }
        <Route path="/auth/login" component={$Login} />
        <Route path="/auth/register" component={$Register} />
        <Route path="/home" component={Home} />
        <Route exact path="/edit" component={$Edit} />
        <Route path="/edit/:itemId" component={$Edit} />
      </div>
    )
  }
}

const $App = compose(
  firebaseConnect(),
  connect(({ firebase: { auth }}) => ({ auth }))
)(App)

export default $App
