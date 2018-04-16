import React, { Component } from 'react';
import UserBanner from './UserBanner';
import BookCard from './BookCard.js';

class UserPage extends Component {


  render() {
    return (
      <div>
        <UserBanner/>
        <div style={{textAlign: 'center', margin: 'auto'}}>
          <h1>User Image goes Here</h1>
          User name.
          User Email.
          User Phone.
        </div>
        <h2 style={{marginLeft: '4px', marginTop: '16px'}}>My Books</h2>
        <div style={{borderTop: '2px solid', marginLeft: '4px', marginRight: '4px'}}>
          <BookCard/>
        </div>
      </div>
    );
  }
}

export default UserPage;
