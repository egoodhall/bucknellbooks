import React, {Component} from 'react';
import { Snackbar } from 'material-ui';

// give user a welcome message after initial login
class WelcomeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  //open welcome message if we are just beginning the session
  componentWillMount() {
    let shouldBeWelcomed = (sessionStorage.getItem('beginSession') === 'true');
    this.setState({open: shouldBeWelcomed});
  }

  //close the welcome message
  handleRequestClose() {
    sessionStorage.setItem('beginSession', false);
    this.setState({ open: false });
  }

  render() {
    let user = JSON.parse(sessionStorage.getItem('user'));

    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={`Welcome back, ${user.firstName}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    );
  }
}

export default WelcomeMessage;
