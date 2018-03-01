import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'

import './index.css'
import Breakdown from './app'
import registerServiceWorker from './registerServiceWorker'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

// initialize firebase instance
firebase.initializeApp({
  apiKey: 'AIzaSyDUwKM3zUefNKKDL3YkPijLhk4CSJ7mhOc',
  authDomain: 'breakdown-ee5c3.firebaseapp.com',
  databaseURL: 'https://breakdown-ee5c3.firebaseio.com',
  projectId: 'breakdown-ee5c3',
  storageBucket: 'breakdown-ee5c3.appspot.com',
  messagingSenderId: '619300142285'
})

// initialize firestore
firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route match="/" component={Breakdown} />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
