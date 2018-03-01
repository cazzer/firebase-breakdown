import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'
import AddIcon from 'material-ui-icons/Add'
import HomeIcon from 'material-ui-icons/Home'
import classNames from 'classnames'
import color from 'color'
import { Link } from 'react-router-dom'


const Navigation = ({ classes }) => (
  <nav className={classes.navigation}>
    <Link to="/home">
      <Button className={classNames(classes.navigationElement, classes.button)}>
        <HomeIcon />
      </Button>
    </Link>
    <div className={classNames(classes.navigationElement, classes.breadcrumb)}>
      <Typography className={classes.breadcrumbHeading} variant="display1">Navigation</Typography>
    </div>
    <Button className={classNames(classes.navigationElement, classes.button)}>
      <SearchIcon />
    </Button>
    <Link to="/edit">
      <Button className={classNames(classes.navigationElement, classes.button)}>
        <AddIcon />
      </Button>
    </Link>
  </nav>
)

const navigationBackground = color('#d9d5e5')

export default withStyles(theme => ({
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: '0',
    bottom: '0',
    height: '80px',
    width: '100vw',
    backgroundColor: navigationBackground.toString()
  },
  navigationElement: {
    height: '80px',
  },
  breadcrumb: {
    flexGrow: 1,
    padding: `0 ${theme.spacing.unit}px`
  },
  breadcrumbHeading: {
    lineHeight: '80px',
    textAlign: 'left'
  },
  button: {
    backgroundColor: navigationBackground.darken('.05').toString()
  },
}))(Navigation)