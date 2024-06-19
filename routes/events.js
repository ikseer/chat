const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');

// GET all events
router.get('/', getAllEvents);

// GET an event by ID
router.get('/:id', getEventById);

// POST create a new event
router.post('/', createEvent);

// PUT update an event by ID
router.put('/:id', updateEvent);

// DELETE delete an event by ID
router.delete('/:id', deleteEvent);

module.exports = router;
