//*****************************************//
//*** Import des modules néccéssaires****//
const express = require('express'); // importer express 
const router = express.Router(); // importer le router 


const authJwt = require('../middleware/authJwt');
const messageCtrl = require('../controllers/message.controller'); 
const multer = require('../middleware/multer-config'); // importer le middeleware(multer) 

//logique de routing//
router.post('/', authJwt, multer, messageCtrl.createMessage);
router.get('/', authJwt, messageCtrl.findAllMessage);
router.get('/:id', authJwt,messageCtrl.findOneMessage);
router.put('/:id', authJwt, multer,messageCtrl.updateMessage);
router.delete('/:id', authJwt,messageCtrl.deleteMessage);


// j'exporte mon router//
module.exports = router; 

