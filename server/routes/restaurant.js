const express = require('express');
const controller = require('../controllers/restaurant.controller');
const passport = require('passport');
const router = express.Router();

router.post('/', controller.createRestaurant);
router.get('/:restaurantId', passport.authenticate('jwt', {session: false}), controller.getRestaurantById);
router.get('/:restaurantId/products', passport.authenticate('jwt', {session: false}), controller.getRestaurantProducts);
router.get('/:restaurantId/orders', passport.authenticate('jwt', {session: false}), controller.getRestaurantOrders);


module.exports = router;
