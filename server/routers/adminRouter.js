const router = require('express').Router();

const adminController = require('../controllers/adminController');

// admin authentification routes
router.post('/login', adminController.adminLogin);

module.exports = router;
