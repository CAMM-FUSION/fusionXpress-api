import express from 'express';
import { getCategories, getCategoryById, createCategory } from '../controllers/categoryController.js';

const router = express.Router();

// POST route for creating a new category
router.post('/categories', createCategory);

// GET route for getting all categories
router.get('/categories', getCategories);

// GET route for getting a category by ID
router.get('/categories/:id', getCategoryById);

export default router;