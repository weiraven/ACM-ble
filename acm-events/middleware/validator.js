exports.validateEventId = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event ID.');
        err.status = 400;
        return next(err);
    }
    next();
};