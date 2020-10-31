const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Interstellar',
    Producers: ['Emma Thomas', 'Christopher Nolan', 'Lynda Obst'],
  },
  {
    title: 'Spider-Man: Into the Spider-Verse',
    Producers: [
      'Avi Arad',
      'Amy Pascal',
      'Phil Lord',
      'Christopher Miller',
      'Christina Steinberg',
    ],
  },
  {
    title: 'Shrek',
    Producers: ['Aron Warner', 'John H. Williams', 'Jeffrey Katzenberg'],
  },
];

// GET requests
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello there, welcome to the movie club!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// error handling middleware, defined last in chain
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
