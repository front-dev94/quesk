const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');

// Create and save a user
exports.create = async (req, res) => {
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
            res.send(user);
        }
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while creating user."});
    }
};

// Retrieving  all users
exports.getAllUsers = async (req, res) => {
    try {
        const result = await User.find();

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while retrieving users."});
    }
};

// Find a user by userId
exports.getSpecificUser = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);

        if (!result)
            return res.status(404).send({ error: true, message: 'User not found.'});

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while retrieving user."});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'User not found.',
            });
        }

        await User.update({ _id: req.params.id }, req.body);

        const result = await User.findById(req.params.id);

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while updating user."});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);

        if (!result)
            return res.status(404).send({ error: true, message: 'User not found.'});
        
        await User.findByIdAndDelete(result.id);
        res.status(200).send({error: false, message: "User has been successfuly deleted!"});
        
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while deleting user."});
    }
};