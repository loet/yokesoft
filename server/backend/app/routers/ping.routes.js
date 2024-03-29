var router = require('express').Router(),
    pingService = require('../services/ping.services.js');

router.route('/')
    .get(function (req, res) {
        var message = pingService.ping();
        res.json({message: message});
    });

module.exports = router;