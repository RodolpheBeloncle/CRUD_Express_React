const connection = require('../db-config');

const findByEmail = (email) => (connection.promise().query('SELECT * FROM admins WHERE email = ?', [email]));

module.exports = {
  findByEmail,
};
