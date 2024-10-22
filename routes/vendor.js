import { Router } from "express";
import { loginVendor, signupVendor, logoutVendor, getProfile, updateProfile } from "../controllers/user.js";
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"

const vendorRouter = Router()

// Routes
vendorRouter.post('/vendors/signup', signupVendor);
vendorRouter.post('/vendors/login', loginVendor);
vendorRouter.get('vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), userAvartarUpload.single('avatar'), updateProfile)

// export router
export default vendorRouter
