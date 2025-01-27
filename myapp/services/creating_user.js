const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserService {
  async createUser(userData) {
    const { email, password, name } = userData;

    // Validation de base
    if (!email || !password || !name) {
      throw new Error("Tous les champs sont requis");
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return {
      userId: user._id,
      message: "Utilisateur créé avec succès",
    };
  }
}

module.exports = new UserService();
