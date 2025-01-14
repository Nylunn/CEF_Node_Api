// Dans users.js ou routes/users.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {createUser, getAllUsers, getUsers, updateUser, deleteUser, authenticate} = require('../controllers/users.controller') 
const private = require('../middlewares/private')


//Création d'un user
router.post('/add', private.checkJWT, createUser);
//Récupérartion de tous les users
router.get('/', private.checkJWT, getAllUsers);
//Récupération des données d'un utilisateur
router.get('/:id', private.checkJWT, getUsers)
//Mise à jour des données d'un utilisateur
router.put('/:id', private.checkJWT, updateUser)
//Suppression d'un User
router.delete('/:id', private.checkJWT, deleteUser)

//Connexion à un compte
router.post('/authenticate', private.checkJWT, authenticate)

module.exports = router;