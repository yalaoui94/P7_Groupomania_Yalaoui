//*****************************************//
//*** Import des modules néccéssaires****//
const { DataTypes } = require('sequelize');
const sequelize = require('../confing/db.config');

//*********************************//
// Définition du modèle message//

const Message = sequelize.define('message', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  media: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: false
})

//*Représentation de la table Message: *//
// id > création automatique, sinon (voire la table en haut)
// title 
// content 
// userId
// media (image)   

module.exports = Message