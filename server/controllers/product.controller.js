const ProductService = require('../services/product.service')
const uploadMid = require('../middleware/upload')
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
    let response;
    try {
        if (req.file) {
            response = await ProductService.createProduct(JSON.parse(req.body['data']), req.file.location, req.params.restaurantId);
        } else {
            response = await ProductService.createProduct(JSON.parse(req.body['data']), '', req.params.restaurantId);
        }
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.updateProductById = async function (req, res) {
    let response;
    try {
        if (req.file) {
            response = await ProductService.updateProduct(JSON.parse(req.body['data']), req.file.location, req.params.productId, req.params.restaurantId);
        } else {
            response = await ProductService.updateProduct(JSON.parse(req.body['data']), '', req.params.productId, req.params.restaurantId);
        }
        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.image = async function (req, res) {
    try {
        res.status(200).json(`{"message": "dupa"}`);
       await uploadMid.deleteImageFromS3(req.file.location, undefined);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.deleteProductById = async function (req, res) {
    try {
        await ProductService.deleteProductById(req.params.restaurantId, req.params.productId);
        res.status(204).json();
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.archiveProductById = async function (req, res) {
    try {
        const response = await ProductService.archiveProduct(req.body);
        res.status(202).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}


