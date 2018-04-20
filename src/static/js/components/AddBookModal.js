import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton style={styles.newButton} secondary={true} onClick={this.handleOpen}>+ Book</RaisedButton>
        <Dialog
          title="Dialog With Custom Width"
          actions={actions}
          modal={true}
          contentStyle={styles.modalStyle}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This dialog spans the entire width of the screen.
        </Dialog>
      </div>
    );
  }

}

export default AddBookModal;
