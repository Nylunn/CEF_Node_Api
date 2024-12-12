const express = require('express');
const Reservation = require('../models/reservation');  
const router = express.Router();
const {getReservations, getReservation, createReservation, updateReservation, deleteReservation} = require('../controllers/reservation.controller')


// Routes


//Récupérer les informations des reservations
router.get('/', getReservations); 
//Récupération des infos d'une reservation
router.get('/:id', getReservation);
//Création d'une reservation
router.post("/", createReservation);
//Mise à jour d'une reservation
router.put("/:id", updateReservation);
//Suppression d'une reservation
router.delete("/:id", deleteReservation)

module.exports = router;