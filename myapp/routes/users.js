const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');


router.get('/:id', private.checkJWT, service.getById);
router.put('/add', service.add);
router.patch('/update', private.checkJWT, service.update);
router.delete('/delete', private.checkJWT,service.delete);


//ajout de la route authenticate
router.post('/authenticate', service.authenticate);

module.exports = router;
