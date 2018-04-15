import Book from './model.js';
import _ from 'lodash';
import wrap from '../utils/wrapper';
import soundex from 'soundex';

const respondData = (req, res) => {
  return (err, data) => {
      // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).json(wrap(false, err.message));
      return;
    }
    // Return data
    res.json(wrap(true, data));
  };
};

/**
 * Get a book (or multiple) from the database
 * @param {object} req The request object
 * @param {object} res The response object
 */
const getItem = (req, res) => {
  const { params: { id, uid } } = req;

  // Decide which data to find
  if (id) {
    Book.findOne({ _id: id }, respondData(req, res));
  } else if (uid) {
    Book.find({ ownerId: uid }, respondData(req, res));
  } else {
    Book.find({}, respondData(req, res));
  }
};

const postItem = (req, res) => {
  req.body.uid = req.params.uid;
  new Book(req.body).save(respondData(req, res));
};

const putItem = (req, res) => {
  if (req.body.title) {
    req.body.soundex = _(req.body.title).split(' ').map(str => soundex(str)).join(' ');
  }
  Book.update({ _id: req.params.id }, req.body, respondData(req, res));
};

const deleteItem = (req, res) => {
  Book.deleteOne({ _id: req.params.id }, respondData(req, res));
};

export default {
  getItem,
  postItem,
  putItem,
  deleteItem
};
