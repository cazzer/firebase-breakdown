import React from 'react'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

const Add = ({ classes }) => (
  <Link to="/edit" className={classes.button}>
    <Button color="primary" variant="fab">
      <AddIcon />
    </Button>
  </Link>
)

export default withStyles(theme => ({
  button: {
    position: 'absolute',
    bottom: `${theme.spacing.unit}px`,
    right: `${theme.spacing.unit}px`
  }
}))(Add)