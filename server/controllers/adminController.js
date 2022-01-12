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

const adminLogin = async (req, res) => {
  // // verifier les données du formulaire
  const {error} = adminSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  // Pas d'information à traiter
  if (error) {
    return res
      .status(400)
      .json({
        message: 'Error. Please enter the correct username and password',
      });
  }

  // verifier si l'utilisateur existe
  const [[existingAdmin]] = await findByEmail(req.body.email);

  if (!existingAdmin) {
    return res.status(403).json({
      message: 'bad user or password',
    });
  }

  // si c'est le cas, on vérifie son password
  const verified = await argon2.verify(
    existingAdmin.password,
    req.body.password
  );

  if (!verified) {
    return res.status(403).json({
      message: 'bad user or password',
    });
  }

  const token = jwt.sign(
    {
      id: existingAdmin.id,
      username: existingAdmin.lastname,
    },
    PRIVATE_KEY
  );

  return res.json({ credential: token });
};

module.exports = {
  adminLogin,
};
