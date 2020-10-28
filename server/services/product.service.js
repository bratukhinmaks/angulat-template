const ObjectId = require("mongodb").ObjectId;
const uploadMiddleware = require('../middleware/upload')

const RestaurantService = require('./restaurant.service')
const OrderService = require('./order.service')

const Restaurant = require('../models/Restaurant')
const Product = require('../models/Product')

const SomethingNotFoundError = require('../utils/errors/SomethingNotFoundError')


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
        found = await getProductById(productId);
    } catch (error) {
        throw Error('Error while getting Product.')
    }

    if (found) {
        return found;
    } else {
        throw new SomethingNotFoundError(`Product with id -> ${productId}, not found in DB.`, 409);
    }
}

module.exports.createProduct = async function (product, fileLocation, restaurantId) {
    product.imgUrl = fileLocation;
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

module.exports.updateProduct = async function (product, fileLocation, productId, restaurantId) {
    const found = await getProductById(productId);
    if (fileLocation !== '') {
        await uploadMiddleware.deleteImageFromS3(found.imgUrl, restaurantId);
    } else {
        product.imgUrl = fileLocation;
    }
    try {
        return await updateProduct(productId, product);
    } catch (error) {
        throw Error('Error while updating a Product.')
    }
}


module.exports.deleteProductById = async function (restaurantId, productId) {
    let foundProduct;
    let foundRestaurant;
    try {
        foundProduct = await getProductById(productId);
        foundRestaurant = await OrderService.getOrders(restaurantId);
        if (foundProduct.isDeleted && foundRestaurant.orders.products.filter(el => el === foundProduct).length === 0) {
            await removeProductFromRestaurant(foundProduct, restaurantId);
            await removeProduct(productId);
        }
    } catch (error) {
        throw Error('Error while delete Product with id -> ' + productId)
    }
}


module.exports.archiveProduct = async function (product) {
  let found;
  try {
    found = await getProductById(product._id);

    found.isDeleted = !found.isDeleted;
    await updateProduct(product._id, found);
    return found;
  } catch (error) {
    throw Error('Error while archiving a Product with id -> ' + productId)
  }
}

async function getProductById(productId) {
    try {
        return await Product.findOne({"_id": ObjectId(`${productId}`)});
    } catch (error) {
        throw Error('Error while finding a Product with id -> ' + productId)
    }
}

async function removeProductFromRestaurant(product, restaurantId) {
    try {
        await Restaurant.findOneAndUpdate(
            {"_id": ObjectId(`${restaurantId}`)},
            {$pull: {"products": product}}
        );
    } catch (error) {
        throw Error('Error while removing Product id -> ' + product._id + ' from Restaurant id -> ' + restaurantId)
    }
}

async function removeProduct(productId) {
    try {
        await Restaurant.remove({"_id": ObjectId(`${productId}`)});
    } catch (error) {
        throw Error('Error while removing Product id -> ' + productId)
    }
}

async function updateProduct(productId, product) {
    try {
        return await Product.findOneAndUpdate({"_id": ObjectId(`${productId}`)}, {"$set": product});
    } catch (error) {
        throw Error('Error while updating Product id -> ' + productId)
    }
}

