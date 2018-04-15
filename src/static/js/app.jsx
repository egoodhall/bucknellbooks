import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Navigation from './navigation/Navigation.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// Build M-UI theme for app
// const getTheme = () => {
// };


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      isAuthenticated: false
    }
  }

  render(){
    return (
      <MuiThemeProvider>
        <Navigation />
      </MuiThemeProvider>
      )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


