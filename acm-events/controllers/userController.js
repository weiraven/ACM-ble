const User = require('../models/user');

// New user controls
exports.showSignUp = (req, res) => {
    res.render('user/new');
};

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

// Login controls
exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.loginUser = async (req, res, next) => {
    try {

        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email: email});

        if(user) {

            let result = await user.comparePassword(password);

            try {
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in.');
                    res.redirect('/users/profile');

                } else {
                    req.flash('error', 'Password is incorrect.');
                    res.redirect('/users/login');
                }

            } catch(err) {
                next(err);
            }

        } else {
            req.flash('error', 'Email address does not exist.');
            res.redirect('/users/login');
        }

    } catch(err) {
        next(err);
    }
};

// Profile controls
exports.profile = async (req, res, next) => {
    let id = req.session.user;

    if(!id) {
        return res.render('user/profile', {user: null});
    }

    let user = await User.findById(id);

    try {
        res.render('user/profile', {user});
    } catch(err) {
        next(err);
    }
};

// Logout controls
exports.logout = async (req, res, next) => {
    // check if session exists
    if(!req.session.user) {
        req.flash('error', 'No user is currently logged in.');
        return res.redirect('/users/login'); // redirect to display flash
    }

    req.session.destroy(err => {
        if(err) {
            return next(err);
        } else {
            res.redirect('/users/login');
        }
    });
};