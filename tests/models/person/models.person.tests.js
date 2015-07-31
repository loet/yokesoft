var should = require('should'),
    Person = require('../../../app/models/person/person.models');

require('../../../app/config/mongodb');

describe('Person Model Unit Tests: ', function () {
    var timestamp = new Date().getTime(), person, id;

    beforeEach(function (done) {
        person = new Person({email: timestamp + '@swissonline.ch', savedAt: new Date().getTime()});
        person.save(function (err, saved) {
            id = saved.id;
            done();
        });
    });

    describe('Test save method', function () {
        it('should save without error', function (done) {
            person.save(function (err) {
                if (err) {
                    throw err;
                }
                should.not.exist(err);
                should.equal(person.email, timestamp + '@swissonline.ch');
                done();
            });
        });
        it('should not save without email', function (done) {
            person.email = '';
            person.save(function (err) {
                should.exist(err);
                done();
            });
        });
        it('should not save without savedAt', function (done) {
            person.savedAt = '';
            person.save(function (err) {
                should.exist(err);
                done();
            });
        });
    });

    describe('Test findById method', function () {
        it('should find by id', function (done) {
            Person.findById(id, function (err, foundPerson) {
                if (err) {
                    throw err;
                }
                should.not.exist(err);
                should.equal(foundPerson.id, id);
                done();
            });
        });
    });

    afterEach(function (done) {
        person.remove(function () {
            done();
        });
    });
});