const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const express = require('express');

const router = express.Router();

const User = require('../models/User');
const License = require('../models/License');
// GET api/licenses, Get the users licenses, Private
router.get('/', auth, async (req, res) => {
   try {
       const licenses = await License.find({ user: req.user.id}).sort({ date: -1 });
       res.json(licenses)
   } catch (err) {
       console.error(err.message);
       res.status(500).send('server error');
   }
});

// POST api/licenses, Add license, Private
router.post('/',    
[
    auth, [ check('title', 'title is required').not().isEmpty() ]
],  
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { title, image, orderId, remainingBalance, hasDocuments, dateCreated, contactFirstName, contactLastName, emailPrimary, phonePrimary, type } = req.body;
    try {
        let imgData = new Buffer.from(image.split(",")[1],"base64")
        const newLicense = new License({
            title,
            orderId: Date.now(),
            remainingBalance: '150',
            hasDocuments, 
            dateCreated: Date.now(),
            contactFirstName,
            contactLastName,
            image:imgData,
            emailPrimary,
            phonePrimary,
            type,
            user: req.user.id
        })

        const license = await newLicense.save();
        res.json(license);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// PUT api/licenses/:id, Update license, Private
router.put('/:id', auth, async (req, res) => {
    const {title, image, orderId, remainingBalance, hasDocuments, dateCreated, contactFirstName, contactLastName, emailPrimary, phonePrimary, type} = req.body;

    const licenseFields = {};
    if(title) licenseFields.title = title;
    if(orderId) licenseFields.orderId = orderId;
    if(remainingBalance) licenseFields.remainingBalance = remainingBalance;
    if(hasDocuments) licenseFields.hasDocuments = hasDocuments;
    if(dateCreated) licenseFields.dateCreated = dateCreated;
    if(contactFirstName) licenseFields.contactFirstName = contactFirstName;
    if(contactLastName) licenseFields.contactLastName = contactLastName;
    if(emailPrimary) licenseFields.emailPrimary = emailPrimary;
    if(phonePrimary) licenseFields.phonePrimary = phonePrimary;
    if(image) licenseFields.image = image;
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

// DELETE api/license/, Delete license, Private
router.delete('/', auth, async (req, res) => {
    try {
        if (id.isArray()) {
            for (let i = 0; i < id.length; i++) {
                let license = await License.findById(req.params.id);
                if(!license) return res.status(404).json({ msg: 'License not found' });
                if (license.user.toString() !== req.user.id) {
                    return res.status(401).json({ msg: 'Not authorized' });
                }

                await License.deleteMany({ _id : { $in: id }})
            }
        } else {
            let license = await License.findById(req.params.id);
            if(!license) return res.status(404).json({ msg: 'License not found' });
            if (license.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            await License.findByIdAndRemove(req.params.id);
            res.json({ msg: 'License removed' });
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;