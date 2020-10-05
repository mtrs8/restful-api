'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.post('/authenticate', controller.authenticate);

router.post('/', controller.post);

module.exports = router;