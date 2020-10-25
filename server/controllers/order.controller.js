const OrderService = require('../services/order.service')

const errorHandler = require('../utils/errorHandler');

module.exports.getOrders = async function (req, res) {
    try {
        const response = await OrderService.getOrders(req.params.restaurantId);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getOrderProducts = async function (req, res) {
    try {
        const response = await OrderService.getOrderProducts(req.params.orderId);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.createOrder = async function (req, res) {
    try {
        const response = await OrderService.createOrder(req.body, req.params.restaurantId);
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}


module.exports.updateOrderStatus = async function (req, res) {
    try {
        const response = await OrderService.updateOrderStatus(req.params.orderId, req.body.status);
        res.status(202).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}
