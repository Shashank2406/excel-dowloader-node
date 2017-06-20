// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ComicSchema = new mongoose.Schema({
    season_id : {type: String},
    name: {type: String},
    image: {type: String},
    story: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Comic', ComicSchema);