
//const fs = require('fs') - multer telecharger des fichiers images//
const Message = require('../models/message.model'); //importation des messages//
const User = require('../models/user.model')
// const userToken = require('../middleware/authJwt');


// Création d'un nouveau message
exports.createMessage = async (req, res, next) => {
  const { title, description, user_id  } = req.body
  if (!title || !description || !user_id) {
      res.status(400).send({
          message: "Veuillez vérifier le contenu du message"
      });
      return
  }
  // ici il va créer mon message// 
  else {
    await User.findOne({
      where: {id: user_id}
    }).then(async function(user){
      if(user){
        let newMessage = await Message.create({
          title: req.body.title,
          description: req.body.description,
          media: ' ',
          userId: req.body.user_id,
          userName: user.username
        }); 
        return res.status(200).json({ message: 'message créé', data: newMessage })
      }else {
        return res.status(500).json({ message: err.message || "Une erreur empêche la récupération des messages" })
      }
    }).catch(function (error) {
      return res.status(500).json({ error });
    });
     
  }


}

// Retrouver tous les messages dans la BDD
exports.findAllMessage = (req, res, next) => {

  Message.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur empêche la récupération des messages"
      });
    });
};

// Retrouver un message par son id
exports.findOneMessage = (req, res, next) => {
  const id = req.params.id; // recupération de l 'id dans les parametres,  //

  Message.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
        //la fonction elle permets de retrouver la data par Id si il ya une data en va l'envoyer sinon erreur 404 //
      } else {
        res.status(404).send({
          message: `Nous ne retrouvons pas l'message avec l'id : ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problème de récupération de l'message ayant comme id : " + id
      });
    });
};

// Modifier un message 
exports.updateMessage = (req, res, next) => {
  const id = req.params.id;
  // je vais chercher la request body l id de mon message // 
  Message.update(req.body, {
    where: { id: id }
  }).then(function (id) {
    if (id) {
      res.send({
        message: "Votre message a bien été modifié !"
      });

    }
    else {
      res.status(404).send({
        message: "Impossible de modifier l'message ! "
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la modification de l'message id : " + id
      });
    });
};

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
  const id = req.params.id;
  // je vais chercher la request body l id de mon message // 
  Message.destroy({
    where: { id: id }

  })
    .then(function (id) {
      if (id) {
        res.send({
          message: "Votre message a bien été supprimé !"
        });

      }
      else {
        res.status(404).send({
          message: "Impossible de supprimer l'message ! "
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer l'message id : " + id
      });
    });
};

