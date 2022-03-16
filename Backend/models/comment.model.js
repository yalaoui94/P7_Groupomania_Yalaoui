//*****************************************//
//*** Import des modules néccéssaires****//
const { DataTypes } = require('sequelize');
const sequelize = require('../confing/db.config');

//*********************************//
// Définition du modèle comment //

const Comment = sequelize.define('comment', {
  messageId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  userName: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true, 
      min: 2,
    }
  },
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: false
})


//*Représentation de la table Comment: *//
// messageId > création automatique, sinon (voire la table en haut) 
// userId
// userName
// comment 

module.exports = Comment









/*module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      content: {
        type: Sequelize.STRING
      }
    });
  
    return Comment;
  };
  */

  /* la logique de la table Comment */
  // id 
  //content 
  //userId
  //articleId
  //dateAdd