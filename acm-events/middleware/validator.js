const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateEventId = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event ID.');
        err.status = 400;
        return next(err);
    }
    next();
};

exports.validatePassword = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (!password || password.length < 8) {
        req.flash('error', 'Password must be at least 8 characters.');
        return res.redirect('/users/new');
    }
    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/users/new');
    }
    next();
};

exports.validateSignUp = [
    body('firstName', 'First name is required.').notEmpty().trim().escape(),
    body('lastName', 'Last name is required.').notEmpty().trim().escape(),
    body('email', 'A valid email address is required.').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be 8-64 characters long.').isLength({min: 8, max: 64})
];

exports.validateLogIn = [
    body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be 8-64 characters.').isLength({min: 8, max: 64})
];

exports.validateEvent = [
    body('category', 'Event category is required.')
        .notEmpty()
        .trim()
        .escape()
        .isIn(['Workshop', 'Tech-Talk', 'Meeting', 'Panel', 'Other']),
    body('title', 'Event title is required.').notEmpty().trim().escape(),
    body('start', 'A valid start time is required.')
        .isISO8601()
        .toDate()
        .isAfter(new Date().toISOString()),
    body('end', 'A valid end time is required.')
        .isISO8601()
        .toDate()
        .custom((value, { req }) => {
            if (req.body.start && value < new Date(req.body.start).getTime() + 60 * 60 * 1000) {
                throw new Error('Event end time must be at least 1 hour after the start time.');
            }
            return true;
        }),
    body('location', 'Event location is required.').notEmpty().trim().escape(),
    body('details', 'Event description must be at least 10 characters.').isLength({min: 10}).trim().escape(),
    
    //validate and sanitize optional fields

    body('image')
        .optional()
        .custom((value) => {
            const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;
            if (value && !base64Pattern.test(value)) {
                throw new Error('Image must be a valid Base64-encoded string.');
            }
            return true;
        }),
    body('topic').optional().isString()
        .isLength({ max: 100 })
        .withMessage('Topic can be a maximum of 100 characters.')
        .trim().escape(),
    body('speaker').optional().isString()
        .isLength({ max: 100 })
        .withMessage('Speaker(s) can have a maximum of 100 characters.')
        .trim().escape()
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
};