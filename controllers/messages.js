const Message = require('../models/Message');
const Conversation=require('../models/Conversation');
const Event = require('../models/Event');
// Get all messages in a conversation
exports.getAllMessages = async (req, res) => {
    try {
        // Implement logic to find messages based on conversation ID
        res.json([]); // Placeholder response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single message by ID in a conversation
exports.getMessageById = async (req, res) => {
    try {
        // Implement logic to find message by ID in a conversation
        res.json({}); // Placeholder response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new message in a conversation
exports.createMessage = async (req, res, next) => {

  
        const message = new Message(req.body);
        await message.save();

        const conversationId=req.body['conversation']
        const sender=req.body['sender']

    const conversation = await Conversation.findById(conversationId);
    const participants=conversation.participants;
    for (const participant of participants) {

        if (participant==sender)  continue;

        const event = new Event({
            type: "new_message",
            user: sender,
            data: {
                message: message._id
            }
        });

        await event.save();

    }


    res.status(201).json(message);

};

// Update a message by ID in a conversation
exports.updateMessage = async (req, res) => {
    try {
        // Implement logic to update message by ID in a conversation
        res.json({}); // Placeholder response
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a message by ID in a conversation
exports.deleteMessage = async (req, res) => {
    try {
        // Implement logic to delete message by ID in a conversation
        res.json({}); // Placeholder response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
