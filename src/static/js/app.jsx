import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './navigation/Navigation.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const getTheme = () => {
  let overwrites = {
    'palette': {
      'primary1Color': '#1976d2',
      'primary2Color': '#1565c0',
      'accent1Color': '#f57c00'
    }
  };
  return getMuiTheme(baseTheme, overwrites);
};

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getTheme()}>
        <Navigation />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


