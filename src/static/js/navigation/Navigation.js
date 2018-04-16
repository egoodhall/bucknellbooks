import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import LoginPage from '../components/LoginPage';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isAuthenticated: (sessionStorage.getItem("isAuth") === 'true')} //navigation keeps track of authentication state

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
        //init google gapi auth2 everytime any page loads
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '438120227370-65o4j0kmk9mbij1bp3dqvnts9dh4kfrf.apps.googleusercontent.com',
            fetch_basic_profile: true
          })
          .then((auth2)=>{
              console.log("Initialized Auth2")
              window.gapi.auth2 = auth2

              //if google has user signed in but not authenticated in our system force logout
              if (auth2.isSignedIn.get() && !this.state.isAuthenticated){
                  this.handleLogout()
              }
            })
          .catch((reason)=>{
            console.log("auth2.init failed with: " + reason.error)
            console.log(reason.details)
          })
        })
  }

  handleLogin(gUser){
    sessionStorage.setItem("isAuth", true)
    sessionStorage.setItem("gUser", JSON.stringify(gUser.getBasicProfile()))
    this.setState({isAuthenticated: true})

    //token for server side verification (later on)
    let token = gUser.getAuthResponse().id_token
    let body = JSON.stringify({token:token})
  }

  handleLogout(){
    console.log("got signout click")
    window.gapi.auth2.signOut()
      .then(()=>{
        console.log("signed out!")
        this.setState({ googleUser:null, isAuthenticated: false})
      })
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
                <LoginPage {...routeProps} login={this.handleLogin}/>
            )} />

            <Route exact path='/'
                render={(routeProps) => isAuth ? (
                    <SearchPage {...routeProps} logout={this.handleLogout}/>
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


