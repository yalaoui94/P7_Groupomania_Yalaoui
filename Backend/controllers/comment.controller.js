//importation des models
const Comment = require('../models/comment.model');
const User = require('../models/user.model')

// Création d'un nouveau commentaire
exports.createComment = async (req, res, next) => {
  const { comment, user_id } = req.body
  if (!comment || !user_id) {
    res.status(400).send({
      message: "Veuillez vérifier le contenu du commentaire"
    });
    return
  }
  // ici il va créer mon commentaire// 
  else {
    // il va trouver l'utilisateur 
    await User.findOne({
      where: { id: user_id }
    }).then(async function (user) {
      //si l'utilisateur est trouvé
      if (user) {
        //il va nous créer un nouveau commentaire
        let newComment = await Comment.create({
          comment: req.body.comment,
          userId: req.body.user_id,
          messageId: req.params.messageId,
          userName: user.username
        });
        return res.status(200).json({ message: 'commentaire créé', data: newComment })
      } else {
        return res.status(500).json({ message: err.message || "Une erreur empêche la récupération des commentaires" })
      }
    }).catch(function (error) {
      return res.status(500).json({ error });
    });
  }
}



// Retrouver tous les commentaires dans la BDD
exports.findAllComment = (req, res, next) => {
  //utilisation de la méthode findAll pour trouver tous les commentaires
  Comment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur empêche la récupération des commentaires"
      });
    });
};
