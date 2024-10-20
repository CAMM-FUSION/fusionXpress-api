import express from "express";
import { createAdvert, updateAdvert, deleteAdvert, } from "../controllers/advertController.js";
import { getAdverts, getAdvert } from "../controllers/userAdvertController.js";
import { searchAdverts } from "../controllers/userAdvertController.js";

const router = express.Router();

// Routes for managing adverts

// Private routes (Vendor only)
router.post("/adverts", createAdvert); // Vendors Create
router.patch("/adverts/:id", updateAdvert); // Vendors update
router.delete("/adverts/:id", deleteAdvert); // Vendors delete

// Public routes
router.get("/adverts", getAdverts); // Any user
router.get("/adverts/search", searchAdverts, getAdverts); // Any user
router.get("/adverts/:id", getAdvert); // Any user

export default router;
