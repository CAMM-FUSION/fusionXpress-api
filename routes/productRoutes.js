import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { getProducts, getProduct } from '../controllers/userProductController.js';
import { searchProducts } from '../controllers/userProductController.js';

const router = express.Router();

// Routes for managing adverts

// Private routes (Vendor only)
router.post('/products', createProduct); // Vendors Create
router.patch('/products/:id', updateProduct); // Vendors update
router.delete('/products/:id', deleteProduct); // Vendors delete
router.get()

// Public routes
router.get('/products', getProducts);
router.get('/products/search', searchProducts, getProducts); // Any user
router.get('/products/:id', getProduct); // Any user

export default router;