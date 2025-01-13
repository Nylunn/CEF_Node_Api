const express = require('express');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Contenu du token:', decoded);

        // Vérifie que les données nécessaires sont présentes
        if (!decoded.id || !decoded.role) {
            console.log('Token invalide - données manquantes');
            res.clearCookie('authToken');
            return res.redirect('/login');
        }

        // Attache les données utilisateur à la requête
        req.user = decoded;
        next();

    } catch (error) {
        console.error('Erreur authentification:', error);
        res.clearCookie('authToken');
        return res.redirect('/login');
    }
}

function isAdmin(req, res, next) {
    let user = null;
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            user = decoded.user;
        });
    }

    if (!user) {
        console.log('User is not defined in the request');
        return res.status(403).send('Access denied.');
    }

    if (user.role !== 'admin') {
        console.log(`Access denied for user with role: ${req.user.role}`);
        return res.status(403).send('Access denied. Admins only.');
    }

    next();
}


function hasRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).send(`Access denied. ${role.charAt(0).toUpperCase() + role.slice(1)}s only.`);
        }
    };
}


function generateToken(user) {
    // Vérifions ce qu'on reçoit
    console.log('Génération token pour:', user);
    
    // On extrait directement les propriétés dont on a besoin
    const payload = {
        id: user._id?.toString(), // Convertit ObjectId en string si nécessaire
        name: user.name,
        email: user.email,
        role: user.role
    };
    
    console.log('Payload du token:', payload);
    
    // On retourne le token avec uniquement ces informations
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}
function renewToken(req, res, next) {
    if (req.user) {
        // Renouvelle le token
        const newToken = generateToken(req.user);
        res.cookie('authToken', newToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
    }
    next();
}

module.exports = { isAdmin, isAuthenticated, hasRole, generateToken, renewToken };