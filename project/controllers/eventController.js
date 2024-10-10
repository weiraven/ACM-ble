const model = require('../models/event');
const { DateTime } = require('luxon');

exports.index = (req, res)=>{
    let allEvents = model.find();
    // filter events by category
    const meetingsAndWorkshops = allEvents.filter(event => event.category === 'Meeting' || event.category === 'Workshop');
    const techTalksAndPanels = allEvents.filter(event => event.category === 'Tech-Talk' || event.category === 'Panel');

    res.render('./event/index', {
        meetingsAndWorkshops,
        techTalksAndPanels,
        DateTime
    });
};

exports.newEvent = (req, res)=>{
    res.render('./event/newEvent');
};

exports.create = (req, res)=>{
    // res.send('Propose a new event');
    let event = {
        id: uuidv4(),
        category: req.body.category,
        title: req.body.title,
        hostname: req.body.hostname,
        topic: req.body.topic || null,
        speaker: req.body.speaker || null,
        start: DateTime.fromISO(req.body.start).toISO(),
        end: DateTime.fromISO(req.body.end).toISO(),
        location: req.body.location,
        details: req.body.details,
        image: req.file ? req.file.path : null,
        createdAt: DateTime.now().toISO()
    };
    
    model.save(event);
    res.redirect('/events');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);

    if(event){
        res.render('./event/eventDetails', { event, DateTime });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);

    if(event) {
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;

    if(model.updateById(id, event)) {
        res.redirect('/events/' + id);
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next)=>{
    // res.send('delete event with id ' + req.params.id);
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};
