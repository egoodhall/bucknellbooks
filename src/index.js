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

app.use('/api', apiRouter); // Mount behind the /api sub-route

// Error handling (log it and return a 500 error)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).send(err);
  next();
});

// Listen on port 8080
console.log(`Listening on port ${port}`);
app.listen(port);
