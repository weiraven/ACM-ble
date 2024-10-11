// required modules
const express = require('express');
const router = express.Router();

// import controller
const mainController = require('../controllers/mainController');

// GET homepage route: send index view 
router.get('/', mainController.index);

// GET about route: send about view
router.get('/about', mainController.about);

// GET contact us route: send contact view
router.get('/contact', mainController.contact);

// POST submit a contact query
router.post('/contact', mainController.handleContactForm);

// GET thank you page route: send thankyou view
router.get('/thankyou', mainController.thankYou);

// don't forget to export
module.exports = router;