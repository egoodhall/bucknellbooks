import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import * as Typicons from 'react-icons/lib/ti';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withRouter } from 'react-router-dom';
import BookGrid from './BookGrid';
import IconButton from 'material-ui/IconButton';
import EditBookModal from './EditBookModal';
import AddBookModal from './AddBookModal';

const getStyles = (props, state) => ({
  iconStyle: {
    position: 'absolute',
    marginTop: '10px',
    left: '0px',
    color: '#FFFF',
    cursor: 'pointer'
  },
  appBar: {
    zIndex: 3,
    height: 80,
    justifyContent: 'center',
    display: 'flex',
    background: props.muiTheme.palette.primary1Color
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '8px'
  }
});

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      editingBook: {},
      showEditModal: false,
      isAddingBook: false
    };

    this.updateBooks = this.updateBooks.bind(this);
    this.onCloseAddBook = this.onCloseAddBook.bind(this);
    this.onOpenAddBook = this.onOpenAddBook.bind(this);
  }

  componentWillMount() {
    this.updateBooks();
  }

  updateBooks() {
    console.log(`${this.props.gUser.Eea}`);
    fetch(`${window.location.origin}/api/users/${this.props.gUser.Eea}/books`)
      .then(res => res.json())
      .then(res => {
        if (res.success !== true) {
          console.log('Error!');
        } else {
          console.log(res.data);
          this.setState({
            books: res.data
          });
        }
      });
  }

  closeEditModal(refresh = false) {
    this.setState({
      showEditModal: false,
      editingBook: {}
    }, () => {
      if (refresh) {
        this.updateBooks();
      }
    });
  }

  onOpenAddBook() {
    this.setState({isAddingBook: true});
  }

  onCloseAddBook() {
    this.setState({isAddingBook: false});
  }

  render() {
    const styles = getStyles(this.props, this.state);
    const user = this.props.gUser;
    return (
      <div>
        <Paper elevation={4} style={styles.appBar}>
          <Typicons.TiArrowLeft onClick={() => this.props.history.push('/')}size={60} style={styles.iconStyle}/>
        </Paper>
        <div style={styles.profileHeader}>
          <Avatar src={user.Paa} size={128} />
          <h3 style={{margin: '1px'}}>{user.ig}</h3>
          <h3 style={{margin: '1px'}}>{user.U3}</h3>
        </div>
        <div style={{ marginLeft: '8%', marginRight: '8%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontWeight: 300, color: 'grey', margin: 0 }}>My Books</h2>
            <IconButton style={styles.avatar} color={'grey'} iconStyle={{ color: 'grey', marginLeft: '-8px', marginTop: '-8px'}} >
                <Typicons.TiRefresh onClick={this.updateBooks} size={40}/>
              </IconButton>
          </div>
          <div style={{borderTop: '1px solid grey'}}>
        </div>
          <BookGrid
            onCreate={this.onOpenAddBook}
            onSelectBook={(book) => console.log(book)}
            data={this.state.books || []}
          />
          <AddBookModal isOpen={this.state.isAddingBook} closeModal={this.onCloseAddBook} gUser={this.props.gUser}/>
        </div>
        <div style={{ height: 60 }}/>
      </div>
    );
  }
}

export default muiThemeable()(withRouter(UserPage));
