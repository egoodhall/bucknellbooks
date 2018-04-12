import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const port = 8080;

const app = express();

// Add body parser
app.use(bodyParser.json()); // Use a body parser for json requests
app.use(bodyParser.urlencoded({ extended: false })); // Use a body parser for url-encoded requests
app.use(morgan(':method :status :url - :response-time ms')); // Request logging

// Add static server capabilities
const staticDir = path.join(__dirname, 'static');
app.use('/', express.static(staticDir)); // Serve static files through the root path

// Add API routes
const apiRouter = new express.Router();

// Search
apiRouter.get('/search'); // Attach search route

// Textbooks
const textbookRouter = new express.Router();
textbookRouter.get('/'); // Retrieve all textbooks
textbookRouter.post('/'); // Create a new textbook
textbookRouter.get('/:id'); // Retrieve the textbook with id
textbookRouter.put('/:id'); // Modify a textbook
textbookRouter.delete('/:id'); // Delete the textbook with id
apiRouter.use('/books', textbookRouter); // Attach textbook root

// Users
const userRouter = new express.Router();
userRouter.get('/'); // Get all users
userRouter.get('/:uid'); // Retrieve a user
userRouter.post('/:uid'); // Create a user
userRouter.put('/:uid'); // Modify a user
userRouter.use('/:uid/books', textbookRouter); // Allow all textbook queries
apiRouter.use('/users', userRouter); // Attach user root


app.use('/api', apiRouter); // Mount everything behind the /api sub-route

// Error handling (log it and return a 500 error)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).send(err);
  next();
});

// Listen on port 8080
console.log(`Listening on port ${port}`);
app.listen(port);
