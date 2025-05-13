const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express on Netlify Functions!');
});

module.exports.handler = serverless(app);
