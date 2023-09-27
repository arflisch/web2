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
    getpizza: '/pizzas',
    post: '/pizzas',
    delete: '/pizzas',
};

app.use((req, res, next) => {
    if(METHODE.get === req.method){
        nbrGetRequest++;
    }
    if(METHODE.getpizza === req.method){
        nbrGetPizzaRequest++;
    }
    if(METHODE.post === req.method){
        nbrPostRequest++;
    }
    if(METHODE.delete === req.method){
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
