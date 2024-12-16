// Dans users.js ou routes/users.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {createUser, getAllUsers, getUsers, updateUser, deleteUser} = require('../controllers/users.controller') 


//Création d'un user
router.post('/add', createUser);
//Récupérartion de tous les users
router.get('/', getAllUsers);
//Récupération des données d'un utilisateur
router.get('/:id', getUsers)
//Mise à jour des données d'un utilisateur
router.put('/:id', updateUser)
//Suppression d'un User
router.delete('/:id', deleteUser)

module.exports = router;