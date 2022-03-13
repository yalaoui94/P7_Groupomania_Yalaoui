//*****************************************//
//*** Import des modules néccéssaires****//
const express = require('express'); // importer express
const router = express.Router(); // importer le router 
const userCtrl = require('../controllers/user.controller'); // iporter le fichier user.controller du dossier controllers

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//*** j'exporte mon router**// 
module.exports = router; 