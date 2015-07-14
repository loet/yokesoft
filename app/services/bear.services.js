var Bear = require('../models/bear.models.js'),
    Promise = require('promise');

exports.create = function (bear) {
    var promise = new Promise(function (resolve, reject) {
        var bear = new Bear(bear);
        bear.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(bear);
            }
        });
    });

    return promise;
};

exports.getAll = function () {
    var promise = new Promise(function (resolve, reject) {
        Bear.find(function (err, bears) {
            if (err) {
                reject(err);
            } else {
                resolve(bears);
            }
        });
    });

    return promise;
};