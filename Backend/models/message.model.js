//*****************************************//
//*** Import des modules néccéssaires****//
const { DataTypes } = require('sequelize');



//*********************************//
// Définition du modèle message//
module.exports = (sequelize) => {


  return Message = sequelize.define('message', {
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
    
    userName: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}

//*Représentation de la table Message: *//
// id > création automatique, sinon (voire la table en haut)
// title
// content
// userId
// media (image)   

