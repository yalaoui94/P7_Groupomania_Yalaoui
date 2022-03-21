//*****************************************//
//*** Import des modules néccéssaires****//
const Sequelize = require('sequelize'); // importer sequelize
const sequelize = require('../confing/db.config'); // import de DB.config
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.message = require('../models/message.model')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.comment = require('../models/comment.model.js')(sequelize, Sequelize);


//Liaison deux  modeles (un utilisateur a plusieurs messages)
db.user.hasMany(db.message, {
  onDelete: 'cascade',
  hooks: true,

});

//Liaison deux  modeles (un utilisateur a plusieurs commentaires)
db.user.hasMany(db.comment, {

});

//Liaison deux  modeles (un message a plusieurs commentaire)
db.message.hasMany(db.comment, {
  onDelete: 'cascade',
  hooks: true,

});


// un message  qui appartient à un utilisateur 
db.message.belongsTo(db.user, {

});

//un commentaire appartient à un utilisateur 
db.comment.belongsTo(db.user, {


});

//un commentaire qui appartient à un message
db.comment.belongsTo(db.message, {

});

//j'exporte mon DB//
module.exports = db;


