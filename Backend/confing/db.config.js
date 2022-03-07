//************************************/
//****** Importation des modules nécéssaires***//
const Sequelize = require('sequelize');


//********************/
/*connexion à la base de données*/
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  });

//*******************//
//**Synchronisation des moèles**//
sequelize.sync();



module.exports = sequelize; 