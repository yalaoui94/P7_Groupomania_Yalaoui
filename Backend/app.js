const express = require('express');// c'est un framework 
const helmet = require('helmet'); // Package Helmet pour la sécurité des en-têtes
const cors = require('cors'); // importation de cors policy
const app = express(); // ce qui va permettre d'instantier le server 
const path = require('path'); // c'est le chemin des routes backend pour la communication entre backend et front// 






// Inmport des routes
const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const commentRoutes = require('./routes/comment.routes');






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
app.use(cors());// parametrage du cors policy

// Routes routeurs
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comment', commentRoutes);



// ensuite créer ma route pour les commentaires
app.use('/images', express.static(path.join(__dirname, 'images')));


// Ressource inexistante
app.all('*', (req, res) => res.status(501).send('What ????'))

module.exports = app;