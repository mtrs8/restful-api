'use strict' 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexão ao Mongo
mongoose.connect('mongodb+srv://root:root123@cluster0.hr95k.mongodb.net/dbteste-api?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//carrega os models
const Product = require('./models/product');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;