import React, {Component} from 'react';
import {GridList, Card, CardText, CardMedia, List, ListItem, CardActions, RaisedButton} from 'material-ui';
import _ from 'lodash';
import * as Typicons from 'react-icons/lib/ti';

// give user a welcome message after initial login
class BookGrid extends Component {

  buildGridCards(books) {
    return _.map(books, (book, idx) => (
      <Card style={{ margin: 8 }} >
        <CardText>
          <h2 style={{textAlign: 'center'}}>{book.title}</h2>
          <h3 style={{textAlign: 'center', color: 'green'}}>${book.price}</h3>
        </CardText>
        <CardMedia>
          <List>
            <ListItem primaryText={`ISBN: ${book.isbn}`} leftIcon={<Typicons.TiBookmark color={'#9e9e9e'} size={20}/>}/>
            <ListItem primaryText={`Course: ${book.courseDpt}`} leftIcon={<Typicons.TiClipboard color={'#9e9e9e'} size={20}/>}/>
          </List>
        </CardMedia>
        <CardActions>
          <RaisedButton label="Contact Seller" secondary={true}/>
        </CardActions>
      </Card>
    ));
  }

  render() {
    return (
      <GridList cellHeight={200} cols={4} style={{ marginLeft: '10%', marginRight: '10%', marginTop: 16 }}>
        {this.buildGridCards(this.props.data)}
      </GridList>
    );
  }
}

export default BookGrid;
