const Event = require('../models/event');

// Check if user is a guest
exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    req.flash('error', 'You are already logged in.');
    return res.redirect('/users/profile');
};

// Check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return next();
    } 
    req.flash('error', 'You must log in first.');
    return res.redirect('/users/login');
};

// Check if user is host of event
exports.isHost = async (req, res, next) => {
    try {
        let id = req.params.id;
        let event = await Event.findById(id);

        if(!event) {
            let err = new Error('Cannot find event with ID: ' + id);
            err.status = 404;
            return next(err);
        }

        if (event.hostname.toString() === req.session.user._id.toString()) {
            return next();
        } else {
            let err = new Error('You are not authorized to access this resource.');
            err.status = 401;
            return next(err);
        }

    } catch(err) {
        return next(err);
    }
};