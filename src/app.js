'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const config = require('./config');

//Conexão ao Mongo
mongoose.connect(config.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("Mongodb connected...");
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Habilita o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;