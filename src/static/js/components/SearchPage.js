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
import styling from '../styling.js';
import { withRouter } from 'react-router-dom';

const getStyles = (props, state) => ({
  appBar: {
    zIndex: 3,
    height: 80,
    background: styling.colors.primary,
    position: 'fixed',
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
  }

  onQueryTextChanged(text) {
    this.setState({
      queryText: text
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
                <Avatar style={styles.avatar} />
              </IconButton>
            }
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="My Profile" onClick={() => this.props.history.push('/profile')}/>
            <MenuItem primaryText="Sign out" onClick={() => console.log('Log Out!')}/>
          </IconMenu>
          <SearchBar
            closeIcon={<Typicons.TiDelete color={'#9e9e9e'} size={20}/>}
            searchIcon={<Typicons.TiZoom color={'#9e9e9e'} size={20}/>}
            style={styles.searchBar}
            onChange={this.onQueryTextChanged}
            onRequestSearch={()=>{}}
            value={this.state.queryText}
          />
          <RaisedButton style={styles.newButton} secondary={true}>+ Book</RaisedButton>
        </Paper>
        <h1>This is the search page!</h1>
        <WelcomeMessage />
      </div>
    );
  }
}

export default withRouter(SearchPage);
