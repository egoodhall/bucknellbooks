import React, { Component } from 'react';
import * as Typicons from 'react-icons/lib/ti';

const iconStyle = {
  margin: '4px',
  color: '#FFFF'
};

class UserBanner extends Component {


  render() {
    return (
      <div style={{height: '24px', backgroundColor: 'dodgerblue', width: '100%'}}>
        <Typicons.TiArrowLeft size={20} style={iconStyle}/>
      </div>
    );
  }
}

export default UserBanner;
