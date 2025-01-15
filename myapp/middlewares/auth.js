const express = require('express');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;






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

module.exports = {  authenticateToken, generateToken, renewToken };