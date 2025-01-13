const express = require('express');
const session = require('express-session');

const app = express();

app.use(
    session({
        secret: 'GTGh6rdP54GT76', // Changez cette valeur pour plus de sécurité
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Utilisez `secure: true` si vous utilisez HTTPS
    })
);


