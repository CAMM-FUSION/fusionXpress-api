import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/advertController.js';
import { getProducts, getProduct } from '../controllers/userAdvertController.js';

const router = express.Router();

// Routes for managing adverts

// Private routes (Vendor only)
router.post('/products', createProduct); // Vendors Create
router.patch('/products/:id', updateProduct); // Vendors update
router.delete('/products/:id', deleteProduct); // Vendors delete

// Public routes
router.get('/products', getProducts); // Any user
router.get('/products/:id', getProduct); // Any user

export default router;