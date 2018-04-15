import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cfg from './cfg';
import { UserEndpoints } from './api/users';
import { BookEndpoints } from './api/books';
import { SearchEndpoints } from './api/search';

const port = 8080;

// Load the mongo config
const { mongo } = cfg;

// Connect mongoose driver to MongoDB
mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.db}`);

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
app.use('/api', apiRouter); // Attach API route

// Search
apiRouter.get('/search', SearchEndpoints.search); // Attach search route

// Textbooks
const textbookRouter = new express.Router();
apiRouter.use('/books', textbookRouter); // Attach textbook root
textbookRouter.get('/', BookEndpoints.getItem); // Retrieve all textbooks
textbookRouter.get('/:id', BookEndpoints.getItem); // Retrieve the textbook with id
textbookRouter.put('/:id', BookEndpoints.putItem); // Modify a textbook
textbookRouter.delete('/:id', BookEndpoints.deleteItem); // Delete the textbook with id


const userRouter = new express.Router();
apiRouter.use('/users', userRouter); // Attach user root
// Users
userRouter.get('/:uid', UserEndpoints.getItem); // Retrieve a user
userRouter.post('/:uid', UserEndpoints.postItem); // Create a user

// Book actions specific to a user
userRouter.get('/:uid/books', BookEndpoints.getItem); // Get user's textbooks
userRouter.post('/:uid/books', BookEndpoints.postItem); // Create a textbook for a user

// Health Test
apiRouter.get('/ping', (req, res) => res.send('pong')); // Ping Pong

// Error handling (log it and return a 500 error)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).send(err);
  next();
});

// Listen on port 8080
console.log(`Listening on port ${port}`);
app.listen(port);
