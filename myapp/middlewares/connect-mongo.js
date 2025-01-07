const MongoStore = require('connect-mongo');

app.use(
    session({
        secret: 'votre_secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/votre_base_de_donnees',
            ttl: 14 * 24 * 60 * 60 // Durée de vie en secondes (14 jours ici)
        }),
        cookie: { secure: false }
    })
);
