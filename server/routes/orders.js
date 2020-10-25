const express = require('express');
const controller = require('../controllers/order.controller')
const passport = require('passport');
const router = express.Router();

router.get('/restaurant/:restaurantId', passport.authenticate('jwt', {session: false}), controller.getOrders);
router.get('/:orderId', passport.authenticate('jwt', {session: false}), controller.getOrderProducts);
router.post('/:restaurantId', controller.createOrder);
router.patch('/:orderId', passport.authenticate('jwt', {session: false}), controller.updateOrderStatus);

module.exports = router;
