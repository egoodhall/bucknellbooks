import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CurrencyInput from 'react-currency-input';

const styles = {
  modalStyle: {
    width: '60%',
    maxWidth: 'none'
  },
  newButton: {
    marginLeft: '24px'
  },
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
  input: {
    field: {
      width: '100%'
    }
  },
  action: {
    margin: '4px'
  }

};


class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isbn: '',
      course: '',
      price: 0,
      ownerId: this.props.gUser.Eea,
      sold: false
    };
    this.add = this.add.bind(this);
  }
  add() {
    fetch(`${window.location.origin}/api/users/${this.state.ownerId}/books`,
      { method: 'POST', body: JSON.stringify(this.state), headers: {'Content-Type': 'application/json'} })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          console.log('POSTED book successfully');
        } else {
          console.log('Error!');
        }
      });
    this.props.closeModal();
    this.setState({
      title: '',
      isbn: '',
      course: '',
      price: 0,
      ownerId: this.props.gUser.Eea,
      sold: false});
  }

  render() {
    const actions = [
      <RaisedButton
        key={'cancel'}
        label={'cancel'}
        primary={true}
        style={styles.action}
        onClick={this.props.closeModal}
      />,
      <RaisedButton
        key={'add'}
        label={'add'}
        secondary={true}
        style={styles.action}
        onClick={this.add}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.props.isOpen}
          onRequestClose={this.props.closeModal}
        >
        <div style={styles.container.outer}>
          <div style={styles.container.inner}>
            <h2>Add Textbook</h2>
            <TextField
              style={styles.input.field}
              floatingLabelText={'Title'}
              value={this.state.title || ''}
              onChange={(event) => this.setState({title: event.target.value})}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'ISBN'}
              value={this.state.isbn || ''}
              onChange={(event) => this.setState({isbn: event.target.value})}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'Class'}
              value={this.state.course || ''}
              onChange={(event) => this.setState({course: event.target.value})}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'Price'}
              floatingLabelFixed={true}
            >
              <CurrencyInput
                allowEmpty={false}
                allowNegative={false}
                prefix={'$'}
                value={this.state.price || ''}
                onChange={(value) => this.setState({ price: parseFloat(value.slice(1)) || 0.00 })}
              />
            </TextField>
            <p/>
          </div>
        </div>
        </Dialog>
      </div>
    );
  }

}

export default AddBookModal;
