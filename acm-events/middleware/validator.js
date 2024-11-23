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