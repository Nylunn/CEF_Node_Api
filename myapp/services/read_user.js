const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserService {
  async getUser(userData) {
    const { id } = id;
    const user = await User.findById(id);
    res.status(200).json(user);
  }
}

module.exports = new UserService();
