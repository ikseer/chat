const Joi = require('joi');
const mongoose = require('mongoose');

const updateConversationSchema = Joi.object({
  name: Joi.string(),
  participants: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('"participants" must be an array of valid ObjectIds');
    }
    return value;
  })),
}).or('name', 'participants'); // Ensure at least one of these fields is present

const validateUpdateConversation = (req, res, next) => {
  const { error } = updateConversationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateUpdateConversation;
