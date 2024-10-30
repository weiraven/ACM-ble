const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {
        type: String,
        enum: ['Workshop', 'Tech-Talk', 'Meeting', 'Panel', 'Other'],
        required: [true, 'Event category is required']
    }, 
    title: {
        type: String, 
        required: [true, 'Event title is required']
    },
    hostname: {
        type: String, 
        default: 'ACM'
    },
    topic: {
        type: String
    },
    speaker: {
        type: String
    },
    start: {
        type: Date, 
        required: [true, 'Event start time is required']
    },
    end: {
        type: Date, 
        required: [true, 'Event end time is required']
    },
    location: {
        type: String, 
        required: [true, 'Event location is required']
    },
    details: {
        type: String, 
        required: [true, 'Event description is required']
    },
    image: {
        type: String, // stores uploaded image as a Base64 string
        default: null
    },
    }, {
        timestamps: true
    });

// collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);