import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import LoginPage from '../components/LoginPage';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isAuthenticated: false }; //navigation keeps track of authentication state
  }

  componentDidMount() {
    this.authenticate();
  }

  /* Check if user is logged in w/ google using session */
  authenticate() {
    let isAuth = sessionStorage.getItem('isAuth');

    if (isAuth === null) { //if starting new session
      sessionStorage.setItem('isAuth', false);
      isAuth = false;
    }
    this.setState({isAuthenticated: isAuth});
  }

  /* Sign user out of session */
  signOut() {
    sessionStorage.setItem('isAuth', false);
    let authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.disconnect();
    authInstance.signOut();
    this.setState({isAuthenticated: false});
  }


  render() {
    let isAuth = this.state.isAuthenticated;
    return (

        <Router>
          <div>
            <Route exact path='/login'
                render={(routeProps) => (isAuth) ? (
                  <Redirect
                    to={{
                      pathname: '/',
                      state: { from: routeProps.location }
                    }} />
              ) : (
                <LoginPage {...routeProps} auth={this.authenticate.bind(this)}/>
            )} />

            <Route path='/'
                render={(routeProps) => isAuth ? (
                    <SearchPage {...routeProps} signOut={this.signOut.bind(this)}/>
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/login',
                        state: { from: routeProps.location }
                      }}
                    />
                  )
                }
              />
            </div>
        </Router>
    );
  }
}

export default Navigation;


