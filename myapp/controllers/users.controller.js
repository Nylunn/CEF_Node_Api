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

// Connexion a un user



const authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }, '-__v -createAt -updateAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc_password;

                    const expireIn = 24 * 60 * 60;
                    const token    = jwt.sign({
                        user: user
                    },
                SECRET_KEY, 
            {
                expiresIn: expireIn
            });
               res.header('Authorization', 'Bearer ' + token);
                
               return res.status(200).json('authenticated_succeed');
            }
            return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error)
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