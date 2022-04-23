const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
// CRUD for editing user DB entries 

const express = require('express');

const router = express.Router();

const User = require('../models/User');
const License = require('../models/License');
// @route   GET api/licenses
// @desc    Get the users licenses
// @acess   Private
router.get('/', auth, async (req, res) => {
   try {
       const licenses = await License.find({ user: req.user.id}).sort({ date: -1 });
       res.json(licenses)
   } catch (err) {
       res.status(500).send('server error');
   }
});

// @route   POST api/licenses
// @desc    Add license
// @acess   Private
router.post('/',    
[
    auth, [ check('name', 'name is required').not().isEmpty() ]
],  
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const {name, email, phone, type} = req.body;
    try {
        const newLicense = new License({
            name,
            email,
            phone, 
            type,
            user: req.user.id
        })
        //saves to db
        const license = await newLicense.save();
        // sends to client 
        res.json(license);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// @route   PUT api/licenses/:id
// @desc    Update license
// @acess   Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
    // license object
    const licenseFields = {};
    if(name) licenseFields.name = name;
    if(email) licenseFields.email = email;
    if(phone) licenseFields.phone = phone;
    if(type) licenseFields.type = type;
    try {
        let license = await License.findById(req.params.id);
        if (!license) return res.status(404).json({ msg: 'License not found'});
        if (license.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'});
        }
        license = await License.findByIdAndUpdate(req.params.id, 
            { $set: licenseFields },
            {  new: true });
            res.json(license);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route   DELETE api/license/:id
// @desc    Delete license
// @acess   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let license = await License.findById(req.params.id);
        if(!license) return res.status(404).json({ msg: 'License not found'});
        if (license.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'});
        }
        await License.findByIdAndRemove(req.params.id);
        res.json({ msg: 'License removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;