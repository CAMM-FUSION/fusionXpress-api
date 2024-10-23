import { Router } from "express";
import { advertIconUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
import { getProfile, loginVendor, logoutVendor, signupVendor, updateProfile } from "../controllers/vendor.js";
// import { getProfile, loginVendor,  } from "../controllers/vendor.js";

const vendorRouter = Router()

// Routes
vendorRouter.post('/vendors/signup', signupVendor);
vendorRouter.post('/vendors/login', loginVendor);
vendorRouter.get('/vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), advertIconUpload.single('avatar') ,updateProfile)

// export router
export default vendorRouter
