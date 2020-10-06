'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('/authenticate', controller.authenticate);

router.post('/', controller.post);

router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;