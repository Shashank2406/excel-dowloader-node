// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var CommentSchema = new mongoose.Schema({
    image_id: {type: String},
    comment_all: {type: Array},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Comment', CommentSchema);