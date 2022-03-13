//*****************************************//
//*** Import des modules néccéssaires****//
const express = require('express'); // importer express 
const router = express.Router(); // importer le router 


const authJwt = require('../middleware/authJwt');
const articleCtrl = require('../controllers/article.controller'); 
const multer = require('../middleware/multer-config'); // importer le middeleware(multer) 

//logique de routing//
router.post('/', authJwt, multer, articleCtrl.createArticle);
router.get('/', authJwt, articleCtrl.findAllArticle);
router.get('/:id', authJwt,articleCtrl.findOneArticle);
router.put('/:id', authJwt, multer,articleCtrl.updateArticle);
router.delete('/:id', authJwt,articleCtrl.deleteArticle);


// j'exporte mon router//
module.exports = router; 

