const express = require('express');
const app = express();
const asyncError = require('express-async-errors')


// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// always put static as the path in the beginning for static assets
app.use('/static', express.static('assets'))

app.use(express.json())
// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  
  // finishes the response, res.end()
  res.json(req.body);
  console.log(req.body)
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));