var router = require('express').Router(),
    personService = require('../../services/person/person.services');


// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// on routes that end in /persons
// ----------------------------------------------------
router.route('/')

    // create a bear (accessed at POST http://localhost:8080/api/persons)
    .post(function (req, res) {
        personService.create(req.body).then(
            function (person) {
                res.json(person);
            },
            function (err) {
                res.status(500).send(err);
            });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/persons)
    .get(function (req, res) {
        personService.getAll().then(
            function (persons) {
                res.send(persons);
            },
            function (err) {
                res.status(500).send(err);
            });
    });

// on routes that end in /persons/:person_id
// ----------------------------------------------------
router.route('/:person_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/persons/:person_id)
    .get(function (req, res) {
        personService.findById(req.params.person_id).then(
            function (person) {
                res.json(person);
            },
            function (err) {
                res.status(500).send(err);
            }
        );
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/persons/:person_id)
    .put(function (req, res) {
        personService.update(req.params.person_id, req.body).then(
            function (person) {
                res.json(person);
            },
            function (err) {
                res.status(500).send(err);
            }
        );
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/persons/:person_id)
    .delete(function (req, res) {
        personService.remove(req.params.person_id).then(
            function (number) {
                res.json(number);
            },
            function (err) {
                res.status(500).send(err);
            }
        );
    });


module.exports = router;