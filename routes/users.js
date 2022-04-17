const express = require('express');
const User = require('../models/User');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
// @route   POST api/users
// @desc    Registers a new user
// @access  Public
router.post('/', 
[
    check('name', 'name is required').not().isEmpty(), 
    check('email', 'please include valid email').isEmail(), 
    check('password', 'Please enter a password with at least 6 characters').isLength({ min: 6})
], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const { name, email, password, } = req.body;

        try {
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: 'user already exists'});
            }
            user = User({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    }
);

module.exports = router;