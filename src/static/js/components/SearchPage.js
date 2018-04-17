import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import SearchBar from './SearchBar.js';
import Paper from 'material-ui/Paper';
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
