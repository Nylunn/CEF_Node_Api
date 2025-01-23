const express = require("express");
const Reservation = require("../models/reservation");
const router = express.Router();
const private = require("../middlewares/private");
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation.controller");

// Routes

//Récupérer les informations des reservations
router.get("/reservations", private.checkJWT, getReservations);
//Récupération des infos d'une reservation
router.get("/reservations/details/:id", private.checkJWT, getReservation);
//Création d'une reservation
router.post("/reservations/add", private.checkJWT, createReservation);
//Mise à jour d'une reservation
router.put("/reservations/:id", private.checkJWT, async (req, res) => {
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
        checkOut,
      },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/reservations/delete", private.checkJWT, async (req, res) => {
  const { id } = req.body;

  try {
    // Vérifie que l'ID est fourni
    if (!id) {
      return res.status(400).send("ID requis pour supprimer une reservations");
    }

    // Suppression de l'utilisateur
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).send("Reservation non trouvé");
    }

    // Redirige ou renvoie une réponse après succès
    res.redirect("/panel"); // Remplace par la page où tu veux rediriger après suppression
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la suppression");
  }
});

router.delete("/reservations/:id", private.checkJWT, deleteReservation);

module.exports = router;
