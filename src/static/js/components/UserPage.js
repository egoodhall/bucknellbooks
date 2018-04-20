import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import * as Typicons from 'react-icons/lib/ti';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withRouter } from 'react-router-dom';


const getStyles = (props, state) => ({
  iconStyle: {
    position: 'absolute',
    marginTop: '10px',
    left: '0px',
    color: '#FFFF',
    cursor: 'pointer'
  },
  appBar: {
    zIndex: 3,
    height: 80,
    justifyContent: 'center',
    display: 'flex',
    background: props.muiTheme.palette.primary1Color
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '8px'
  }
});

class UserPage extends Component {


  render() {
    const styles = getStyles(this.props, this.state);
    const user = this.props.gUser;
    return (
      <div>
        <Paper elevation={4} style={styles.appBar}>
          <Typicons.TiArrowLeft onClick={() => this.props.history.push('/')}size={60} style={styles.iconStyle}/>
        </Paper>
        <div style={styles.profileHeader}>
          <Avatar src={user.Paa} size={128} />
          <h3 style={{margin: '1px'}}>{user.ig}</h3>
          <h3 style={{margin: '1px'}}>{user.U3}</h3>
        </div>
        <h2 style={{marginLeft: '4px', marginTop: '16px', marginBottom: '4px'}}>My Books</h2>
        <div style={{borderTop: '1px solid', marginLeft: '4px', marginRight: '4px'}}>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(withRouter(UserPage));
