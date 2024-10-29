const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const storySchema = new Schema({
//     title: {type: String, required: [true, 'Title is required']},
//     author: {type: String, required: [true, 'Author is required']},
//     content: {type: String, required: [true, 'Content is required'], 
//         minLength: [10, 'The content should be at least 10 characters']}
//     },{
//         timestamps: true
//     }
// );

const eventSchema = new Schema({
    category: {type: String, required: [true]}, // enum
    title: {type: String, required: [true, 'Event title is required']},
    hostname: {type: String, required: [false]}, // default to 'ACM'
    topic: {type: String},
    speaker: {type: String},
    start: {type: DateTime, required: [true, 'Event start time is required']},
    end: {type: DateTime, required: [true, 'Event end time is required']},
    location: {type: String, required: [true, 'Event location is required']},
    details: {type: String, required: [true, 'Event description is required']},
    image: {type: ImageData}, // check on image storage for Mongoose
    }, {
        timestamps: true
    });

// collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);


// const { DateTime } = require("luxon");
// const {v4: uuidv4} = require('uuid');

// deleted sample events array

// exports.find = () => events;
// exports.findById = function(id) {
//     return events.find(event => event.id === id);
// };

// exports.save = function(event) {
//     event.id = uuidv4();
//     event.category = event.category;
//     event.title = event.title;
//     event.hostname = event.hostname;
//     event.topic = event.topic || null;
//     event.speaker = event.speaker || null;
//     event.start = event.start;
//     event.end = event.end;
//     event.location = event.location;
//     event.details = event.details;
//     event.image = event.image || null;
//     event.createdAt = DateTime.now().toUTC().toISO(); // store the actual time at which a new event is submitted
//     // console.log('New Event:', event); // Log the new event to verify it's saved correctly
//     events.push(event);
// };

// exports.updateById = function(id, newEvent) {
//     let event = events.find(event=>event.id === id);
//     if (event) {
//         event.category = newEvent.category;
//         event.title = newEvent.title;
//         event.hostname = newEvent.hostname;
//         event.topic = newEvent.topic || null;
//         event.speaker = newEvent.speaker || null;
//         event.start = newEvent.start;
//         event.end = newEvent.end;
//         event.location = newEvent.location;
//         event.details = newEvent.details;
//         event.image = newEvent.image || event.image;
//         return true;
//     } else {
//         return false;
//     }
// };

// exports.deleteById = function(id) {
//     let index = events.findIndex(event=>event.id === id);
//     if (index !== -1) {
//         events.splice(index, 1);
//         return true;
//     } else {
//         return false;
//     }
// };