/**
 * Inports
 * Start
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
/**
 * Imports 
 * End
 */

var app= express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err)=> {
        if(err) {
            console.log('Unable to append tto server.log');
        }
        else {
            next();
        }
    });
});
/* app.use((req,res)=> {
    res.render('maintainance.hbs');
}); */
app.use(express.static(__dirname+'/public'));

const server_port = 3000;

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express !</h1>');
    /* res.send({
        name: 'Andrew',
        likes: [
            'Boxing',
            'Martial Arts'
        ]
    }); */
    res.render('help.hbs', {
        pageTitle: 'Home Page',
        welcomeTitle: 'Welcome to My Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle the request'
   });
});
app.listen(server_port, () => {
    console.log(`Server is running on port : ${server_port}`);
});