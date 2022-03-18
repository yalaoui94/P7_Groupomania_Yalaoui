//*****************************************//
//*** Import des modules néccéssaires****//
const config = require('../confing/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

exports.signup = (req, res) => {
  console.log(req.body);
  // Enregistrement des utilisateurs dans la BDD
  db.user.create({
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
  db.user.findOne({
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
        userId: user.id,
        isAdmin: user.isAdmin,

      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res, next) => {
  //on recherche le userId dans les paramètres de notre requête
  const userId = req.params.userId

  //on utilise la méthode findOne pour avoir les infos d'un utilisateur 
  //en excluant le mot de passe pour plus de sécurité.
  db.user.findOne({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { id: userId }
  })
    .then(user => { res.status(201).json(user) })
    .catch(error => res.status(404).json({ error }))
}

exports.findAll = (req, res, next) => {
  //on utilise la méthode findAll pour avoir tous les utilisateurs en excluant l'email et le mdp
  db.user.findAll({attributes: { exclude: ['email','password'] }})
  .then(data => {res.send(data);})
  .catch(error => res.status(404).json({ error }))
}


exports.deleteOne = async (req, res) => {
  try {
    //on split l'authorisation dans les header pour seulement avoir le token
    const token = req.headers.authorization.split(' ')[1];
    // instantiation des valeurs userId et isAdmin
    let userId;
    let isAdmin;
      try{
        //on vérifie que notre token est bon
        let jwtToken = jwt.verify(token, config.secret)
        if(jwtToken != null) // si notre valeur JWT est non nulle

        //on récupére l'id dans la valeur JWT pour la mettre dans userID
        userId = jwtToken.id; 
        //on récupére isAdmin dans la valeur JWT pour la mettre dans isAdmin
        isAdmin = jwtToken.isAdmin

        //on va rechercher notre user grâce aux informations contenu dans les paramètres de la requête
        const user = await db.user.findOne({ where: { id: req.params.userId } })

        //si le userId du token est le même que le user précédemment trouvé ou que c'est l'admin
        if (userId == user.id || isAdmin == 1) {
          // alors il pourra supprimer l'utilisateur
          db.user.destroy({
            where: { id: req.params.userId }
          })
          return res.json({ message: 'Utilisateur supprimé' })

        } else {
          res.status(404).json({ 'error': 'Problème authentification' });
        }
      } catch(err) {
        res.json({err: err})
       }
    
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request ')
    })
  }
}


