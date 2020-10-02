'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node store API",
        version: "0.0.2"
    });
});

module.exports = router;