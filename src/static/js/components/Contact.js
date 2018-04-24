import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import windowSize from 'react-window-size';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionHelp from 'material-ui/svg-icons/action/help';
import Snackbar from 'material-ui/Snackbar';

const getStyles = (props, state) => ({

  container: {
    outer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inner: {
      width: '100%',
      maxWidth: '30em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  feedback: {
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      width: '100%'
    }
  },
  input: {
    field: {
      width: '100%'
    }
  },
  action: {
    margin: '4px'
  }
});

/*
Page responsible for logging the user in
*/
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        msg: '',
        email: '',
        err: ''
      },
      snackbar: {
        open: false,
        msg: ''
      }
    };
  }

  showSnackbar(msg, cb = () => {}) {
    this.setState({
      snackbar: {
        open: true,
        msg
      }
    }, cb);
  }

  hideSnackbar() {
    this.setState({
      snackbar: {
        open: false,
        msg: ''
      }
    });
  }

  handleContactSend() {
    if (this.state.contact.msg === '') {
      this.setState({ err: 'Field required' });
    } else {
      fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        body: JSON.stringify({
          sender: this.props.gUser.U3,
          recipient: this.props.recipient,
          msg: this.state.contact.msg
        }),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then(res => {
        if (res.success === true) {
          this.showSnackbar(
            'Message sent successfully',
            () => this.setState({email: '', msg: '', err: ''}, this.props.onRequestClose)
          );
        } else {
          this.showSnackbar('Message failed to send');
        }
      });
    }
  }


  render() {
    const styles = getStyles(this.props, this.state);

    return (
      <div>
        <Dialog
          title={`Contact ${this.props.recipient}`}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
          actions={[
            <RaisedButton
              key={'cancel'}
              label={'Cancel'}
              primary={true}
              style={styles.action}
              onClick={this.props.onRequestClose}
            />,
            <RaisedButton
              key={'send'}
              label={'Send'}
              secondary={true}
              style={styles.action}
              onClick={this.handleContactSend.bind(this)}
            />
          ]}
        >
        <TextField
          onChange={(event, text) => this.setState({ contact: { ...this.state.contact, msg: event.target.value } })}
          value={this.state.contact.msg}
          style={styles.feedback.message}
          floatingLabelText="Enter your message"
          errorText={this.state.contact.err}
          multiLine={true}
          rows={4}
        />

        </Dialog>
        <Snackbar
        open={this.state.snackbar.open}
        message={this.state.snackbar.msg}
        autoHideDuration={3000}
        action="OK"
        onRequestClose={this.hideSnackbar.bind(this)}
        />
      </div>

    );
  }
}

export default windowSize(Contact);
