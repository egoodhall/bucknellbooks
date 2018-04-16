import React, {Component} from 'react';
import {RaisedButton} from 'material-ui'

class SearchPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let user = JSON.parse(sessionStorage.getItem("gUser"))
    console.log(user)
    console.log("Rendering Search Page")
    return (
    	<div>
      	<h1>This is the search page!</h1>
        <RaisedButton label="Sign Out" primary={true} onClick={this.props.logout}/>
      </div>
    );
  }
}

export default SearchPage;
