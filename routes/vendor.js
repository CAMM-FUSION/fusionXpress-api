import { Router } from "express";
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
import { getVendorProfile, loginVendor, logoutVendor, signupVendor, updateVendorProfile } from "../controllers/userController.js";

const vendorRouter = Router()

// Routes
vendorRouter.post('/vendors/signup', signupVendor);
vendorRouter.post('/vendors/login', loginVendor);
vendorRouter.get('vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getVendorProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), userAvartarUpload.single('avatar'), updateVendorProfile)

// export router
export default vendorRouter
