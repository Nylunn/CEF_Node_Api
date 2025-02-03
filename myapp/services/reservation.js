const Reservation = require("../models/reservation");

/** Ici je viens créer le services pour réservations, il viens récupérer l'ID de la BDD pour retourner ou non les informations*/
/**
 * Récupère par son ID.
 * @param {string} id - L'ID à récupérer.
 * @returns {Promise<User>} -
 * @throws {Error} -
 */
const getReservationById = async (id) => {
  try {
    const reservation = await Reservation.findOne({ _id: id });
    if (reservation) {
      return reservation;
    } else {
      throw new Error("reservation_not_found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getReservationById,
};
