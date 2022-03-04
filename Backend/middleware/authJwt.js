//*****************************************//
//*** Import des modules néccéssaires****//
const jwt = require('jsonwebtoken');
const authConfig = require('../confing/auth.config');


//authentification//

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, authConfig.secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'pb token', err, user, token })
      } else {
        next()
      }
    })

  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request ')
    })
  }
}



