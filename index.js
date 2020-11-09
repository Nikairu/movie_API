const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const moment = require('moment');

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));

let Movies = [
  {
    title: 'Interstellar',
    Producers: ['Emma Thomas', 'Christopher Nolan', 'Lynda Obst'],
    Directors: ['Christopher Nolan'],
    genres: ['Science fiction', 'drama'],
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
    Directors: ['Bob Persichetti', 'Peter Ramsey', 'Rodney Rothman'],
    genres: ['animation'],
  },
  {
    title: 'Shrek',
    Producers: ['Aron Warner', 'John H. Williams', 'Jeffrey Katzenberg'],
    Directors: ['Andrew Adamson', 'Vicky Jenson'],
    genres: ['animation', 'comedy', 'fantasy', 'adventure'],
  },
];

let Genres = [
  {
    name: 'animation',
    description: `Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI). Computer animation can be very detailed 3D animation, while 2D computer animation can be used for stylistic reasons, low bandwidth or faster real-time renderings. Other common animation methods apply a stop motion technique to two and three-dimensional objects like paper cutouts, puppets or clay figures.

	Commonly the effect of animation is achieved by a rapid succession of sequential images that minimally differ from each other. The illusion—as in motion pictures in general—is thought to rely on the phi phenomenon and beta movement, but the exact causes are still uncertain. Analog mechanical animation media that rely on the rapid display of sequential images include the phénakisticope, zoetrope, flip book, praxinoscope and film. Television and video are popular electronic animation media that originally were analog and now operate digitally. For display on the computer, techniques like animated GIF and Flash animation were developed.
	
	Animation is more pervasive than many people realize. Apart from short films, feature films, television series, animated GIFs and other media dedicated to the display of moving images, animation is also prevalent in video games, motion graphics, user interfaces and visual effects.`,
  },
  {
    name: 'comedy',
    description: `In a modern sense, comedy (from the Greek: κωμῳδία, kōmōidía) is a genre of fiction that refers to any discourse or work generally intended to be humorous or amusing by inducing laughter, especially in theatre, television, film, stand-up comedy, books or any other medium of entertainment. The origins of the term are found in Ancient Greece. In the Athenian democracy, the public opinion of voters was influenced by the political satire performed by the comic poets at the theaters. The theatrical genre of Greek comedy can be described as a dramatic performance which pits two groups or societies against each other in an amusing agon or conflict. Northrop Frye depicted these two opposing sides as a "Society of Youth" and a "Society of the Old." A revised view characterizes the essential agon of comedy as a struggle between a relatively powerless youth and the societal conventions that pose obstacles to his hopes. In this struggle, the youth is understood to be constrained by his lack of social authority, and is left with little choice but to take recourse in ruses which engender very dramatic irony which provokes laughter.`,
  },
  {
    name: 'fantasy',
    description: `Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore. Its roots are in oral traditions, which then became fantasy literature and drama. From the twentieth century it has expanded further into various media, including film, television, graphic novels, manga, animated movies and video games.

	Fantasy is distinguished from the genres of science fiction and horror by the respective absence of scientific or macabre themes, though these genres overlap. In popular culture, the fantasy genre predominantly features settings of a medieval nature. In its broadest sense, however, fantasy consists of works by many writers, artists, filmmakers, and musicians from ancient myths and legends to many recent and popular works.`,
  },
  {
    name: 'adventure',
    description: `Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in Adventure films, sometimes as big as the characters themselves`,
  },
  {
    name: 'Science fiction',
    description: `Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.

	Science fiction, whose roots go back to ancient times, is related to fantasy, horror, and superhero fiction, and contains many subgenres. Its exact definition has long been disputed among authors, critics, scholars, and readers.
	
	Science fiction literature, film, television, and other media have become popular and influential over much of the world. Besides providing entertainment, it can also criticize present-day society, and is often said to inspire a "sense of wonder".`,
  },
  {
    name: 'drama',
    description: `In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.

	All forms of cinema or television that involve fictional stories are forms of drama in the broader sense if their storytelling is achieved by means of actors who represent (mimesis) characters. In this broader sense, drama is a mode distinct from novels, short stories, and narrative poetry or songs. In the modern era before the birth of cinema or television, "drama" within theatre was a type of play that was neither a comedy nor a tragedy. It is this narrower sense that the film and television industries, along with film studies, adopted. "Radio drama" has been used in both senses—originally transmitted in a live performance, it has also been used to describe the more high-brow and serious end of the dramatic output of radio.`,
  },
];

