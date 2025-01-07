const express = require('express');
const session = require('express-session');

const app = express();

app.use(
    session({
        secret: 'votre_secret', // Changez cette valeur pour plus de sécurité
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Utilisez `secure: true` si vous utilisez HTTPS
    })
);


