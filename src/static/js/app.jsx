import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
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

  componentDidMount(){
    this.authenticate();
  }

  /*
  Check if user is logged in w/ google using sessions
  */
  authenticate(){
    //check session for user login status
    let isAuth = sessionStorage.getItem("isAuth");

    if(isAuth === null){
      sessionStorage.setItem("isAuth", false);
    }
    else{
      this.setState({isAuthenticated: isAuth})
    }
  }

  /* 
  Sign user out of session
  */
  signOut(){
    this.setState({isAuthenticated: false});
    sessionStorage.setItem("isAuth", false);
  }

  render(){
    let isAuth = this.state.isAuthenticated;
    return (
      <MuiThemeProvider>

        <Router>
          <div>
            <Route 
                path='/' 
                render={(routeProps) => isAuth ? (
                  <Redirect
                    to={{
                      pathname: '/search',
                      state: { from: routeProps.location}
                    }} />
              ) : (
                <LoginPage {...routeProps} auth={this.authenticate.bind(this)}/>
            )} />

            <Route
                path='/search'
                render={routeProps => isAuth ? (
                    <SearchPage {...routeProps}/>
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: { from: routeProps.location }
                      }}
                    />
                  )
                }
              />

          </div>
        </Router>
      </MuiThemeProvider>
      )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
