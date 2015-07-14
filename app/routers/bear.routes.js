var router = require('express').Router(),
    bearService = require('../services/bear.services'),
    Bear = require('../models/bear.models.js');


// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        bearService.create(req.body).then(
            function (bear) {
                console.log('bear: ' + bear);
                res.json(bear);
            },
            function (err) {
                res.send(err);
            });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        bearService.getAll().then(
            function (bears) {
                res.send(bears);
            },
            function (err) {
                res.send(err);
            });
    })

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function (req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function (err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Bear updated!'});
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });


module.exports = router;