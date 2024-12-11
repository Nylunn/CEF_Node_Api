const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const User = new Schema({
    catwayNumber: {
        type: Number,
        trim : true
    },
    type: {
        type: String,
        trim: true,
        enum: ['long', 'short']
    },
    catwayState: {
        type: String,
        trim: true,
        unique : true,
        lowercase: true 
    }
}, {
    timestamps: true
});

User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User', User);