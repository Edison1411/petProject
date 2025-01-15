const router = require('express').Router();
const StoreController = require('../controllers/StoreController');

// Store Routes
router.get('/store/inventory', StoreController.getInventory);
router.post('/store/order', StoreController.createOrder);
router.get('/store/order/:orderId', StoreController.getOrderById);
router.delete('/store/order/:orderId', StoreController.deleteOrder);

module.exports = router;
