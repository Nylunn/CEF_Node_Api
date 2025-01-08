const express = require('express');
const user = require('../models/user')

const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extraction correcte de `user` dans `req.user`
        req.user = decoded.user; 
        console.log('Decoded user:', req.user); // Log pour vérifier
        next();
    } catch (err) {
        res.status(401).send('Invalid token.');
    }
}




function isAdmin(req, res, next) {
    console.log('User role:', req.user?.role); // Log pour vérifier le rôle
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied. Admins only.');
    }
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
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}



module.exports = { isAdmin, isAuthenticated, hasRole, generateToken };