import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, withFirestore } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

import ItemCard from './item/card'
import Navigation from './navigation'

const $Li = withFirestore(props => (
  <ItemCard
    item={props.item}
    delete={() => props.firestore.delete(`/items/${props.item.id}`)}
  />
))

const $List = compose(
  connect(({ firebase: { auth }}) => ({ auth })),
  firestoreConnect(props => {
    return props.auth.uid
      ? [{
        collection: 'items',
        where: [
          ['ownerId', '==', props.auth.uid]
        ]
      }]
      : []
  }),
  connect(({ firestore }) => ({
    items: firestore.ordered.items
  }))
)((props) => (
  props.items && props.items.length ?
  <div>
    {props.items.map(item => (
      <$Li item={item} key={item.id} />
    ))}
  </div> : null
))

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <$List />
        <Navigation />
      </div>
    )
  }
}