let Directors = [
  {
    name: 'Christopher Nolan',
    bio: `Christopher Edward Nolan CBE (/ˈnoʊlən/; born 30 July 1970) is a British-American film director, producer and screenwriter known for making personal, distinctive films within the Hollywood mainstream. His directorial efforts have grossed more than US$5 billion worldwide, garnered 34 Oscar nominations and ten wins.

		Born and raised in London, Nolan developed an interest in filmmaking from a young age. After studying English literature at University College London, he made his feature debut with Following (1998). Nolan gained international recognition with his second film, Memento (2000), for which he was nominated for the Academy Award for Best Original Screenplay. He transitioned from independent to studio filmmaking with Insomnia (2002), and found further critical and commercial success with The Dark Knight Trilogy (2005–2012), The Prestige (2006), and Inception (2010), which received eight Oscar nominations, including for Best Picture and Best Original Screenplay. This was followed by Interstellar (2014), Dunkirk (2017), and Tenet (2020). He earned Academy Award nominations for Best Picture and Best Director for his work on Dunkirk.
		
		Nolan's films are typically rooted in epistemological and metaphysical themes, exploring human morality, the construction of time, and the malleable nature of memory and personal identity. His work is permeated by mathematically inspired images and concepts, unconventional narrative structures, practical special effects, experimental soundscapes, large-format film photography, and materialistic perspectives. He has co-written several of his films with his brother Jonathan, and runs the production company Syncopy Inc. with his wife Emma Thomas.
		
		Nolan has received many awards and honours. Time named him one of the 100 most influential people in the world in 2015, and in 2019, he was appointed Commander of the Order of the British Empire for his services to film.`,
    birth_year: '1970',
    death_year: '',
  },
];

let Users = [{}];

// GET requests
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello there, welcome to the movie club!');
});

//return all movies
app.get('/movies', (req, res) => {
  res.json(Movies);
});

//return specific movie object by name
app.get('/movies/:title', (req, res) => {
  res.json(
    Movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//return all genres
app.get('/genres', (req, res) => {
  res.json(Genres);
});

//return specific genre object by name
app.get('/genres/:name', (req, res) => {
  let genre = Genres.find((genre) => {
    return genre.name === req.params.name;
  });

  res.status(200).send(genre.description);
});

//return aLl directors
app.get('/directors', (req, res) => {
  res.json(Directors);
});

app.get('/directors/:name', (req, res) => {
  let director = Directors.find((director) => {
    return director.name === req.params.name;
  });
  if (director) {
    res.json(director);
  } else {
    res.status(404).send('Director ' + req.params.name + ' was not found.');
  }
});

app.get('/users/:name/favourites/', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    res.status(200).json(user.favourites);
  } else {
  }
});

app.get('/users', (req, res) => {
  res.json(Users);
});

// POST requests

//add new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    if (
      Users.find((user) => {
        return user.name === newUser.name;
      })
    ) {
      res.status(400).send('Username taken');
    } else {
      newUser.id = uuid.v4();
      Users.push(newUser);
      res.status(201).send(newUser);
    }
  }
});

//add new favourite movie
app.post('/users/:name/addFavouriteMovie/', (req, res) => {
  let favMovie = req.body;
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });
  if (user) {
    if (favMovie.title) {
      if (!user.favourites) {
        user.favourites = [{ title: favMovie.title }];
      } else {
        user.favourites.push({ title: favMovie.title });
      }
      res
        .status(201)
        .send('Movie ' + favMovie.title + ' added to your favourites');
    } else {
      const message = 'Missing title in request body';
      res.status(400).send(message);
    }
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

//DELETE requests

app.delete('/users/:name/:password', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    Users = Users.filter((obj) => {
      return obj.name !== req.params.name;
    });
    res.status(201).send('User ' + req.params.name + ' was deleted.');
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

app.delete('/users/:name/removeFavorite/:favoriteName', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    user.favourites = user.favourites.filter((obj) => {
      return obj.title !== req.params.favoriteName;
    });
    res
      .status(201)
      .send(
        'Favourite ' +
          req.params.favoriteName +
          ' was deleted for user ' +
          req.params.name
      );
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

// PUT requests

//update user
app.put('/users/:name', (req, res) => {
  let newData = req.body;

  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    newData.id = user.id;
    Users = Users.filter((obj) => {
      return obj.name !== req.params.name;
    });
    Users.push(newData);
    res.status(201).send('Updated data for user ' + req.params.name);
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

//update password
app.put('/users/:name/updatePassword/:oldPassword/:newPassword', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    if (req.params.oldPassword === user.password || !user.password) {
      user.password = req.params.newPassword;
      res.status(201).send('Updated password for user ' + req.params.name);
    } else {
      res.status(404).send('Your current passord is incorrect.');
    }
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

//update username
app.put('/users/:name/updateUsername/:newName', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    user.name = req.params.newName;
    res.status(201).send('Updated username to ' + req.params.name);
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

//update email
app.put('/users/:name/updateEmail/:newEmail', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    user.email = req.params.newEmail;
    res
      .status(201)
      .send(
        'Updated email for user ' +
          req.params.name +
          ' to ' +
          req.params.newEmail
      );
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
});

//update birthdate
app.put('/users/:name/updateBirthdate/:newBirthDate', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });

  if (user) {
    if (moment(req.params.newBirthDate, 'DD/MM/YYYY', true).isValid()) {
      user.birthDate = req.params.newBirthDate;
      res
        .status(201)
        .send(
          'Updated birthdate for user ' +
            req.params.name +
            ' to ' +
            req.params.newBirthDate
        );
    } else {
      res.status(404).send('Invalid date format, please use DD/MM/YYYY');
    }
  } else {
    res
      .status(404)
      .send('User with the name ' + req.params.name + ' was not found.');
  }
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
