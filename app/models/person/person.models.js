var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PersonSchema = new Schema({
        email: {type: String, required: true},
        firstname: String,
        lastname: String,
        street: String,
        zip: String,
        place: String,
        country: String
    });

PersonSchema.path('email').index({unique: true});

module.exports = mongoose.model('Person', PersonSchema);