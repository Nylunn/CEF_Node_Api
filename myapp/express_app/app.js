const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 3000;
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
const Users = require('../models/user.js')
const Reservation = require('../models/reservation.js');
const User = require('../models/user.js');
const cookieParser = require('cookie-parser');
const private = require('../middlewares/private');



const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

app.set('views', path.join(__dirname, 'view')); // Pointe vers le répertoire 'view'
app.set('view engine', 'ejs');

//Connexion a la db

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

    
const corsOptions = {
    origin: '*', 
    allowedHeaders: ['Authorization', 'Content-Type'],
};
app.use(cookieParser());
app.use(cors(corsOptions));
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

  //FIN DES DEPENDANCES

app.use("/catways/", reservationRoute);
app.use("/catways", catwaysRoute);
app.use("/users", userRoutes);



app.get('/',  async (req, res) => {
    try {
        const user  = await Users.find({});
        res.locals.user  = user; 
        res.render('index');
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});




app.get('/listofreservations', private.checkJWT,  async (req, res) => {try {
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



app.get('/listofcatways', private.checkJWT,  async (req, res) => {
    try {
        const [catways, users] = await Promise.all([
            Catways.find({}),
            Users.find({})
        ]);

        res.locals.catways = catways;
        res.locals.users = users;
        res.render('catwayslist');
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.get('/catways/details/:id', private.checkJWT,   async (req, res) => {
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



app.get('/reservations/details/:id', private.checkJWT,  async (req, res) => {
    const reservationId = req.params.id; // Récupérer l'ID de l'URL
    try {
        const selectedReservation = await Reservation.findOne({ _id: reservationId }); // Rechercher par ID
        if (selectedReservation) {
            res.render('reservationsdetails', {user: req.user  , reservation: selectedReservation });
             // Envoyer les données à la vue
        } else {
            res.status(404).send('Reservation non trouvé'); // ID non trouvé
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur'); // Gérer les erreurs du serveur
    }
});

//page a propos

app.get('/about', async (req, res) => {
    try {
        res.render('about', /* {
            user: req.user  
        }*/);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});
// Panel

app.get('/panel', private.checkJWT,   async (req, res) => {
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

//fonction pour le login

app.get('/login',  async (req, res) => {
    try {
        res.render('login', {
            user: req.user || { role: 'user' }, // Valeur par défaut
            userToken: ''});
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
    
});


app.post('/users/authenticate', async (req, res) => {

    try {
        console.log('Requête reçue:', req.body);
        const { email, password } = req.body;

        // Trouve l'utilisateur
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Vérifie le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Prépare les données utilisateur pour le token
        const userData = {
            id: user._id.toString(), // Convertit explicitement l'ObjectId en string
            name: user.name,
            email: user.email,
            role: user.role
        };

        console.log('Données utilisateur pour le token:', userData);

        // Génère directement le token ici plutôt qu'utiliser generateToken
        const token = jwt.sign(userData, process.env.JWT_SECRET, { 
            expiresIn: '24h' 
        });

        // Configure le cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Vérifie que le token est valide
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token décodé pour vérification:', decoded);

        // Envoie la réponse
        return res.json({
            success: true,
            message: 'Connexion réussie',
            user: userData
        });

    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Erreur lors de la connexion'
        });
    }
});

//Déconnexion

app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
});

//Fonction d'enregistrement

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






module.exports = app;