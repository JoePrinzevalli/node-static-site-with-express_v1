// Require express and data.json file
require('newrelic');
const express = require('express');
const app = express();
const {projects} = require('./data/data.json');

// SSets view engine to pug
app.set('view engine', 'pug');

// Serves static files located in public folder
app.use('/static', express.static('public'));


// Sets routes to home, about, project
app.get('/', (req, res, next) => {
    res.render('index', {projects});    //did i set the locals right??
    // res.locals = data.projects;
  });
app.get('/about', (req, res, next) => {
    res.render('about'); 
  });
app.get('/project/:id', (req, res, next) => { 
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if(project) {
      res.render('project', {project}); 
    } else {
      res.sendStatus(404);
    };
  });


// Error handlers: i think these are wrong

// 404 error
app.use((req, res, next) => {
    if(err.status === 404) {
      const err = new Error('Page not found');
      err.status = 404;
      err.message = "Oops, we couldn't find the page you were looking for!";
      console.log(err, err.status, 'Handling a 404 error!');
    } else {
      next(err);
    }
});

// Global error
app.use((err, req, res, next) => {
  err.status = 500;
  err.message = "Oops, it seems like there is a server error!";
  console.log(err.status, err.message, 'Handling a global error!');
});

// Sets route to 404 page
app.get('/page-not-found', (req, res, next) => {
    res.render('page-not-found', {error});
})


// App to listen on port 3000
app.listen(3000, () => {
  console.log('app is listening on port 3000!');
})
