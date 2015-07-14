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

exports.update = function (id, bear) {
    var promise = new Promise(function (resolve, reject) {
        Bear.findByIdAndUpdate(
            id,
            bear,
            {new: true}, //--> with this option, updated user is returned
            function (err, bear) {
                if (err) {
                    reject(err);
                } else {
                    resolve(bear);
                }
            }
        );
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

exports.findById = function (id) {
    var promise = new Promise(function (resolve, reject) {
        Bear.findById(id, function (err, bear) {
            if (err) {
                reject(err);
            } else {
                resolve(bear);
            }
        });
    });

    return promise;
};

exports.remove = function(id) {
    var promise = new Promise(function (resolve, reject) {
        Bear.remove({_id: id}, function (err, bear) {
            if (err) {
                reject(err);
            } else {
                resolve(bear);
            }
        });
    });

    return promise;
};




