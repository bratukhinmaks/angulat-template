const ObjectId = require("mongodb").ObjectId;

const RestaurantService = require('../services/restaurant.service')

const Order = require('../models/Order')
const Product = require('../models/Product')
const Restaurant = require('../models/Restaurant')
const OrderStatus = require('../models/enums/OrderStatus')

const SomethingNotFoundError = require('../utils/errors/SomethingNotFoundError')

module.exports.createOrder = async function (order, restaurantId) {
    try {
        return await Order(order).save(async function (err, savedObj) {
            await Restaurant.findOneAndUpdate(
                {"_id": ObjectId(`${restaurantId}`)},
                {$push: {"orders": savedObj}}
            );
        });
    } catch (error) {
        throw Error('Error while creating a new Order.')
    }
}


module.exports.updateOrderStatus = async function (orderId, status) {
    let found;
    try {
        found = await Order.findOne({"_id": ObjectId(`${orderId}`)});
    } catch (error) {
        throw Error('Error while update a new Order.')
    }

    if (found) {
        found = await changeStatusForOrder(found, status);
        try {
            return await Order.findOneAndUpdate({_id: orderId}, {$set: found});
        } catch (error) {
            throw Error('Error while update a new Order.')
        }
    } else {
        throw new SomethingNotFoundError(`Order products not found in DB.`, 409);
    }
}


module.exports.getOrders = async function (restaurantId) {
    let found;
    try {
        found = await RestaurantService.getRestaurantById(restaurantId)
    } catch (error) {
        throw Error('Error while getting Products.')
    }

    if (found) {
        return found.orders;
    } else {
        throw new SomethingNotFoundError(`Orders not found in DB.`, 409);
    }
}

module.exports.getOrderProducts = async function (orderId) {
    let found;
    try {
        found = await Order.findOne({"_id": ObjectId(`${orderId}`)})
            .populate('products')
            .lean();
    } catch (error) {
        throw Error('Error while getting Products.')
    }

    if (found) {
        return found.products;
    } else {
        throw new SomethingNotFoundError(`Order products not found in DB.`, 409);
    }
}

async function changeStatusForOrder(order, status) {
    switch (status) {
        case OrderStatus.COMPLETED:
            order.status = OrderStatus.COMPLETED;
            break;
        case OrderStatus.CONFIRMED:
            order.status = OrderStatus.CONFIRMED;
            break;
        case OrderStatus.DECLINED:
            order.status = OrderStatus.DECLINED;
            break;
        case OrderStatus.IN_PROGRESS:
            order.status = OrderStatus.IN_PROGRESS;
            break;
    }
    return order;
}
