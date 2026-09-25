require('dotenv').config();
const express = require('express');
const path = require('path');
const movieHandler = require('./movie-handler');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.all('/api/movies', (req, res) => movieHandler(req, res));
app.all('/api/movies/:id', (req, res) => {
  req.query.id = req.params.id;
  return movieHandler(req, res);
});
app.listen(process.env.PORT || 3000, () => console.log(`Movie app at http://localhost:${process.env.PORT || 3000}`));
