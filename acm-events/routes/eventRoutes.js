// required controller and modules
const express = require('express');
const controller = require('../controllers/eventController');
const {fileUpload} = require('../middleware/fileUpload');
const {isLoggedIn, isHost} = require('../middleware/auth');
const {validateEventId} = require('../middleware/valdiator')

const router = express.Router();

// GET /events: send all events to the user
router.get('/', controller.index);

// GET /events/new: send html form for creating a new event
router.get('/newEvent', isLoggedIn, controller.newEvent);

// POST /events: create a new event
router.post('/', isLoggedIn, fileUpload, controller.create);

// GET /events/:id: send details of event identified by id
router.get('/:id', validateEventId, controller.show);

// GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', validateEventId, isLoggedIn, isHost, controller.edit);

// PUT /events/:id: update the event identified by id
router.put('/:id', validateEventId, isLoggedIn, isHost, fileUpload, controller.update);

// DELETE /events/:id, delete the event identified by id
router.delete('/:id', validateEventId, isLoggedIn, isHost, controller.delete);

module.exports = router;