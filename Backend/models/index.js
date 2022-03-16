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

//foreignkey c'est une clée qui va relier deux  modeles (un utilisateur a plusieurs messages)
db.user.hasMany(db.message, {
  onDelete: 'cascade',
  // foreignKey: {
  //   name: 'userId',
  //   allowNull: false,
  // },
  // onUpdate: 'NO ACTION',
});


// un message  qui appartient à un utilisateur 
db.message.belongsTo(db.user, {
  onDelete: 'cascade',
  // foreignKey: 'userId'
});

//un commentaire appartient à un utilisateur 
db.comment.belongsTo(db.user,{
    onDelete: 'cascade',
    foreignKey: 'userId',
  }
);
//un commentaire qui appartient à un message
db.comment.belongsTo(db.message,{
  onDelete: 'cascade',
  foreignKey: 'messageId',
});



//j'exporte mon DB//
module.exports = db;

