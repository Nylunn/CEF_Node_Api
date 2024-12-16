const express = require('express');
const Reservation = require('../models/reservation');  
const router = express.Router();
const {getReservations, getReservation, createReservation, updateReservation, deleteReservation} = require('../controllers/reservation.controller')


// Routes


//Récupérer les informations des reservations
router.get('/reservations', getReservations); 
//Récupération des infos d'une reservation
router.get('/reservations/:id', getReservation);
//Création d'une reservation
router.post("/reservations/", createReservation);
//Mise à jour d'une reservation
router.put("/reservations/:id", updateReservation);
//Suppression d'une reservation
router.delete("/reservations/:id", deleteReservation)

module.exports = router;