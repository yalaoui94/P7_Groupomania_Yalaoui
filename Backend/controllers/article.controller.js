
//const fs = require('fs') - multer telecharger des fichiers images//
const Article = require('../models/article.model'); //importation des articles//
// const userToken = require('../middleware/authJwt');


// Création d'un nouveau article
exports.createArticle = (req, res, next) => {
  const { title, description, user_id } = req.body
  if (!title || !description || !user_id) {
    res.status(400).send({
      message: "Veuillez vérifier le contenu des différents champs"
    });
    return
  }
  // ici il va créer mon article// 
  else {
    Article.create({
      title: req.body.title,
      description: req.body.description,
      media: ' ',
      userId: req.body.user_id,
    })
      .then(article => res.json({ message: 'Article créé', data: article }))
      .catch(err => res.status(500).json({ message: err.message || "Une erreur empêche la récupération des articles" }))
  }


}

// Retrouver tous les articles dans la BDD
exports.findAllArticle = (req, res, next) => {

  Article.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur empêche la récupération des articles"
      });
    });
};

// Retrouver un article par son id
exports.findOneArticle = (req, res, next) => {
  const id = req.params.id; // recupération de l 'id dans les parametres,  //

  Article.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
        //la fonction elle permets de retrouver la data par Id si il ya une data en va l'envoyer sinon erreur 404 //
      } else {
        res.status(404).send({
          message: `Nous ne retrouvons pas l'article avec l'id : ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problème de récupération de l'article ayant comme id : " + id
      });
    });
};

// Modifier un article 
exports.updateArticle = (req, res, next) => {
  const id = req.params.id;
  // je vais chercher la request body l id de mon article // 
  Article.update(req.body, {
    where: { id: id }
  }).then(function (id) {
    if (id) {
      res.send({
        message: "Votre article a bien été modifié !"
      });

    }
    else {
      res.status(404).send({
        message: "Impossible de modifier l'article ! "
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la modification de l'article id : " + id
      });
    });
};

// Supprimer un article
exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;
  // je vais chercher la request body l id de mon article // 
  Article.destroy({
    where: { id: id }

  })
    .then(function (id) {
      if (id) {
        res.send({
          message: "Votre article a bien été supprimé !"
        });

      }
      else {
        res.status(404).send({
          message: "Impossible de supprimer l'article ! "
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer l'article id : " + id
      });
    });
};

