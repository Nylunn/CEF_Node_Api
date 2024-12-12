const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        trim : true,
        required: true
    },
    clientName: {
        type: String,
        trim: true,
        required: true
    },
    boatName: {
        type: String,
        trim: true,
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;