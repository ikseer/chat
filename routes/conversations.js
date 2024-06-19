/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: API endpoints for managing conversations.
 */

/**
 * @swagger
 * definitions:
 *   Conversation:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The conversation ID
 *       name:
 *         type: string
 *         description: The name of the conversation
 *       participants:
 *         type: array
 *         items:
 *           type: string
 *           description: The IDs of participants (refers to User)
 *
 *   ConversationInput:
 *     type: object
 *     required:
 *       - name
 *       - participants
 *     properties:
 *       name:
 *         type: string
 *       participants:
 *         type: array
 *         items:
 *           type: string
 *           description: The IDs of participants (refers to User)
 */

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Retrieve all conversations
 *     tags: [Conversations]
 *     responses:
 *       200:
 *         description: A list of conversations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Conversation'
 */

/**
 * @swagger
 * /conversations/{id}:
 *   get:
 *     summary: Retrieve a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to retrieve
 *     responses:
 *       200:
 *         description: A single conversation object
 *         schema:
 *           $ref: '#/definitions/Conversation'
 *       404:
 *         description: Conversation not found
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ConversationInput'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Conversation'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /conversations/{id}:
 *   put:
 *     summary: Update a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ConversationInput'
 *     responses:
 *       200:
 *         description: Updated
 *         schema:
 *           $ref: '#/definitions/Conversation'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Conversation not found
 */

/**
 * @swagger
 * /conversations/{id}:
 *   delete:
 *     summary: Delete a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to delete
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Conversation not found
 */


const express = require('express');
const validateConversation = require('../validators/conversationValidator');
const validateUpdateConversation = require('../validators/updateConversationValidator');

const router = express.Router();
const {
    getAllConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation,
} = require('../controllers/conversations');

router.get('/', getAllConversations);
router.get('/:id', getConversationById);
router.post('/', validateConversation,createConversation);
router.put('/:id', validateUpdateConversation,updateConversation);
router.delete('/:id', deleteConversation);

module.exports = router;
