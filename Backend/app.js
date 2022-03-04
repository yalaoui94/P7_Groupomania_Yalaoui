const express = require('express');// c'est un framework 
const helmet = require('helmet'); // Package Helmet pour la sécurité des en-têtes
const morgan = require('morgan'); // à supprimer après le développement
const app = express(); // ce qui va permettre d'instantier le server 
const path = require('path'); // c'est le chemin des routes backend pour la communication entre backend et front// 





// Inmport des routes
const userRoutes = require('./routes/user.routes');
const articleRoutes = require('./routes/article.routes');



// Database
const sequelize = require('./confing/db.config'); // importation de la base donnée // 


// CORS paratge des ressoures entre origines multiples, pour faciliter la communication entre le front et le backend// 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// parse requests of content-type - application/x-www-form-urlencoded recuperer les parametre dans le body de la requete//
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(helmet()); // methode de sécurité qui securise l'application contre les attaques malveillantes//  
app.use(morgan('dev'));  // à supprimer après le développement


// Routes routeurs
app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);


// ensuite créer ma route pour les commentaires
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;