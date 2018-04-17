import React, { Component } from 'react';
import * as Typicons from 'react-icons/lib/ti';
import Paper from 'material-ui/Paper';

const styles = {
  iconStyle: {
    margin: '4px',
    color: '#FFFF'
  },
  appBar: {
    zIndex: 3,
    height: 80,
    justifyContent: 'center',
    display: 'flex',
    background: 'dodgerblue'
  }
};

class UserBanner extends Component {


  render() {
    return (
      <Paper elevation={4} style={styles.appBar}/>
    );
  }
}

export default UserBanner;
