const express = require('express');
const controller = require('../controllers/product.controller');
const passport = require('passport');
const router = express.Router();

router.get('/restaurant/:restaurantId', controller.getAll);
router.get('/:productId', controller.getProductById);
router.post('/:restaurantId', passport.authenticate('jwt', {session: false}), controller.createProduct);
router.patch('/:productId', passport.authenticate('jwt', {session: false}), controller.updateProductById);
router.patch('/archive/:productId', passport.authenticate('jwt', {session: false}), controller.archiveProductById);
router.delete('/:restaurantId/:productId', passport.authenticate('jwt', {session: false}), controller.deleteProductById);

module.exports = router;
