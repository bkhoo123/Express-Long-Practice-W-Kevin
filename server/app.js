const express = require('express');
const app = express();
const asyncError = require('express-async-errors')



// For testing purposes, GET /
// app.get('/', (req, res) => {
//   res.json("Express server running. No content provided at root level. Please use another route.");
// });

// always put static as the path in the beginning for static assets

app.use('/static', express.static('assets'))


app.use(express.json())
// For testing express.json middleware

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  res.on('finish', () => {
    console.log(res.statusCode);
  });
  next();
})

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

app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode
  })
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
