const jwt = require('jsonwebtoken');

require('dotenv').config();

const checkJwt = (req, res, next) => {
  // Si il n'a pas de header Authorization
  if (!req.headers.authorization) {
    res.status(401).json();
  }

  // si l'utilisateur est bien connecté avec un JWT valide, je continue
  try {
    jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN);
    console.log(req.headers.authorization)
    return next();
  } catch (err) {
    // sinon on lui renvoi une erreur
    return res.status(401).json();
  }
};

module.exports = checkJwt;
