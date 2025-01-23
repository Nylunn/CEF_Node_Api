const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUsers,
  updateUser,
  deleteUser,
  authenticate,
} = require("../controllers/users.controller");
const private = require("../middlewares/private");

//Création d'un user
router.post("/add", createUser);
//Récupérartion de tous les users
router.get("/", private.checkJWT, getAllUsers);
//Récupération des données d'un utilisateur
router.get("/:id", private.checkJWT, getUsers);
//Mise à jour des données d'un utilisateur
router.put("/:id", private.checkJWT, updateUser);
//Suppression d'un User
router.delete("/:id", private.checkJWT, deleteUser);

router.post("/update", private.checkJWT, async (req, res) => {
  const { id, name, email } = req.body;

  try {
    // Vérifie que l'ID est fourni
    if (!id) {
      return res.status(400).send("ID requis pour la mise à jour");
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true } // Retourne l'utilisateur mis à jour
    );

    if (!updatedUser) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    // Redirige ou renvoie une réponse après succès
    res.redirect("/panel");
    // Remplace par la page où tu veux rediriger après mise à jour
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la mise à jour");
  }
});

router.post("/delete", private.checkJWT, async (req, res) => {
  const { id } = req.body;

  try {
    // Vérifie que l'ID est fourni
    if (!id) {
      return res.status(400).send("ID requis pour supprimer un utilisateur");
    }

    // Suppression de l'utilisateur
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    // Redirige ou renvoie une réponse après succès
    res.redirect("/panel"); // Remplace par la page où tu veux rediriger après suppression
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la suppression");
  }
});

//Connexion à un compte
router.post("/authenticate", authenticate);

module.exports = router;
