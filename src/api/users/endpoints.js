import User from './model.js';

const get = (req, res) => {
  const { params: { uid } } = req;
  User.findOne({ _id: uid }, (err, result) => {
    // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).send();
    }
    // Return data
    res.json(result);
  });
};

const post = (req, res) => {
  new User(req.body).save((err) => {
    // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).send();
    }
    // Return data
    res.status(200).send();
  });
};

const put = (req, res) => {
  User.update({ _id: req.params.uid }, { $push: { books: req.body } }, (err) => {
    // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).send();
    }
    // Return data
    res.status(200).send();
  });
};

export {
  get,
  post,
  put
};
