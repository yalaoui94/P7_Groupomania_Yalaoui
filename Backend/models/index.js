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

// //  (un utilisateur a plusieurs messages)
// db.user.hasMany(db.message, {
//   onDelete: 'cascade',
// });
// //  (un message a plusieurs commentaires)
// db.message.hasMany(db.comment, {
//   onDelete: 'cascade',
// });

// //(un utilisateur a plusieurs commentaires)
// db.user.hasMany(db.comment, {
//   onDelete: 'cascade',
// });
// // un message  qui appartient à un utilisateur 
// db.message.belongsTo(db.user);
// //un commentaire appartient à un utilisateur 
// db.comment.belongsTo(db.user);
// //un commentaire qui appartient à un message
// db.comment.belongsTo(db.message);


// //j'exporte mon DB//
// module.exports = db;

//****************************************************** */



//foreignkey c'est une clée qui va relier deux  modeles (un utilisateur a plusieurs messages)
db.user.hasMany(db.message,{
  onDelete: 'cascade',
  hooks:true, 
  // foreignKey: {
  //   name: 'userId',
  //   allowNull: false,
  // },
  // onUpdate: 'NO ACTION',
});

db.user.hasMany(db.comment, {
    // onDelete: 'cascade',
    // hooks:true, 
    
    // onUpdate: 'NO ACTION',
  });
  db.message.hasMany(db.comment, {
    onDelete: 'cascade',
    hooks:true, 
    // foreignKey: {
    //   name: 'userId',
    //   allowNull: false,
    // },
    // onUpdate: 'NO ACTION',
  });


// un message  qui appartient à un utilisateur 
db.message.belongsTo(db.user, {
  // onDelete: 'cascade',
  // foreignKey: 'userId'
});

//un commentaire appartient à un utilisateur 
db.comment.belongsTo(db.user,{
    // onDelete: 'cascade',
    // foreignKey: 'userId',
  }
);

// //un commentaire qui appartient à un message
db.comment.belongsTo(db.message,{
  // onDelete: 'cascade',
  // foreignKey: 'messageId',
}); 

//j'exporte mon DB//
module.exports = db;


// //un commentaire appartient à un utilisateur 
// db.comment.belongsTo(db.user,{
//     onDelete: 'cascade',
//     foreignKey: 'userId',
//   }
// );
// //un commentaire qui appartient à un message
// db.comment.belongsTo(db.message,{
//   onDelete: 'cascade',
//   foreignKey: 'messageId',
// }); 

// //j'exporte mon DB//
// module.exports = db;