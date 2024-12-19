const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

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

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création du nouvel utilisateur
        const user = await User.create({
            email,
            password: hashedPassword,
            name
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user._id });
        console.log("Utilisateur créé :", user._id);
    } catch (error) {
        console.error("Erreur création utilisateur :", error);
        res.status(500).json({ message: error.message });
    }
};

// Lecture des données clients (général)

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Lecture des données clients (par id)

const getUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

// Mise à jour des données clients

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
          return res.status(404).json({message: "utilisateur non trouvé"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updateUser)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

//Suppression d'un user

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          return res.status(404).json({message: "Utilisateur introuvable"})
        }
        res.status(200).json({message: "utilisateur supprimé"})
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

// Connexion a un user


const authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        console.log('User found:', user); // Log l'utilisateur trouvé
        console.log('Entered password:', password); // Log le mot de passe entré
        console.log('Stored password:', user.password); // Log le mot de passe stocké

        if (!user) {
            return res.status(404).json('user_not_found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log('Password match:', isMatch); // Log le résultat de la comparaison

        if (!isMatch) {
            return res.status(403).json('wrong_credentials');
        }

        // Reste du code...
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json(error.message);
    }
}

module.exports = router;

module.exports = {
    createUser,
    getAllUsers,
    getUsers,
    updateUser,
    deleteUser,
    authenticate
};