import React, { Component } from 'react';

/*
Page responsible for logging the user in
*/
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawsignin();
  }
  componentDidUpdate(prevProps, prevState) {
    this.drawsignin();
  }

  drawsignin() {
    console.log('Rendering Login Btn');
    window.gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.props.login,
      'onfailure': (error) => console.log(error)
    });
  }

  render() {
    console.log('Rendering Login Page');
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
        <div>
          <p> Please sign in to view:   {from.pathname}</p>
          <div className="my-signin2-body">
              <div id="my-signin2"/>
          </div>
        </div>
    );
  }
}

export default LoginPage;
