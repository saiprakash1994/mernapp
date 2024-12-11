const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Ensure the collection name is explicitly set (if needed)
const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
