const { default: mongoose } = require('mongoose');
const User = require('../model/user');

const userController = {
    getUsers: async (req, res) => {
        try {
            const listUser = await User.find();
            res.status(200).json(listUser);
        } catch (err) {
            res.status(500).json("Can not get list User - detail: " + err);
        }
    },
    getAUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json("Can not get a User with id - detail: " + err);
        }
    },
    addNewUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
        } catch (err) {
            res.status(500).json("Can not add new User - detail: " + err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).updateOne({ $set: req.body });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json("Update failed! - detail: " + err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successful!");
        } catch (err) {
            res.status(500).json("Delete failed! - detail: " + err);
        }
    }
}

module.exports = userController;