const ProductService = require('../services/product.service')

const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const products = await ProductService.getProducts(req.params.restaurantId)
        res.status(200).json(products)
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getProductById = async function (req, res) {
    try {
        let response = await ProductService.getProductById(req.params.productId);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.createProduct = async function (req, res) {
    try {
        const response = await ProductService.createProduct(req.body, req.params.restaurantId);
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.updateProductById = async function (req, res) {
    try {
        const response = await ProductService.updateProduct(req.body, req.params.productId);
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.deleteProductById = async function (req, res) {
    try {
        const response = await ProductService.deleteProductById(req.params.productId);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}


