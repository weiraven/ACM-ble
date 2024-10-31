const model = require('../models/event');

exports.index = async (req, res, next) => {
    try {
        // retrieve all events from MongoDB 
        const allEvents = await model.find();
        
        // categorize events by type
        const meetingsAndWorkshops = allEvents.filter(event => event.category === 'Meeting' || event.category === 'Workshop');
        const techTalksAndPanels = allEvents.filter(event => event.category === 'Tech-Talk' || event.category === 'Panel');
        const miscellaneousEvents = allEvents.filter(event => event.category === 'Other');

        // render events list view with events sorted by category
        res.render('./event/index', {
            meetingsAndWorkshops,
            techTalksAndPanels,
            miscellaneousEvents
        });
    } catch(err) {
        next(err); // pass any errors to error handler middleware
    }
};

exports.newEvent = (req, res)=>{
    // render form view for submitting new events
    res.render('./event/newEvent');
};

exports.create = async (req, res, next) => {
    try {
        // create a new event with inputs from req.body and save to MongoDB
        let event = new model(req.body);        
        await event.save();
        res.redirect('/events'); // redirect to index view after successful save
    } catch(err) {
        if(err.name === 'ValidationError') {
            err.status = 400; // send error code 400 for validation errors
        }
        next(err); // pass any other errors to error handler middleware
    }
};

exports.show = async (req, res, next) => {
    let id = req.params.id;

    // check if ID format is a valid 24-bit hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    try {
        // find the event by ID in MongoDB
        let event = await model.findById(id); // find event by id
        if(event) {
            res.render('./event/eventDetails', {event}); // render event details view if found
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err); // send error 404 if no event is found
        }
    } catch(err) {
        next(err); // pass any other errors to error handler middleware
    }
};

exports.edit = async (req, res, next) => {
    let id = req.params.id;

    // check if ID format is a valid 24-bit hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    try {
        // find event by id and render edit view if found
        let event = await model.findById(id);
        if(event) {
            res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err); // send error 404 if no event is found
        }
    } catch(err) {
        next(err); // pass any other errors to error handler middleware
    }
};

exports.update = async (req, res, next) => {
    let id = req.params.id;

    // check if ID format is a valid 24-bit hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    try {
        // update the event with input from req.body and run validators
        let event = await model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true});
        if(event) {
            res.redirect('/events/' + id); // redirect to event details view if update is successful
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404; // send error 404 if no event is found
            next(err); 
        }
    } catch(err) {
        if(err.name === 'ValidationError') {
            err.status = 400; // send error code 400 for validation errors
        }
        next(err); // pass any other errors to error handler middleware
    }
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;

    // check if ID format is a valid 24-bit hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    try {
        // delete the event if found and redirect back to events list view
        let event = await model.findByIdAndDelete(id);
        if(event) {
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404; // send error 404 if no event is found
            next(err);
        }
    } catch(err) {
        next(err); // pass any other errors to error handler middleware
    }
};
