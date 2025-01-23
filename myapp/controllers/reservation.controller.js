const Reservation = require("../models/reservation");

//Récupération des informations des reservations

const getReservations = async (req, res) => {
  try {
    const reservation = await Reservation.find({});
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Création d'une reservation

const createReservation = async (req, res) => {
  try {
    const existingReservation = await Reservation.findOne({
      catwayNumber: req.body.catwayNumber,
    });

    if (existingReservation) {
      return res.status(400).json({ message: "Ce numéro de voie existe déjà" });
    }

    const reservation = await Reservation.create(req.body);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Récupération des informations d'une reservation

const getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mise à jour d'une reservation

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(id, req.body);
    if (!reservation) {
      return res.status(404).json({ message: "reservation non trouvé" });
    }
    const updatedReservation = await Reservation.findById(id);
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Suppression d'une reservation

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ message: "reservation introuvable" });
    }
    res.status(200).json({ message: "reservation supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  createReservation,
};
