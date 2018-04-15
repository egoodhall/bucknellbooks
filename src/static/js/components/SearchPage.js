import React, {Component} from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import {Button} from 'material-ui'

class SearchPage extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
	}

	componentWillUpdate(nextProps, nextState){
	}

  render() {
  	console.log("Rendering Search Page")
    return (
    	<div>
    		<WelcomeMessage />
      		<h1>This is the search page!</h1>
      	</div>
    );
  }
}

export default SearchPage;
