import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import DeleteIcon from 'material-ui-icons/Delete'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  type: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  editButton: {
    textDecoration: 'none'
  }
})

function ItemCard(props) {
  const { classes } = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p">
          {props.item.data}
        </Typography>
        <Typography className={classes.type}>
          {props.item.type || 'no type'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={props.delete} size="small">
          <DeleteIcon />
        </Button>
        <Link to={`/edit/${props.item.id}`}>
          <Button className={classes.editButton} size="small">
            <ModeEditIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemCard)