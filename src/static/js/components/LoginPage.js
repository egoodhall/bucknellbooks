import React, {Component} from 'react';

/*
Page responsible for logging the user in
*/
class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.renderButton();
  }

  //render google sign in button
  renderButton() {
    window.gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.login,
      'onfailure': console.log('login failed')
    });
  }

  //begin session for user
  login(info) {
    alert('Login Success Callback');
    let user = {'firstName': info.w3.ofa, 'lastName': info.w3.wea, 'fullName': info.w3.ig, 'email': info.w3.U3 };
    sessionStorage.setItem('isAuth', true);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('beginSession', true);
    this.props.auth();

  }

  render() {
    console.log('Rendering Login Page');
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      <div>
        <p> Please sign in to view: { from.pathname }</p>
        <div id="my-signin2"></div>
      </div>
    );
  }
}

export default LoginPage;
