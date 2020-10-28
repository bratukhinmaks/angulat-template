const Restaurant = require('../models/Restaurant')
const ObjectId = require("mongodb").ObjectId;
const UserService = require('./user.service')
const SomethingNotFoundError = require('../utils/errors/SomethingNotFoundError')

module.exports.createRestaurant = async function (body) {
    const user = await UserService.getUserByEmail(body.user.email);
    try {
        return await new Restaurant({
            title: body.title,
            users: user,
            products: [],
            orders: []
        }).save()
    } catch (error) {
        throw Error('Error while creating a new Restaurant.')
    }
}


module.exports.getRestaurantById = async function (id) {
    let found;
    try {
        found = await Restaurant.findOne({'_id': ObjectId(id)})
            .populate({
                path: 'users',
                options: {retainNullValues: true}
            })
            .populate('products')
            .populate({
                path: 'orders',
                populate: {
                    path: 'products',
                    options: {retainNullValues: true}
                }
            })
            .lean();
    } catch (error) {
        throw Error('Error while getting Restaurant by id.')
    }
    if (found) {
        return found;
    } else {
        throw new SomethingNotFoundError(`Restaurant with id -> ${id}, not found in DB.`, 409);
    }
}
