var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PersonSchema = new Schema({
        email: {type: String, required: true},
        firstname: String,
        lastname: {type: String, required: true},
        street: String,
        zip: String,
        place: {type: String, required: true},
        country: String,
        remarks: String,
        teacher: Boolean,
        student: Boolean,
        teacherqualifications: [String],
        imageData: String,
        savedAt: {type: Number, required: true}
    });

PersonSchema.path('email').index({unique: true});

module.exports = mongoose.model('Person', PersonSchema);