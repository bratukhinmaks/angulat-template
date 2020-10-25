const errorHandler = require('../utils/errorHandler');
const RestaurantService = require('../services/restaurant.service')

module.exports.createRestaurant = async function (req, res) {
    try {
        const response = await RestaurantService.createRestaurant(req.body);
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getRestaurantById = async function (req, res) {
    try {
        const response = await RestaurantService.getRestaurantById(req.params.restaurantId)
        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getRestaurantProducts = async function (req, res) {
    try {
        const response = await RestaurantService.getRestaurantById(req.params.restaurantId)
        res.status(200).json(response.products);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getRestaurantOrders = async function (req, res) {
    try {
        const response = await RestaurantService.getRestaurantById(req.params.restaurantId)
        res.status(200).json(response.orders);
    } catch (error) {
        errorHandler(res, error);
    }
}

