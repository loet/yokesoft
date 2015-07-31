var Person = require('../../models/person/person.models'),
    Promise = require('promise');

exports.create = function (newPerson) {
    var promise = new Promise(function (resolve, reject) {
        var person = new Person(newPerson);
        person.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(person);
            }
        });
    });

    return promise;
};

exports.update = function (id, person) {
    var promise = new Promise(function (resolve, reject) {
        Person.findByIdAndUpdate(
            id,
            person,
            {new: true}, //--> with this option, updated person is returned
            function (err, updatedPerson) {
                if (err) {
                    reject(err);
                } else {
                    resolve(updatedPerson);
                }
            }
        );
    });

    return promise;
};

exports.getAll = function () {
    var promise = new Promise(function (resolve, reject) {
        Person.find(function (err, persons) {
            if (err) {
                reject(err);
            } else {
                resolve(persons);
            }
        });
    });

    return promise;
};

exports.findById = function (id) {
    var promise = new Promise(function (resolve, reject) {
        Person.findById(id, function (err, person) {
            if (err) {
                reject(err);
            } else {
                resolve(person);
            }
        });
    });

    return promise;
};

exports.remove = function (id) {
    var promise = new Promise(function (resolve, reject) {
        Person.remove({_id: id}, function (err, person) {
            if (err) {
                reject(err);
            } else {
                resolve(person);
            }
        });
    });

    return promise;
};




