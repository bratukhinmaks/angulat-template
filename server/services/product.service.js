const ObjectId = require("mongodb").ObjectId;
const uploadMiddleware = require('../middleware/upload')

const RestaurantService = require('./restaurant.service')
const OrderService = require('./order.service')

const Restaurant = require('../models/Restaurant')
const Product = require('../models/Product')

const SomethingNotFoundError = require('../utils/errors/SomethingNotFoundError')
const DeleteNotPossibleError = require('../utils/errors/DeleteNotPossibleError')


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
        const saved = await Product(product).save();
        await Restaurant.findOneAndUpdate(
            {"_id": ObjectId(`${restaurantId}`)},
            {$push: {"products": saved}}
        );
        return saved;
    } catch (error) {
        throw Error('Error while creating a new Product.')
    }
}

module.exports.updateProduct = async function (product, fileLocation, productId, restaurantId) {
    const found = await getProductById(productId);
    if (fileLocation !== '') {
        await uploadMiddleware.deleteImageFromS3(found.imgUrl, restaurantId);
        product.imgUrl = fileLocation;
    } else {
        product.imgUrl = found.imgUrl;
    }
    try {
        await updateProduct(productId, product);
        return product;
    } catch (error) {
        throw Error('Error while updating a Product.')
    }
}


module.exports.deleteProductById = async function (restaurantId, productId) {
    const foundProduct = await getProductById(productId);
    const foundOrders = await OrderService.getOrders(restaurantId);

    let productExistCount = 0;
    foundOrders.every(function (order, index) {
        if (productExistCount !== 0) {
            return false;
        } else {
            productExistCount = order.products.filter(el => {
                return String(el['_id']) === foundProduct['id']
            }).length;
            return true;
        }
    })

    if (foundProduct.isDeleted && productExistCount === 0) {
        await removeProductFromRestaurant(foundProduct, restaurantId);
        await removeProduct(productId);
    } else {
        throw new DeleteNotPossibleError(`Error while deleting Product with id ->  ${productId}`, 409);
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
            {$pull: {products: ObjectId(`${product._id}`)}}
        );
    } catch (error) {
        throw Error('Error while removing Product id -> ' + product._id + ' from Restaurant id -> ' + restaurantId)
    }
}

async function removeProduct(productId) {
    try {
        await Product.remove({"_id": ObjectId(`${productId}`)});
    } catch (error) {
        throw Error('Error while removing Product id -> ' + productId)
    }
}

async function updateProduct(productId, product) {
    try {
        await Product.findOneAndUpdate({"_id": ObjectId(`${productId}`)}, {"$set": product});
    } catch (error) {
        throw Error('Error while updating Product id -> ' + productId)
    }
}

