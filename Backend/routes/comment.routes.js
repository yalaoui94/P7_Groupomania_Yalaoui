//*****************************************//
//*** Import des modules néccéssaires****//
const express = require('express'); // importer express 
const router = express.Router(); // importer le router 


const authJwt = require('../middleware/authJwt');
const commentCtrl = require('../controllers/comment.controller'); 

//logique de routing//
//on utilise dans le path de notre requête l'id du message sous lequel se trouvera nos commentaires
router.post('/:messageId', authJwt, commentCtrl.createComment);
//on récupére tous les commentaires
router.get('/', authJwt, commentCtrl.findAllComment);

// j'exporte mon router//
module.exports = router; 