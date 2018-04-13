'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 8080;

var app = (0, _express2.default)();

// Add body parser
app.use(_bodyParser2.default.json()); // Use a body parser for json requests
app.use(_bodyParser2.default.urlencoded({ extended: false })); // Use a body parser for url-encoded requests
app.use((0, _morgan2.default)(':method :status :url - :response-time ms')); // Request logging

// Add static server capabilities
var staticDir = _path2.default.join(__dirname, 'static');
app.use('/', _express2.default.static(staticDir)); // Serve static files through the root path

// Add API routes
var apiRouter = new _express2.default.Router();

// Search
apiRouter.get('/search'); // Attach search route

// Textbooks
var textbookRouter = new _express2.default.Router();
textbookRouter.get('/'); // Retrieve all textbooks
textbookRouter.post('/'); // Create a new textbook
textbookRouter.get('/:id'); // Retrieve the textbook with id
textbookRouter.put('/:id'); // Modify a textbook
textbookRouter.delete('/:id'); // Delete the textbook with id
apiRouter.use('/books', textbookRouter); // Attach textbook root

// Users
var userRouter = new _express2.default.Router();
userRouter.get('/'); // Get all users
userRouter.get('/:uid'); // Retrieve a user
userRouter.post('/:uid'); // Create a user
userRouter.put('/:uid'); // Modify a user
userRouter.use('/:uid/books', textbookRouter); // Allow all textbook queries
apiRouter.use('/users', userRouter); // Attach user root


app.use('/api', apiRouter); // Mount everything behind the /api sub-route

// Error handling (log it and return a 500 error)
app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500).send(err);
  next();
});

// Listen on port 8080
console.log('Listening on port ' + port);
app.listen(port);