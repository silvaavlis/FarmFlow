const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/seed', productController.seedProducts); // Temporarily removed protection

// Protected routes (admin only)
router.post('/', protect, authorize(true), productController.createProduct);
router.put('/:id', protect, authorize(true), productController.updateProduct);
router.delete('/:id', protect, authorize(true), productController.deleteProduct);

module.exports = router; 