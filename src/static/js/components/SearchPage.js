import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import {RaisedButton} from 'material-ui'

class SearchPage extends Component {

	constructor(props){
		super(props);
	}

  signOutClick(){
    this.props.signOut();
  }

	componentWillMount(){
	}

	componentWillUpdate(nextProps, nextState){
	}

  render() {
    return (
    	<div>
    		<WelcomeMessage />
      	<h1>This is the search page!</h1>

        <RaisedButton label="Sign Out" primary={true} onClick={this.signOutClick.bind(this)}/>
      </div>
    );
  }
}

export default SearchPage;
