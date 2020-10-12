const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

exports.login = async (req, res) => {
    try {
        //  Find the user by their email address
        let user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(400).send({error: true, message: 'User not found!'});
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).send({error: true, message: 'Incorrect email or password.'});
        }

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('Authorization', token).send({
            user,
            token
        });
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while login."});
    }
};

exports.signUp = async (req, res) => {
    try {
        const result = await User.findOne({email: req.body.email});

        if (result) {
            return res.status(404).send({ error: true, message: 'User already exists.'});
        }
        else {
            // Insert the new user if they do not exist yet
            user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header('Authorization', token).send({
                user,
                token
            });
        }
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while creating user."});
    }
};
  

  
