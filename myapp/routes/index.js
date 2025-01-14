var express = require('express');
var router = express.Router();
const app = express()
const Catways = require('../models/catways')
const catwaysRoute = require('../routes/catways') 
const private = require('../middlewares/private')
//middlewares
app.use(express.json());

//Routes

app.use("/catways", private.checkJWT, catwaysRoute);


  

module.exports = router;
