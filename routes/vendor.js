import { Router } from "express";
import { loginVendor, signupVendor, logoutVendor, getProfile, updateProfile } from "../controllers/vendor.js";
// import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
import { advertIconUpload } from "../middlewares/upload.js";


const vendorRouter = Router()

// Routes
vendorRouter.post('/vendors/signup', signupVendor);
vendorRouter.post('/vendors/login', loginVendor);
vendorRouter.get('/vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), advertIconUpload.single('avatar') ,updateProfile)

// export router
export default vendorRouter
