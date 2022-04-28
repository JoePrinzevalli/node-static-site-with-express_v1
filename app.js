// require express and data.json file
const express = require('express');//use require or import?? may cause probleems laters//
const app = express();
const {projects} = require('./data/data.json');

// sets view engine to pug
app.set('view engine', 'pug');

// serves static files located in public folder
app.use('/static', express.static('public'));


// sets routes to home, about and project pages
app.get('/', (req, res, next) => {
    res.render('index', {projects});    //did i set the locals right??
    // res.locals = data.projects;
    next();
  });
app.get('/about', (req, res, next) => {
    res.render('about'); 
    next();
  });
app.get('/project/:id', (req, res, next) => { 
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if(project) {
      res.render('project', {project}); 
    } else {
      res.sendStatus(404);
    };
    next();
  });


// Error handlers: i think these are wrong

// 404 error
app.use((req, res, next) => {
    const err = new Error('err');
    err.status = 404;
    err.message = "Oops, we couldn't find the page you were looking for!";
    console.log(err, err.status, 'Handling a 404 error!');
    next(err);
    throw err;
});

// Global error
app.use((req, res, next, err) => {
  err.status = 500;
  err.message = "Oops, it seems like there is a server error!";
  console.log(err.status, err.message, 'Handling a global error!');
});




// app to listen on port 3000
app.listen(3000, () => {
  console.log('app is listening on port 3000!');
})
