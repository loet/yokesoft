var router = require('express').Router();

router.route('/')
    .get(function (req, res) {
        res.json({message: 'It works at ' + new Date().toISOString()});
    });

module.exports = router;