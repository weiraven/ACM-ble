// required controller and modules
const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middleware/auth');

const router = express.Router();

// GET /users/new: send form for creating a new user
router.get('/new', isGuest, controller.showSignUp);

// POST /users: create a new user account
router.post('/', isGuest, controller.createUser);

// GET /users/login: send view for logging in
router.get('/login', isGuest, controller.showLogin);

// POST /users/login: authenticate user login
router.post('/login', isGuest, controller.loginUser);

// GET /users/profile: send user profile page
router.get('/profile', isLoggedIn, controller.profile);

// POST /users/logout: log user out
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;