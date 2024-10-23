import { Router } from "express";
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated, userPermission } from "../middlewares/auth.js"
import { getUserProfile, loginUser, logoutUser, signupUser } from "../controllers/userController.js";

const userRouter = Router()

// Routes
userRouter.post('/users/signup', signupUser);
userRouter.post('/users/login', loginUser);
userRouter.get('/users/me', isAuthenticated, userPermission('get_profile'), getUserProfile)
userRouter.post('users/logout', isAuthenticated, logoutUser);

// export router
export default userRouter

