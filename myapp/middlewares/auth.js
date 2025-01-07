const express = require('express');
const user = require('../models/user')

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Accès refusé : droits administrateur requis' });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


module.exports = { isAdmin, isAuthenticated };