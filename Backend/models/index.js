//*****************************************//
//*** Import des modules néccéssaires****//
const Sequelize = require('sequelize'); // importer sequelize
const sequelize = require('../confing/db.config'); // import de DB.config
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.article = require('../models/article.model')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize);

//foreignkey c'est une clée qui va relier deux  modeles (un utilisateur a plusieurs articles)
db.user.hasMany(db.article, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

// un article  qui appartient à un utilisateur 
db.article.belongsTo(db.user, {
  foreignKey: 'userId'
});



//j'exporte mon DB//
module.exports = db;

