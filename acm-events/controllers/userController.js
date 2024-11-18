const User = require('../models/user');
const Event = require('../models/event');

// Render new user sign-up page
exports.showSignUp = (req, res) => {
    res.render('user/new');
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        let user = new User(req.body);
        await user.save();
        req.flash('success', 'New account created successfully!');
        res.redirect('/users/login');
    } catch(err) {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'An account with this email address already exists.');
            return res.redirect('/users/new');
        }

        next(err);
    }
};

// Render login page
exports.showLogin = (req, res) => {
    res.render('user/login');
};

// User login controls
exports.loginUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({ email: email });

        if(!user) {
            req.flash('error', 'Email address does not exist.');
            return res.redirect('/users/login');
        }

        let isUser = await user.comparePassword(password);

        if(isUser) {
            req.session.user = user._id;
            req.flash('success', 'You have sucessfully logged in.');
            res.redirect('/users/profile');
        } else {
            req.flash('error', 'Password is incorrect.');
            res.redirect('/users/login');
        }
    } catch(err) {
        next(err);
    }
};

// User profile controls
exports.profile = async (req, res, next) => {
    try {
        let userId = req.session.user;
        if (!userId) {
            req.flash('error', 'Please log in to view your profile.');
            return res.redirect('/users/login');
        }

        // fetch user and user-created events simultaneously
        let [user, events] = await Promise.all([
            User.findById(userId),
            Event.find({ host: userId }) // remember to refactor Event model to hold user ID in 'host' field
        ]);
        res.render('user/profile', { user, events });
    } catch(err) {
        next(err);
    }
};

// Logout controls
exports.logout = (req, res, next) => {
    // check for active session
    if (!req.session.user) {
        req.flash('error', 'No user is currently logged in.');
        return res.redirect('/users/login');
    }
    
    // destroy session and handle log out
    req.session.destroy(err => {
        if(err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged out.');
        res.redirect('/users/login');
    });
};