import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './navigation/Navigation.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navigation />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
