import React, {Component} from 'react';
import {Chip, GridList, Card, CardText, CardMedia, List, ListItem, CardActions, RaisedButton} from 'material-ui';
import _ from 'lodash';
import windowSize from 'react-window-size';
import * as Typicons from 'react-icons/lib/ti';
import Dotdotdot from 'react-dotdotdot';
import Tooltip from 'react-tooltip';

const getStyles = (props, state) => ({
  card: {
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      paddingTop: '0px',
      paddingBottom: '0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
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
  },
  newcard: {
    background: '#eee',
    border: '1.5px dashed #ccc',
    cursor: 'pointer',
    text: {
      fontSize: '1.85em',
      fontWeight: 200,
      textAlign: 'center',
      color: '#aaa'
    }
  }
});

// give user a welcome message after initial login
class BookGrid extends Component {

  getCardActions(book) {
    if (this.props.onSelectBook !== undefined) {
      const chip = book.sold
        ? { text: 'Sold', bg: '#7cb342', fg: '#fff' }
        : { text: 'Not Sold', bg: '#f44336', fg: '#fff' };
      return ([
        <RaisedButton key={'edit'} label="Edit" primary={true} onClick={() => this.props.onSelectBook(book)} />,
        <div key={'sold'}><Chip backgroundColor={chip.bg} labelColor={chip.fg}>{chip.text}</Chip></div>
      ]);
    } else {
      return (<RaisedButton label="Contact Seller" secondary={true}/>);
    }
  }

  buildGridCards(styles) {

    // Build all normal cards
    const cards = _.map(this.props.data, (book, idx) => (
      <Card style={styles.card} key={idx}>
        <CardText style={styles.card.text}>
          <div title={book.title}>
            <Dotdotdot
              clamp={1}
              tagName={'h2'}
              style={styles.card.text.title}
            >
              {book.title}
            </Dotdotdot>
          </div>
          <h1 style={styles.card.text.price}>${book.price}</h1>
        </CardText>
        <CardMedia>
          <div>
            <List>
              <ListItem
                primaryText={book.isbn}
                leftIcon={
                  <Typicons.TiBookmark
                    color={'#9e9e9e'}
                    size={20}
                  />
                }
              />
              <ListItem
                primaryText={book.course}
                leftIcon={
                  <Typicons.TiClipboard
                    color={'#9e9e9e'}
                    size={20}
                  />
                }
              />
            </List>
          </div>
        </CardMedia>
        <CardActions style={styles.card.actions}>
          {this.getCardActions.bind(this)(book)}
        </CardActions>
      </Card>
    ));

    // Prepend a "New card" card if onCreate is defined
    if (this.props.onCreate !== undefined) {
      cards.unshift(
        <Card style={styles.newcard} onClick={this.props.onCreate} key={-1}>
          <CardText>
            <p style={styles.newcard.text}>&nbsp;</p>
            <p style={styles.newcard.text}>Add New Book</p>
            <p style={styles.newcard.text}>&nbsp;</p>
          </CardText>
        </Card>
      );
    }

    // Return all cards in grid list
    return cards;
  }

  render() {
    const styles = getStyles(this.props, this.state);

    const windowSize = this.props.windowWidth;

    let cols = 4;
    if (windowSize < 600) {
      cols = 1;
    } else if (windowSize < 900) {
      cols = 2;
    } else if (windowSize < 1100) {
      cols = 3;
    }

    return (
      <GridList cellHeight={'auto'} cols={cols} padding={16} style={styles.grid}>
        {this.buildGridCards.bind(this)(styles)}
      </GridList>
    );
  }
}

export default windowSize(BookGrid);
