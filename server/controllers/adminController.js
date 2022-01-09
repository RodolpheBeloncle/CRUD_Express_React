const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { findByEmail } = require('../models/adminModel');
const argon2 = require('argon2');

require('dotenv').config();

const adminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().presence('required'),
});

const PRIVATE_KEY = process.env.SECRET_TOKEN;

const generateJwt = (email) =>
  jwt.sign(
    {
      email,
    },
    PRIVATE_KEY
  );

const adminLogin = async (req, res) => {
  // verifier les données du formulaire
  const { value, error } = adminSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  // verifier si l'utilisateur existe
  const [[existingAdmin]] = await findByEmail(value.email);

  if (!existingAdmin) {
    return res.status(403).json({
      message: 'bad user or password',
    });
  }

  // si c'est le cas, on vérifie son password
  const verified = await argon2.verify(existingAdmin.password, value.password);

  if (!verified) {
    return res.status(403).json({
      message: 'bad user or password',
    });
  }

  // si son password est bon, on lui donne un JWT
  const jwtKey = generateJwt(value.email);

  return res.json({
    credential: jwtKey,
  });
};

module.exports = {
  adminLogin,
};
