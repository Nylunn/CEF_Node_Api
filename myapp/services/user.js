const User = require("../models/user");

/**
 * Récupère par son ID.
 * @param {string} id - L'ID à récupérer.
 * @returns {Promise<User>} -
 * @throws {Error} -
 */
const getUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return user;
    } else {
      throw new Error("user_not_found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserById,
};
