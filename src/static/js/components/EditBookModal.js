import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import windowSize from 'react-window-size';
import CurrencyInput from 'react-currency-input';

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
class EditBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      book: nextProps.book
    });
  }

  updatePrice(displayedVal) {

    this.setState({ book });
  }

  onToggledSwitch(field, checked) {
    const book = { ...this.state.book };
    book[field] = checked;

    this.setState({ book });
  }

  save() {
    fetch(`${window.location.origin}/api/books/${this.state.book._id}`,
      { method: 'PUT', body: JSON.stringify(this.state.book), headers: {'Content-Type': 'application/json'} })
      .then(res => res.json())
      .then(res => {
        if (res.success === true && res.data.ok === 1) {
          console.log('Updated book successfully');
        } else {
          console.log('Error!');
        }
        this.props.onRequestClose(true);
      });
  }

  discard() {
    this.props.onRequestClose();
  }

  render() {

    const { book } = this.props;

    const styles = getStyles(this.props, this.state);

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        actions={[
          <FlatButton
            key={'cancel'}
            label={'Cancel'}
            style={styles.action}
            onClick={this.discard.bind(this)}
          />,
          <FlatButton
            key={'save'}
            label={'Save'}
            secondary={true}
            style={styles.action}
            onClick={this.save.bind(this)}
          />
        ]}
      >
        <div style={styles.container.outer}>
          <div style={styles.container.inner}>
            <h2>Edit Textbook</h2>
            <TextField
              style={styles.input.field}
              floatingLabelText={'Title'}
              value={this.state.book.title || ''}
              onChange={(event) => this.setState({ book: { ...this.state.book, title: event.target.value } })}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'ISBN'}
              value={this.state.book.isbn || ''}
              onChange={(event) => this.setState({ book: { ...this.state.book, isbn: event.target.value } })}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'Class'}
              value={this.state.book.course || ''}
              onChange={(event) => this.setState({ book: { ...this.state.book, course: event.target.value } })}
            />
            <TextField
              style={styles.input.field}
              floatingLabelText={'Price'}
            >
              <CurrencyInput
                allowEmpty={false}
                allowNegative={false}
                prefix={'$'}
                value={this.state.book.price || ''}
                onChange={(value) => {
                  this.setState({ book: { ...this.state.book, price: parseFloat(value.slice(1)) || 0.00 } });
                }}
              />
            </TextField>
            <Toggle
              label={'Sold'}
              toggled={this.state.book.sold || false}
              onToggle={(event, checked) => this.setState({ book: { ...this.state.book, sold: checked } })}
            />
            <p/>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default windowSize(EditBookModal);
