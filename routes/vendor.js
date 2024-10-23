import { Router } from "express";
<<<<<<< HEAD
import { loginVendor, signupVendor, logoutVendor, getProfile, updateProfile } from "../controllers/vendor.js";
// import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
import { advertIconUpload } from "../middlewares/upload.js";

=======
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
import { getVendorProfile, loginVendor, logoutVendor, signupVendor, updateVendorProfile } from "../controllers/userController.js";
>>>>>>> main

const vendorRouter = Router()

// Routes
vendorRouter.post('/vendors/signup', signupVendor);
vendorRouter.post('/vendors/login', loginVendor);
<<<<<<< HEAD
vendorRouter.get('/vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), advertIconUpload.single('avatar') ,updateProfile)
=======
vendorRouter.get('vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getVendorProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), userAvartarUpload.single('avatar'), updateVendorProfile)
>>>>>>> main

// export router
export default vendorRouter
