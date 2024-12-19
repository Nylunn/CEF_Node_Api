const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}




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
        // Vérifier que les champs email et password sont fournis
        if (!email || !password) {
            return res.status(400).json({ error: 'missing_fields', message: 'Email and password are required.' });
        }

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ email });

        console.log('User found:', user); // Log l'utilisateur trouvé

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ error: 'user_not_found', message: 'User not found.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log le résultat de la comparaison

        if (!isMatch) {
            return res.status(403).json({ error: 'wrong_credentials', message: 'Invalid email or password.' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET,             // Secret key
            { expiresIn: '1h' }                 // Options (durée de validité)
        );
        
        res.status(200).json({ message: 'Authentication successful', token });

    } catch (error) {
        console.error('Authentication error:', error);

        // Gestion des erreurs générales
        res.status(500).json({ error: 'server_error', message: error.message });
    }
};


module.exports = router;

module.exports = {
    createUser,
    getAllUsers,
    getUsers,
    updateUser,
    deleteUser,
    authenticate
};