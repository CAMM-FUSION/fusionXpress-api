import express from 'express';
import { createAdvert, updateAdvert, deleteAdvert, getAdvertsByCategory, searchAdverts, getAdverts, getAdvert, countAdverts } from '../controllers/advertController.js';

const router = express.Router();

// Route to get adverts by category
router.get('/adverts/category/:category', getAdvertsByCategory);

// Private routes (Vendor only)
router.post('/adverts', isAuthenticated, createAdvert); // Vendors Create
router.patch('/adverts/:id', isAuthenticated, updateAdvert); // Vendors update
router.delete('/adverts/:id', isAuthenticated, deleteAdvert); // Vendors delete

// Public routes
router.get('/adverts', getAdverts);
router.get('/adverts/count', countAdverts);
router.get('/adverts/search', searchAdverts, getAdverts); // Any user
router.get('/adverts/:id', getAdvert); // Any user

export default router;