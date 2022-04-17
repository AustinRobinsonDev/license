const { decodeBase64 } = require('bcryptjs');
// CRUD for editing user DB entries 

const express = require('express')

const router = express.Router();

// @route   GET api/contacts
// @desc    Get the users contacts
// @acess   Private
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add contacts
// @acess   Private
router.post('/', (req, res) => {
    res.send('Add contacts');
});

// @route   PUT api/contacts/:id
// @desc    Update contacts
// @acess   Private
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contacts
// @acess   Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});


module.exports = router;