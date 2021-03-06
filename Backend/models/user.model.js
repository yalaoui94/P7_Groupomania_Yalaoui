//*****************************************//
//*** Import des modules néccéssaires****//
const { DataTypes } = require('sequelize');



//*********************************//
// Définition de la logique table User // 
module.exports = (sequelize) => {
  return User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce nom est déjà pris.'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Cette adresse mail est déjà utilisée.'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })

}


  // Représentation des éléments de la table user //
  // id, username, password, isAdmin-role // 


