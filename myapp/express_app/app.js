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
const Catways = require('../models/catways.js')
const Reservations = require('../models/reservation.js')
const indexRouter = require('../routes/index');
const mongodb = require('../db/mongo');
const catwaysRoute = require('../routes/catways');
const reservationRoute = require('../routes/reservation.js');
const userRoutes = require('../routes/users.js');
const methodOverride = require('method-override');
const Users = require('../models/user.js')
const Reservation = require('../models/reservation.js');
const { isAdmin, isAuthenticated } = require('../middlewares/auth.js');
const User = require('../models/user.js');
const session = require('express-session');
app.use(methodOverride('_method'));
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

app.set('views', path.join(__dirname, 'view')); // Pointe vers le répertoire 'view'
app.set('view engine', 'ejs');


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
    
app.use(
      session({
          secret: 'votre_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
       })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    })
  );

app.use("/catways/", reservationRoute);
app.use("/catways", catwaysRoute);
app.use("/users", userRoutes);



app.get('/', async (req, res) => {
    try {
        const user  = await Users.find({});
        res.locals.user  = user; 
        res.render('index');
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});




app.get('/listofreservations',  async (req, res) => {try {
    const [reservations, users] = await Promise.all([
        Reservation.find({}),
        Users.find({})
    ]);

    res.locals.users = users;
    res.locals.reservations = reservations;
    res.render('reservationslist'); 
} catch (error) {
    res.status(500).send(error);
}
});



app.get('/listofcatways', isAuthenticated, isAdmin,  async (req, res) => {    try {
    const [catways, users] = await Promise.all([
        Catways.find({}),
        Users.find({})
    ]);

    res.locals.users = users;
    res.locals.catways = catways;
    res.render('catwayslist'); 
} catch (error) {
    res.status(500).send(error);
}
});


app.get('/catways/details/:id', isAuthenticated, isAdmin, async (req, res) => {
    const catwayId = req.params.id; // Récupérer l'ID de l'URL
    try {
        const selectedCatway = await Catways.findOne({ _id: catwayId }); // Rechercher par ID
        if (selectedCatway) {
            res.render('catwaysdetails', { catway: selectedCatway }); // Envoyer les données à la vue
        } else {
            res.status(404).send('Catway non trouvé'); // ID non trouvé
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur'); // Gérer les erreurs du serveur
    }
});


app.get('/panel', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const [reservations, catways, users] = await Promise.all([
            Reservations.find({}),
            Catways.find({}),
            Users.find({})
        ]);

        res.locals.reservations = reservations;
        res.locals.catways = catways;
        res.locals.users = users;


        res.render('panel');
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/reservations/details/:id', isAuthenticated, isAdmin, async (req, res) => {
    const reservationId = req.params.id; // Récupérer l'ID de l'URL
    try {
        const selectedReservation = await Reservation.findOne({ _id: reservationId }); // Rechercher par ID
        if (selectedReservation) {
            res.render('reservationsdetails', { reservation: selectedReservation }); // Envoyer les données à la vue
        } else {
            res.status(404).send('Reservation non trouvé'); // ID non trouvé
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur'); // Gérer les erreurs du serveur
    }
});

app.get('/about', isAuthenticated, async (req, res) => {
    try {
        const user  = await Users.find({});
        res.locals.user  = user; 
        res.render('about', { title: 'A propos' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/login', async (req, res) => {
    try {
        const user  = await Users.find({});
        res.locals.user  = user; 
        res.render('login');
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/register', async (req, res) => {
    try {
        const user  = await Users.find({});
        res.locals.user  = user; 
        res.render('register', { title: 'S\'enregister' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
}); 

app.post('/register', async (req, res) => {
    try {
        const { username, password, adminCode } = req.body;
        
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Vérifiez si c'est un admin (avec un code secret)
        const role = adminCode === 'VOTRE_CODE_SECRET' ? 'admin' : 'user';
        
        const user = new Users({
            username,
            password: hashedPassword,
            role
        });
        
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send(error);
    }
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