import React, {Component} from 'react';

class LoginPage extends React.Component {
  constructor(props){
    super(props);

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.renderButton();
  }

  renderButton() {
    window.gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.login,
      'onfailure': console.log('login failed')
    });
  }

  login(){
  	sessionStorage.setItem("isAuth", true);
  	this.props.auth()
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    return (
      <div>
        <p> Please sign in to view:  {from.pathname}</p>
        <div className="my=signin2" id="my-signin2"></div>
      </div>
    );
  }
}

export default LoginPage;
