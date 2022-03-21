//*****************************************//
//*** Import des modules néccéssaires****//
const express = require('express'); // importer express
const router = express.Router(); // importer le router 
const userCtrl = require('../controllers/user.controller'); // importer le fichier user.controller du dossier controllers
const authJwt = require('../middleware/authJwt');

//logique de routing//
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:userId', userCtrl.findOne);
router.get('/', userCtrl.findAll);
router.delete('/:userId',authJwt, userCtrl.deleteOne);


//*** j'exporte mon router**// 
module.exports = router; 