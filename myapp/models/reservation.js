const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    clientName: {
        type: String,
        default: "john",
        required: true
    },
    boatName: {
        type: String,
        trim: true,
        default: "catamaran",
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now,
    },
    checkOut: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;