// Require express, data.json file, and new relic
require('newrelic');
const express = require('express');
const { status } = require('express/lib/response');
const app = express();
const {projects} = require('./data/data.json');

// Sets view engine to pug
app.set('view engine', 'pug');

// Serves static files located in public folder
app.use('/static', express.static('public'));

// Sets routes to home, about, project
app.get('/', (req, res, next) => {
    res.render('index', {projects});   
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
      const err = new Error('Oops, looks like you wandered too far!');
      err.status = 404;
      res.locals.message = err.message;
      res.locals.status = 404;
      res.render('page-not-found');
    };
  });

// Error Handlers: 

// 404 error
app.use((req, res, next) => {
      const err = new Error('Oops, looks like you wandered too far!');
      err.status = 404;
      next(err);
});

// Global error  
app.use((err, req, res, next) => {
  if(err.status === 404) {
    res.locals.message = err.message;
    res.locals.status = 404;
    err.stack;
    console.log(err, err.status, 'Handling a 404 error!');
    res.render('page-not-found');
  } else {
    err.status = 500;
    res.locals.message = err.message;
    res.locals.status = 500;
    console.log(err.status, err.message, 'Handling a global error!');
    res.render('error');
  };
});

// App to listen on port 3000
app.listen(3000, () => {
  console.log('app is listening on port 3000!');
})