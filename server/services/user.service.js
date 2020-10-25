const User = require('../models/User');

exports.getUserByEmail = async function (email) {
    try {
        return await User.findOne({email: email});
    } catch (e) {
        throw Error('Error while Searching User by email.')
    }
}

exports.createUser = async function (user) {
    try {
        return await user.save();
    } catch (error) {
        throw Error('Error while saving a new User to Database.')
    }
}
