import React from 'react'
import { Button, Grid, TextField } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import DeleteIcon from 'material-ui-icons/Delete'
import AddIcon from 'material-ui-icons/Add'

export class EditItem extends React.Component {
  state = {
    item: {},
    newField: ''
  }

  componentWillReceiveProps(props) {
    this.setState({
      item: {
        ...props.item
      }
    })
  }

  updateNewField = event => {
    this.setState({
      newField: event.target.value
    })
  }

  addNewField = () => {
    if (Object.keys(this.state.item).indexOf(this.state.newField) !== -1) {
      console.error('Key already exists')
    } else {
      this.setState({
        newField: '',
        item: {
          ...this.state.item,
          [this.state.newField]: ''
        }
      })
    }
  }

  removeField = fieldName => {
    this.setState({
      item: {
        ...this.state.item,
        [fieldName]: ''
      }
    })
  }

  updateFieldValue = (fieldName, event) => {
    this.setState({
      item: {
        ...this.state.item,
        [fieldName]: event.target.value
      }
    })
  }

  saveItem = async () => {
    if (this.props.itemId) {
      this.props.firestore.update(`items/${this.props.itemId}`, {
        ...this.state.item,
        ownerId: this.props.item.ownerId
      })
    } else {
      this.props.firestore.add('items', {
        ...this.state.item,
        ownerId: this.props.auth.uid
      })
    }
  }

  render() {
    const { history, classes, match } = this.props
    return (
      <Dialog open onBackdropClick={history.goBack}>
        <DialogTitle>
          {match.params.itemId ? 'Edit' : 'Create'} Item
        </DialogTitle>
        <DialogContent>
          <Grid container>
            {Object.keys(this.state.item).map(field => (
              <Grid container key={field} className={classes.formRow}>
                <Grid item xs={10}>
                  <TextField
                    id={field}
                    label={field}
                    value={this.state.item[field] || ''}
                    fullWidth
                    required
                    onChange={this.updateFieldValue.bind(this, field)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button>
                    <DeleteIcon />
                  </Button> 
                </Grid>
              </Grid>
            ))}
            <Grid container className={classes.formRow}>
              <Grid item xs={8}>
                <TextField
                  id="new-field"
                  label="New Field"
                  value={this.state.newField}
                  fullWidth
                  onChange={this.updateNewField}
                />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={this.addNewField}>
                  <AddIcon />
                </Button> 
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={history.goBack} color="primary">
            Cancel
          </Button>
          <Button color="secondary" variant="raised" onClick={this.saveItem}>
            {this.state.isSaving ? <CircularProgress /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(theme => ({
  formRow: {
    margin: 0
  }
}))(EditItem)