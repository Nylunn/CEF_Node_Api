const Reservation = require("../models/reservation");

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
