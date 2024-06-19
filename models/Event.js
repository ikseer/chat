// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    // participants: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'User',
    //     required: true,
    // },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
