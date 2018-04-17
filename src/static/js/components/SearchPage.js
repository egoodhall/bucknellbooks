import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import SearchBar from 'material-ui-search-bar';
import Paper from 'material-ui/Paper';
import * as Typicons from 'react-icons/lib/ti';
import styling from '../styling.js';

const getStyles = (props, state) => ({
  appBar: {
    zIndex: 3,
    height: 80,
    justifyContent: 'center',
    display: 'flex',
    background: styling.colors.primary
  },
  searchBar: {
    position: 'fixed',
    top: '16px',
    zIndex: 4,
    width: '60em'
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
        <Paper elevation={4} style={styles.appBar}>
          <SearchBar
            closeIcon={<Typicons.TiDelete color={'#9e9e9e'} size={20}/>}
            searchIcon={<Typicons.TiZoom color={'#9e9e9e'} size={20}/>}
            style={styles.searchBar}
            onChange={this.onQueryTextChanged}
            onRequestSearch={()=>{}}
            value={this.state.queryText}
          />
        </Paper>
        <h1>This is the search page!</h1>
        <WelcomeMessage />
      </div>
    );
  }
}

export default SearchPage;
