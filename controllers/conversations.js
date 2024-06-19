const Conversation = require('../models/Conversation');

// Get all conversations
exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single conversation by ID
exports.getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.json(conversation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new conversation

exports.createConversation = async (req, res) => {
  try {
    const { name, participants } = req.body;
    const newConversation = await Conversation.create({ name, participants });

    res.status(201).json(newConversation);
  } catch (err) {
    console.error('Error creating conversation:', err);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};


// Update a conversation by ID
exports.updateConversation = async (req, res) => {
 try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedConversation = await Conversation.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedConversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.status(200).json(updatedConversation);
  } catch (err) {
    console.error('Error updating conversation:', err);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
};

// Delete a conversation by ID
exports.deleteConversation = async (req, res) => {
    try {
        const deletedConversation = await Conversation.findByIdAndDelete(req.params.id);
        if (!deletedConversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(204).json({ message: 'Conversation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
