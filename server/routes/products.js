const express = require('express');
const controller = require('../controllers/product.controller');
const passport = require('passport');
const upload = require('../middleware/upload')
const router = express.Router();

router.get('/restaurant/:restaurantId', controller.getAll);
router.get('/:productId', controller.getProductById);
router.post('/:restaurantId', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createProduct);
// router.post('/image/image', upload.single('image'), controller.image);
router.patch('/:restaurantId/:productId', passport.authenticate('jwt', {session: false}), upload.single('image'),  controller.updateProductById);
router.patch('/archive', passport.authenticate('jwt', {session: false}), controller.archiveProductById);
router.delete('/:restaurantId/:productId', passport.authenticate('jwt', {session: false}), controller.deleteProductById);

module.exports = router;
