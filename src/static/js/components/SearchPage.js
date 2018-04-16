import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import SearchBar from './SearchBar.js';
import AppBar from 'material-ui/AppBar';

class SearchPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <SearchBar
            onChange={()=>{}}
            onRequestSearch={()=>{}}
          />
        </AppBar>
        <h1>This is the search page!</h1>
        <WelcomeMessage />
      </div>
    );
  }
}

export default SearchPage;
