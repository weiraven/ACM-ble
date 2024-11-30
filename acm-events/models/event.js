const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
        type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Host is required']
    },
    topic: {
        type: String
    },
    speaker: {
        type: String
    },
    start: {
        type: Date, 
        required: [true, 'Event start time is required'],
        validate: {
            validator: function(value) {
                // ensure that start time is no earlier than January 1, 2024
                return value >= new Date('2024-01-01T00:00:00');
            },
            message: 'Event cannot be scheduled from before January 1, 2024'
        }
    },
    end: {
        type: Date, 
        required: [true, 'Event end time is required'],
        validate: [
            {
                validator: function(value) {
                    // ensure that start time is no earlier than January 1, 2024
                    return value >= new Date('2024-01-01T00:00:00');
                },
                message: 'Event cannot be scheduled from before January 1, 2024'
            },
            {
                validator: function(value) {
                    // check if end time is at least 1 hour after start time
                    return this.start && value >= new Date(this.start.getTime() + 60 * 60 * 1000);
                },
                message: 'Event end time must be at least 1 hour after the start time'
            }
        ]
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