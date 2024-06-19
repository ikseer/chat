// models/Conversation.js

const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    name :{type:String,require:true},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Conversation', ConversationSchema);
