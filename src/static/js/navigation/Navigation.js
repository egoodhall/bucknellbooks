import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import SearchPage from '../components/SearchPage';
import LoginPage from '../components/LoginPage';


class Navigation extends React.Component{
  constructor(props){
    super(props);

    this.state = { isAuthenticated: false } //navigation keeps track of authentication state
  }

  componentWillMount(){
    this.authenticate();
  }

  /* Check if user is logged in w/ google using session */
  authenticate(){
    let isAuth = sessionStorage.getItem("isAuth");

    if(isAuth === null){ //if starting new session
      sessionStorage.setItem("isAuth", false); 
      isAuth = false;
    }
    this.setState({isAuthenticated: isAuth})
  }

  /* Sign user out of session */
  signOut(){
    this.setState({isAuthenticated: false});
    sessionStorage.setItem("isAuth", false);
  }


  render(){
    let isAuth = this.state.isAuthenticated;

    return (

        <Router>
          <div>
            <Route exact path='/' 
                render={(routeProps) => (isAuth) ? (
                  <Redirect
                    to={{
                      pathname: '/search',
                      state: { from: routeProps.location }
                    }} />
              ) : (
                <LoginPage {...routeProps} auth={this.authenticate.bind(this)}/>
            )} />

            <Route exact path='/search'
                render={(routeProps) => isAuth ? (
                    <SearchPage {...routeProps} signOut={this.signOut.bind(this)}/>
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
      )
  }
}

export default Navigation;


