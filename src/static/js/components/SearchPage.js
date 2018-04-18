import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
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
  }
});

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    };

    this.onQueryTextChanged = this.onQueryTextChanged.bind(this);
    this.onRequestedSearch = this.onRequestedSearch.bind(this);
  }

  onQueryTextChanged(text) {
    this.setState({
      queryText: text
    });
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

  render() {
    const styles = getStyles(this.props, this.state);
    return (
      <div>
        <Paper zDepth={1} style={styles.appBar}>
          <IconMenu
            iconButtonElement={
              <IconButton style={styles.avatar}>
                <Avatar src={JSON.parse(sessionStorage.getItem('gUser')).Paa} style={styles.avatar} />
              </IconButton>
            }
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="My Profile" onClick={() => this.props.history.push('/profile')}/>
            <MenuItem primaryText="Sign out" onClick={this.props.logout}/>
          </IconMenu>
          <SearchBar
            closeIcon={<Typicons.TiDelete color={'#9e9e9e'} size={20}/>}
            searchIcon={<Typicons.TiZoom color={'#9e9e9e'} size={20}/>}
            style={styles.searchBar}
            onChange={this.onQueryTextChanged}
            onRequestSearch={this.onRequestedSearch}
            value={this.state.queryText}
            hintText={'Search by Title, ISBN, Course Number...'}
          />
          <RaisedButton style={styles.newButton} secondary={true}>+ Book</RaisedButton>
        </Paper>
        <BookGrid style={{ marginTop: '96px' }} data={this.state.currentSearch ? this.state.currentSearch.data : []} />
        <WelcomeMessage />
      </div>
    );
  }
}

export default muiThemeable()(withRouter(SearchPage));
