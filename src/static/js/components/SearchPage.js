import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import AddBookModal from './AddBookModal.js';
import SearchBar from 'material-ui-search-bar';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as Typicons from 'react-icons/lib/ti';
import { withRouter } from 'react-router-dom';
import BookGrid from './BookGrid';
import muiThemeable from 'material-ui/styles/muiThemeable';
import windowSize from 'react-window-size';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const getStyles = (props, state) => ({
  appBar: {
    zIndex: 3,
    height: 80,
    background: props.muiTheme.palette.primary1Color,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px'
  },
  searchBar: {
    maxWidth: '66em',
    flexGrow: 1,
    float: 'left',
    top: '16px',
    zIndex: 4,
    width: '50%'
  },
  avatar: {
    width: 36,
    height: 36,
    padding: 0,
    marginRight: '24px'
  },
  newButton: {
    marginLeft: '24px'
  },
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
});

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      isAddingBook: false
    };

    this.onQueryTextChanged = this.onQueryTextChanged.bind(this);
    this.onRequestedSearch = this.onRequestedSearch.bind(this);
    this.onOpenAddBook = this.onOpenAddBook.bind(this);
    this.onCloseAddBook = this.onCloseAddBook.bind(this);
  }

  onQueryTextChanged(text) {
    this.setState({
      queryText: text
    });
  }

  onOpenAddBook() {
    this.setState({isAddingBook: true});
  }

  onCloseAddBook() {
    this.setState({isAddingBook: false});
  }

  onRequestedSearch() {
    fetch(`${window.location.origin}/api/search?text=${this.state.queryText}`)
    .then(res => res.json())
    .then(res => {
      if (res.success !== true) {
        console.log('Error!');
      } else {
        console.log(res.data);
        this.setState({
          currentSearch: {
            queryText: this.state.queryText,
            data: res.data
          }
        });
      }
    });
  }

  createNewBook() {
    console.log('Create book!');
  }

  render() {
    // console.log(this.props.gUser);
    const styles = getStyles(this.props, this.state);
    const photoUrl = this.props.gUser.Paa;
    return (
      <div>
        <Paper zDepth={1} style={styles.appBar}>
          <IconMenu
            iconButtonElement={
              <IconButton style={styles.avatar}>
                <Avatar src={photoUrl} style={styles.avatar} />
              </IconButton>
            }
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="My Profile" onClick={() => this.props.history.push('/profile')}/>
            <MenuItem primaryText="Sign out" onClick={this.props.logout}/>
          </IconMenu>
          <SearchBar
            style={styles.searchBar}
            onChange={this.onQueryTextChanged}
            onRequestSearch={this.onRequestedSearch}
            value={this.state.queryText}
            hintText={'Title, ISBN, Course...'}
          />
          { this.props.windowWidth >= 500 &&
            <RaisedButton
              style={styles.newButton}
              secondary={true}
              onClick={this.onOpenAddBook}>
              + Book
            </RaisedButton>
          }
          <AddBookModal isOpen={this.state.isAddingBook} closeModal={this.onCloseAddBook}/>
        </Paper>
        <BookGrid
          style={{ marginTop: '96px' }}
          data={this.state.currentSearch ? this.state.currentSearch.data : []}
        />
        { this.props.windowWidth < 500 &&
          <FloatingActionButton
            secondary={true}
            style={styles.fab}
            onClick={this.createNewBook.bind(this)}>
            <ContentAdd />
          </FloatingActionButton>
        }
        <WelcomeMessage gUser={this.props.gUser}/>
      </div>
    );
  }
}

export default windowSize(muiThemeable()(withRouter(SearchPage)));
