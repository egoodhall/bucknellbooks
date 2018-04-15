import User from './model.js';
import wrap from '../utils/wrapper';

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

const getItem = (req, res) => {
  const { params: { uid } } = req;
  User.findOne({ _id: uid }, respondData(req, res));
};

const postItem = (req, res) => {
  req.body._id = req.params.uid;
  console.log('Made it past)');
  try {
    new User(req.body).save(respondData(req, res));
  } catch (err) {
    res.status(500).json(wrap(false, err.message));
  }
};

export default {
  getItem,
  postItem
};
