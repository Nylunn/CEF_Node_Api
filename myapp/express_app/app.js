const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: '../env/.env' });
const mongoose = require('mongoose');
const { initClientDbConnection } = require('../db/mongo.js');
const path = require('path');

const indexRouter = require('../routes/index');
const mongodb = require('../db/mongo');
const catwaysRoute = require('../routes/catways');
const reservationRoute = require('../routes/reservation.js');
const userRoutes = require('../routes/users.js');


initClientDbConnection()
    .then(() => {
        console.log("MongoDB est connecté");
        // Démarrer le serveur uniquement après une connexion réussie
        app.listen(port, () => {
            console.log(`Serveur lancé sur le port ${port}`);
        });
    })
    .catch(err => {
        console.error("Échec de la connexion MongoDB ->", err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/catways/:id/", reservationRoute);
app.use("/catways", catwaysRoute);
app.use("/users", userRoutes);
    // view engine setup
app.use(helmet());
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/panel', (req, res) => {
    res.render('panel', { title: 'Panel' });
});

app.get('/listofreservations', (req, res) => {
    res.render('reservationslist', { title: 'Liste des réservations' });
});

app.get('/listofcatways', (req, res) => {
    res.render('catwayslist', { title: 'Liste des catways' });
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'A propos' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Connexion' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'S\'enregister' });
});

app.use(cors({
     exposedHeader : ['Authorization'],
      origin: '*'
}));
app.use(logger('dev'));
app.use(cookieParser());

  
app.use('/', indexRouter);
 

app.use(function(req, res, next) {
    res.status(404).json({name: 'NodeApi', version: '1.0', status: 404, message: 'not_found'});
});
module.exports = app;