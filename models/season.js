// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var SeasonSchema = new mongoose.Schema({
    series_id: {type: String},
    name: {type: String},
    description: {type: String},
    startson: {type: String},
    endson: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Season', SeasonSchema);