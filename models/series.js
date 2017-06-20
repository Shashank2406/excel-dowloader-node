// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var SeriesSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Series', SeriesSchema);