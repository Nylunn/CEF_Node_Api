var express = require('express');
var router = express.Router();
const app = express()
const Catways = require('../models/catways')
const catwaysRoute = require('../routes/catways')
//middlewares
app.use(express.json());

//Routes

app.use("/catways", catwaysRoute);


  

module.exports = router;
