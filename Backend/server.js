const http = require('http'); // Importation du package de requêtes https : const http = require('http'); 
const app = require('./app'); // Importation de l'application

const normalizePort = val => { // Renvoie un port valide
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8080');  // Indication de l'environnement/du port utilisé
app.set('port', port, console.log('Serveur en écoute et en bon fonctionnement'));

const errorHandler = error => { // Recherche les différentes erreur et gestion de ces erreurs
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //const server = https.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => { // Ecouteur d'évènements
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);