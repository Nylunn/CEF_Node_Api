require('dotenv').config({ path: './env/.env' });

const mongoose = require('mongoose');



const clientOptions = {
    dbName: 'NodeApi',  // Nom de la base de données
};

// Initialisation de la connexion MongoDB
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO, clientOptions);
    } catch (error) { // Renvoie une erreur 
        console.log("Erreur de connexion MongoDB (MongoJs):", error);
        throw error;
    }
};