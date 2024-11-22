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
        req.body.hostname = req.session.user;
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
    try {
        let eventId = req.params.id;
        let event = await model.findById(eventId).populate('hostname', 'firstName lastName'); // find event by id
        if(event) {
            res.render('./event/eventDetails', { event }); // render event details view if found
        } else {
            let err = new Error('Cannot find an event with id ' + eventId);
            err.status = 404;
            next(err); // send error 404 if no event is found
        }
    } catch(err) {
        next(err); // pass any other errors to error handler middleware
    }
};

exports.edit = async (req, res, next) => {
    try {
        // Find event by id and render edit view if found
        let eventId = req.params.id;
        let event = await model.findById(eventId).populate('hostname', 'firstName lastName');
        if(event) {
            res.render('./event/edit', { event });
        } else {
            let err = new Error('Cannot find an event with id ' + eventId);
            err.status = 404;
            next(err); // Send error 404 if no event is found
        }
    } catch(err) {
        next(err); // Pass any other errors to error handler middleware
    }
};

exports.update = async (req, res, next) => {
    try {
        let eventId = req.params.id;
        let updatedData = req.body;
        // check if a new image was submitted
        if (req.file) {
            // convert the new image to Base64 and save it to event
            updatedData.image = req.file.buffer.toString('base64');
        } else if (req.body.existingImage === 'true') {
            // continue to use existing image if no new image is uploaded
            let event = await model.findById(eventId);
            if(event) {
                updatedData.image = event.image;
            } else {
                let err = new Error('Cannot find an event with id ' + eventId);
                err.status = 404;
                return next(err);
            }
        } else {
            // set image to null if no image is provided
            updatedData.image = null;
        }

        // update the event with updatedData and run validators
        updatedData.hostname = req.session.user;
        let event = await model.findByIdAndUpdate(eventId, updatedData, { new: true, runValidators: true});
        if(event) {
            res.redirect('/events/' + eventId); // redirect to event details view if update is successful
        } else {
            let err = new Error('Cannot find an event with id ' + eventId);
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
    try {
        // delete the event if found and redirect back to events list view
        let eventId = req.params.id;
        let event = await model.findByIdAndDelete(eventId);
        if(event) {
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find an event with id ' + eventId);
            err.status = 404; // send error 404 if no event is found
            next(err);
        }
    } catch(err) {
        next(err); // pass any other errors to error handler middleware
    }
};