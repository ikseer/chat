// routes/messages.js
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages.
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Retrieve all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Retrieve a single message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to retrieve
 *     responses:
 *       200:
 *         description: A single message object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageInput'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Message not found
 */

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Message not found
 */
const express = require('express');
const { validateMessage } = require('../validators/messageValidation');

const router = express.Router();
const {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
} = require('../controllers/messages');

// GET all messages
router.get('/', getAllMessages);

// GET a message by ID
router.get('/:id', getMessageById);

// POST create a new message
router.post('/',validateMessage, createMessage);

// PUT update a message by ID
router.put('/:id',validateMessage, updateMessage);

// DELETE delete a message by ID
router.delete('/:id', deleteMessage);

module.exports = router;
