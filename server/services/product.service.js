const ObjectId = require("mongodb").ObjectId;

const RestaurantService = require('./restaurant.service')

const Restaurant = require('../models/Restaurant')
const Product = require('../models/Product')

const SomethingNotFoundError = require('../utils/errors/SomethingNotFoundError')

module.exports.createProduct = async function (product, restaurantId) {
    try {
        return await Product(product).save(async function (err, savedObj) {
            await Restaurant.findOneAndUpdate(
                {"_id": ObjectId(`${restaurantId}`)},
                {$push: {"products": savedObj}}
            );
        });
    } catch (error) {
        throw Error('Error while creating a new Product.')
    }
}

module.exports.updateProduct = async function (product, productId) {
    try {
        return await Product.findOneAndUpdate({"_id": ObjectId(`${productId}`)}, {"$set": product});
    } catch (error) {
        throw Error('Error while creating a new Product.')
    }
}

module.exports.getProducts = async function (restaurantId) {
    let found;
    try {
        found = await RestaurantService.getRestaurantById(restaurantId);
    } catch (error) {
        throw Error('Error while getting Products.')
    }

    if (found) {
        return found.products;
    } else {
        throw new SomethingNotFoundError(`Products not found in DB.`, 409);
    }
}


module.exports.getProductById = async function (productId) {
    let found;
    try {
        found = await Product.findOne({"_id": ObjectId(`${productId}`)});
    } catch (error) {
        throw Error('Error while getting Product.')
    }

    if (found) {
        return found;
    } else {
        throw new SomethingNotFoundError(`Product with id -> ${productId}, not found in DB.`, 409);
    }
}

module.exports.deleteProductById = async function (productId) {
    try {
        await Product.remove({"_id": ObjectId(`${productId}`)});
    } catch (error) {
        throw Error('Error while creating a new Product.')
    }

}

