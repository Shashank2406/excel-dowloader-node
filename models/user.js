// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    role: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);