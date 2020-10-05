'use strict';

const mongoose = require('mongoose');
const product = require('../models/product');
const customer = mongoose.model('Customer');

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) => {
    const res = await customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
        const res = await customer.findById(id);
        return res;
}