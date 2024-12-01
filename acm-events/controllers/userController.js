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
        } else if(err.code === 11000) {
            req.flash('error', 'An account with this email address already exists.');
        } else {    
           return next(err);
        }
        return res.redirect('/users/new');
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
        if(!isUser) {
            req.flash('error', 'Password is incorrect.');
            res.redirect('/users/login');
        }

        req.session.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
        req.flash('success', 'You have sucessfully logged in.');
        res.redirect('/');
    } catch(err) {
        next(err);
    }
};

// User profile controls
exports.profile = async (req, res, next) => {
    try {
        let userId = req.session.user;

        // Fetch user and user-created events simultaneously
        let [user, events] = await Promise.all([
            User.findById(userId),
            Event.find({ hostname: userId })
        ]);
        res.render('user/profile', { user, events });
    } catch(err) {
        next(err);
    }
};

// Logout controls
exports.logout = (req, res, next) => {
    // Store flash message before session destruction 
    req.flash('success', 'You have successfully logged out.');

    // Destroy session to log user out
    req.session.destroy(err => {
        if(err) {
            return next(err);
        }
        res.redirect('/users/login');
    });
};