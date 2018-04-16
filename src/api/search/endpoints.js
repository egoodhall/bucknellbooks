import { Book } from '../books';
import wrap from '../utils/wrapper';
import soundex from 'soundex';
import _ from 'lodash';

const respondData = (req, res) => {
  return (err, data) => {
    // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).json(wrap(false, err.message));
      return;
    }
    // Return data
    res.json(wrap(true, data.hits.hits));
  };
};

const search = (req, res) => {
  console.log('Sending search for:', req.query.text);
  Book.search({
    multi_match: {
      query: req.query.text,
      fuzziness: 2,
      fields: [ 'title', 'isbn', 'courseDpt' ],
      slop: 10
    }
  },
    respondData(req, res)
  );
};

export default {
  search
};
