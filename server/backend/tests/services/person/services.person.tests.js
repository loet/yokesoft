var should = require('should'),
    Person = require('../../../app/models/person/person.models'),
    personService = require('../../../app/services/person/person.services');

require('../../../app/config/mongodb');

describe('Person Service Unit Tests:', function () {
    var timestamp = new Date().getTime(), person, id, savedAt, id2;

    beforeEach(function (done) {
        person = new Person({lastname: "thelastname", place: "theplace", email: timestamp + '@swissonline.ch', savedAt: timestamp});
        person.save(function (err, saved) {
            id = saved.id;
            savedAt = saved.savedAt;
            done();
        });
    });

    describe('create tests', function () {
        it('should create person', function (done) {
            personService.create({
                lastname: "thelastname",
                place: "theplace",
                email: timestamp + 'unique@swissonline.ch'
            })
                .then(function (person) {
                    id2 = person.id;
                    should.equal(person.email, timestamp + 'unique@swissonline.ch');
                    should.exist(person.savedAt);
                    done();
                }, function (err) {
                    throw err;
                });
        });
        it('should keep emails unique', function (done) {
            personService.create({
                lastname: "thelastname",
                "place": "theplace",
                email: timestamp + '@swissonline.ch',
                savedAt: new Date().getTime()
            })
                .then(function (person) {
                    should.not.exist(person);
                }, function (err) {
                    should.exist(err);
                    done();
                });
        });
    });

    describe('update tests', function () {
        it('should update person', function (done) {
            personService.update(id, {
                lastname: "thelastname",
                "place": "theplace",
                email: 'updated@swissonline.ch',
                savedAt: savedAt
            }).
                then(function (person) {
                    should.equal(person.email, 'updated@swissonline.ch');
                    done();
                }, function (err) {
                    throw err;
                });
        });
        it('should check for concurrent modifications', function () {
            personService.update(id, {
                lastname: "thelastname",
                "place": "theplace",
                email: timestamp + '@swissonline.ch',
                savedAt: 123456789
            }).
                then(function (person) {
                    should.not.exist(person);
                }, function (err) {
                    should.exist(err);
                    done();
                });
        });
        it('should keep emails unique', function (done) {
            personService.create({
                lastname: "thelastname",
                "place": "theplace",
                email: timestamp + 'unique@swissonline.ch',
                savedAt: new Date().getTime()
            })
                .then(function (person) {
                    id2 = person.id;
                    personService.update(id, {email: timestamp + 'unique@swissonline.ch', savedAt: savedAt})
                        .then(function (person) {
                            should.not.exist(person);
                        }, function (err) {
                            should.exist(err);
                            done();
                        });
                }, function (err) {
                    throw err;
                });
        });
    });

    describe('find by id', function () {
        it('should find by id', function (done) {
            personService.findById(id)
                .then(function (person) {
                    should.exist(person);
                    done();
                }, function (err) {
                    throw err;
                });
        });
        it('should throw error', function (done) {
            personService.findById(1)
                .then(function (person) {
                    should.not.exist(person);
                }, function (err) {
                    should.exist(err);
                    done();
                });
        });
    });

    describe('remove', function () {
        it('should throw error', function (done) {
            personService.remove('11aa1aa11a1a1aa111a1aa11')
                .then(function (result) {
                    should.not.exist(result);
                }, function (err) {
                    should.exist(err);
                    done();
                });
        });
    });

    afterEach(function (done) {
        if (id) {
            personService.remove(id);
        }
        if (id2) {
            personService.remove(id2);
            id2 = undefined;
        }
        done();
    });
});