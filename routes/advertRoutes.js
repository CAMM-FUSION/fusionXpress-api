import express from 'express';
import { getAdvert, getAdverts, createAdvert, updateAdvert, deleteAdvert } from '../controllers/advertController.js';

const router = express.Router();

// Routes for managing adverts

// Private routes (Vendor only)
router.post('/adverts', createAdvert); // Vendors Create
router.patch('/adverts/:id', updateAdvert); // Vendors update
router.delete('/adverts/:id', deleteAdvert); // Vendors delete

// Public routes
router.get('/adverts', getAdverts); // Any user
router.get('/adverts/:id', getAdvert); // Any user

export default router;