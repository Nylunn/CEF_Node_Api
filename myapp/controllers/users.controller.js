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

module.exports = {
    createUser,
    getAllUsers,
    getUsers,
    updateUser,
    deleteUser
};