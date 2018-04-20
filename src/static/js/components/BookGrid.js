import React, {Component} from 'react';
import {GridList, Card, CardText, CardMedia, List, ListItem, CardActions, RaisedButton} from 'material-ui';
import _ from 'lodash';
import windowSize from 'react-window-size';
import * as Typicons from 'react-icons/lib/ti';

const getStyles = (props, state) => ({
  card: {
    text: {
      paddingTop: '0px',
      paddingBottom: '0px',
      div: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      },
      title: {
        textAlign: 'center'
      },
      price: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 200
      }
    }
  },
  grid: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 16
  }
});

// give user a welcome message after initial login
class BookGrid extends Component {

  buildGridCards(books, styles) {
    return _.map(books, (book, idx) => (
      <Card style={styles.card} key={idx}>
        <CardText style={styles.card.text}>
          <div style={styles.card.text.div}>
            <h2 style={styles.card.text.title}>{book.title}</h2>
            <h1 style={styles.card.text.price}>${book.price}</h1>
          </div>
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
    const styles = getStyles(this.props, this.state);

    let cols = 4;
    const windowSize = this.props.windowWidth;

    if (windowSize < 600) {
      cols = 1;
    } else if (windowSize < 800) {
      cols = 2;
    } else if (windowSize < 1000) {
      cols = 3;
    }

    return (
      <GridList cellHeight={'auto'} cols={cols} padding={8} style={styles.grid}>
        {this.buildGridCards(this.props.data, styles)}
      </GridList>
    );
  }
}

export default windowSize(BookGrid);
