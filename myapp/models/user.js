const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        trim : true
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
},
{
    timestamps: true
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;