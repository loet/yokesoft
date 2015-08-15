var Person = require('../../models/person/person.models.js'),
    Promise = require('promise'),
    _ = require('lodash');

exports.create = function (newPerson) {
    var promise = new Promise(function (resolve, reject) {
        newPerson.savedAt = new Date().getTime();
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

exports.update = function (id, updatedPerson) {
    var promise = new Promise(function (resolve, reject) {
            Person.findById(id, function (err, foundPerson) {
                if (err) {
                    reject(err);
                } else if (foundPerson === null) {
                    reject({message: "no person found with id: " + id});
                } else {
                    //concurrency check
                    if (updatedPerson.savedAt === foundPerson.savedAt) {
                        updatedPerson.savedAt = new Date().getTime();
                        foundPerson.teacherqualifications = undefined;
                        _.merge(foundPerson, updatedPerson);
                        foundPerson.markModified('teacherqualifications');
                        foundPerson.save(function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(foundPerson);
                            }
                        });
                    } else {
                        reject({message: "can not modify because already modified"});
                    }
                }
            });

        }, function (err) {
            reject(err);
        }
    );

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
            } else if (person === null) {
                reject({message: "no person found with id: " + id});
            } else {
                resolve(person);
            }
        });
    });

    return promise;
};

exports.remove = function (id) {
    var promise = new Promise(function (resolve, reject) {
        Person.remove({_id: id}, function (err, result) {
            if (err) {
                reject(err);
            } else if (result && result.result && result.result.n === 0) {
                reject({message: "could not remove person with id: " + id + " (because not found?)"});
            } else {
                resolve(result);
            }
        });
    });

    return promise;
};




