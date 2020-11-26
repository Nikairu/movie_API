const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const passport = require('passport');
require('./passport');

const moment = require('moment');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());
app.use(morgan('common'));

// GET requests
app.use(express.static('public'));

let auth = require('./auth')(app);

app.get('/', (req, res) => {
  res.send('Hello there, welcome to the movie club!');
});

//return all movies
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find().then((movies) => res.json(movies));
  }
);

//return specific movie object by name
app.get(
  '/movies/:title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find({ Title: req.params.title }).then((movies) => {
      res.json(movies);
    });
  }
);

//return specific genre object by name
app.get(
  '/movies/genres/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.name }).then((movies) => {
      res.json(movies.Genre);
    });
  }
);

//get specific director data
app.get(
  '/movies/directors/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name }).then((movies) => {
      res.json(movies.Director);
    });
  }
);

// POST requests

//add new user
app.post('/users', (req, res) => {
  let newUser = req.body;
  Users.findOne({ Username: newUser.Username }).then((user) => {
    if (user) {
      res.status(400).send('Username taken');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
    }
  });
});

//add new favourite movie
app.post(
  '/users/:Username/Movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//DELETE requests

//delete user
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//delete Favorite movie from user
app.delete(
  '/users/:Username/Movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// PUT requests

//update user
app.put(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// error handling middleware, defined last in chain
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
