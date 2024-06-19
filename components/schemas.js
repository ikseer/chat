// components/schemas.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The conversation ID
 *         name:
 *           type: string
 *           description: The name of the conversation
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of participant IDs (references User)
 *     ConversationInput:
 *       type: object
 *       required:
 *         - name
 *         - participants
 *       properties:
 *         name:
 *           type: string
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of participant IDs (references User)
 */

// Exporting schemas
module.exports = {};
