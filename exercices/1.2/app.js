var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pizzaRouter = require('./routes/pizzas');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let nbrGetRequest = 0;
let nbrGetPizzaRequest = 0;
let nbrPostRequest = 0;
let nbrDeleteRequest = 0;

const METHODE = {
    get: '/',
    getpizza: '/pizza',
    post: '/pizza',
    delete: '/pizza',
};

app.use((req, res, next) => {
    if(METHODE.get === req.get){
        nbrGetRequest++;
    }
    if(METHODE.getpizza === req.get){
        nbrGetPizzaRequest++;
    }
    if(METHODE.post === req.post){
        nbrPostRequest++;
    }
    if(METHODE.delete === req.delete){
        nbrDeleteRequest++;
    }
    console.log('Request counter:');
    console.log('GET :',  nbrGetRequest);
    console.log('GET /pizza :',  nbrGetPizzaRequest);
    console.log('POST /pizza :',  nbrPostRequest);
    console.log('DELETE /pizza :',  nbrDeleteRequest);
    next();
  });

app.use('/pizzas', pizzaRouter);
app.use('/users', usersRouter);

module.exports = app;
