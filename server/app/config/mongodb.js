var mongoose = require('mongoose');
if (!mongoose.connection.db) {
    mongoose.connect('mongodb://localhost:27017/yokesoft'); // connect to our database
}
