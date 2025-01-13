const MongoStore = require('connect-mongo');

app.use(
    session({
        secret: 'GTGh6rdP54GT76',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: ' nodeapi-shard-00-02.1bcic.mongodb.net:27017',
            ttl: 14 * 24 * 60 * 60 // Durée de vie en secondes (14 jours ici)
        }),
        cookie: { secure: false }
    })
);
