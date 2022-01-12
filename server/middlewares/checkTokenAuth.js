const jwt = require('jsonwebtoken');

require('dotenv').config();



/* Vérification du token */
const isAuthorized = (req, res, next) => {
  // Récupération du token
  const token = req.headers.authorization 

  // Présence d'un token
  if (!token) {
      return res.status(401).json({ message: 'Error. Need a token' })
  }

  // Véracité du token
  jwt.verify(token,  process.env.SECRET_TOKEN, (err, decodedToken) => {
    console.log("decodedtoken",decodedToken)
      if (err) {
          res.status(401).json({ message: 'Error. Bad token' })
      } else {
        console.log("decodedToken_id",decodedToken.id)
        res.locals = decodedToken.id;
        return next()
      }
  })
}

module.exports = isAuthorized;
