const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const UserService = require('./user.service')
const RestaurantService = require('./restaurant.service')
const UserNotFoundError = require('../utils/errors/UserNotFoundError');
const AuthUserError = require('../utils/errors/AuthUserError');


exports.login = async function (req) {
    const candidate = await RestaurantService.getRestaurantById(req.body.restaurantId);
    const user = candidate.users;
    if (candidate && user.email === req.body.email) {
        const passwordResult = bcrypt.compareSync(req.body.password, user.password)
        if (passwordResult) {
            const expiresIn = 600 * 600;
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, keys.jwt, {expiresIn: expiresIn});
            return {token, expiresIn};
        } else {
            throw new AuthUserError('Password incorrect. Try again.', 401)
        }
    } else {
        throw new UserNotFoundError('User not found.', 404);
    }

}

exports.register = async function (req) {
    const candidate = await UserService.getUserByEmail(req.body.email)

    if (candidate) {
        throw new AuthUserError('The same email is already exist. Please try another.', 409);
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        return await UserService.createUser(user);
    }
}

