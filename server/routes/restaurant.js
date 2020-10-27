const express = require('express');
const controller = require('../controllers/restaurant.controller');
const passport = require('passport');
const router = express.Router();

router.post('/', controller.createRestaurant);
router.get('/:restaurantId', passport.authenticate('jwt', {session: false}), controller.getRestaurantById);
router.get('/:restaurantId/products', controller.getRestaurantProducts);
router.get('/:restaurantId/orders', controller.getRestaurantOrders);


module.exports = router;
