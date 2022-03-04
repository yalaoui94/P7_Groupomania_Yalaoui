//*****************************************//
//*** Import des modules néccéssaires****//
const { DataTypes } = require('sequelize');
const sequelize = require('../confing/db.config');

//*********************************//
// Définition du modèle article//

const Article = sequelize.define('article', {

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
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: false
})

//*Représentation de la table Article: *//
// id > création automatique, sinon (voire la table en haut)
// title 
// content 
// userId
// media (image)   

module.exports = Article