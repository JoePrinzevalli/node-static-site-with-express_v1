const express = require('express')//use require or import?? may cause probleems laters//
express();

const data = require('./data.json');

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, './public')));

app.get('/', (req, res, ) => {
    res.render('Home', {locals:'data.projects'}); //locals set to data.projects?? what does locals mean
  });
app.get('/about', (req, res, ) => {
    res.render('About'); 
  });
app.get('/projects/:id${projects.id}', (req, res, ) => {
    res.render('project here'); 
  });