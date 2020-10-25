const AuthService = require('../services/auth.service')
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    try {
        const response = await AuthService.login(req)
        res.status(200).json({token: `Bearer ${response.token}`, expiresIn: response.expiresIn})
    } catch (error) {
        errorHandler(res, error)
    }
};

module.exports.register = async function (req, res) {
    try {
        const response = await AuthService.register(req)
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error)
    }
};
