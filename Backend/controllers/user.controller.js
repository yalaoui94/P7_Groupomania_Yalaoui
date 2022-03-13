//*****************************************//
//*** Import des modules néccéssaires****//
const config = require('../confing/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const userToken = require('../middleware/authJwt');
const User = require('../models/user.model')

exports.signup = (req, res) => {
  console.log(req.body);
  // Enregistrement des utilisateurs dans la BDD
  User.create({

    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: 0 // is admin= 0 pour tout utilisateur, isadmin = 1 pour le modérateur (modérateur à les pleins pouvoirs) // 
  })
    .then(() => {
      res.send({ message: "L'utilisateur est bien enregistré !" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  // Se connecter
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      }


      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password // c'est User qui est dans la base donnée qui sera comparer avec celui du body//
      );

      if (!passwordIsValid) {
        return res.status(401).send({

          message: "Mot de passe invalide !"
        });
      }
      // signe notre token (payload) grâce à ça on peut déhacher le mode passe (signature du token)// 
      let token = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },

        config.secret,
        { expiresIn: '1h' }
      );

      res.status(200).json({

        accessToken: token,

      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.delete = (req, res) => {
  // Supprimer un compte utilisateur
  User.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      res.send({ message: "L'utilisateur a bien été supprimé !" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


