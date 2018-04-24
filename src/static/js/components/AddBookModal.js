import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  modalStyle: {
    width: '60%',
    maxWidth: 'none'
  },
  newButton: {
    marginLeft: '24px'
  }

};


class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.props.closeModal}
      />
    ];

    return (
      <div>
        <Dialog
          title="Add a Book"
          actions={actions}
          modal={true}
          contentStyle={styles.modalStyle}
          open={this.props.isOpen}
          onRequestClose={this.props.closeModal}
        >
          <TextField
            floatingLabelText="ISBN"
            fullWidth={true}
          /><br />
          <TextField
            floatingLabelText="Price"
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
  }

}

export default AddBookModal;
