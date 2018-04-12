import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import './index.css';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// Build M-UI theme for app
const getTheme = () => {
  
  

};

const AppContainer = () => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <Router>
      <div>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/search' component={SearchPage}/>
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);