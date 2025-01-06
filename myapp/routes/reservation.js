const express = require('express');
const Reservation = require('../models/reservation');  
const router = express.Router();
const {getReservations, getReservation, createReservation, updateReservation, deleteReservation} = require('../controllers/reservation.controller')


// Routes


//Récupérer les informations des reservations
router.get('/reservations', getReservations); 
//Récupération des infos d'une reservation
router.get('/reservations/details/:id', async (req, res) => {
    try {
        const reservations = await Reservation.findById(req.params.id);
        if (!reservations) {
            // Au lieu de render 'error', renvoyons une réponse JSON
            return res.status(404).json({ error: 'Reservations non trouvé' });
        }
        res.render('reservationsdetails', { catway });
    } catch (error) {
        console.error('Erreur:', error);
        // Au lieu de render 'error', renvoyons une réponse JSON
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
//Création d'une reservation
router.post("/reservations/add", createReservation);
//Mise à jour d'une reservation
router.put("/reservations/:id", async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const { clientName, catwayNumber, boatName, checkIn, checkOut } = req.body;
        
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { 
                clientName,
                catwayNumber,
                boatName,
                checkIn,
                checkOut
            },
            { new: true, runValidators: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.json(updatedReservation);
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.delete("/reservations/:id", deleteReservation)

module.exports = router;