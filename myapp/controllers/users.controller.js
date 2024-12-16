const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Votre modèle Mongoose


// Création d'un utilisateur

const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validation de base
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }


        // Création du nouvel utilisateur
        const user = await User.create(req.body);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

// Lecture des données client


module.exports = {
    createUser
};