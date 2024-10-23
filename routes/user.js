import { Router } from "express";
<<<<<<< HEAD
import { loginUser, signupUser, logoutUser } from "../controllers/user.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
=======
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated, userPermission } from "../middlewares/auth.js"
import { getUserProfile, loginUser, logoutUser, signupUser } from "../controllers/userController.js";
>>>>>>> main

const userRouter = Router()

// Routes
userRouter.post('/users/signup', signupUser);
userRouter.post('/users/login', loginUser);
userRouter.get('/users/me', isAuthenticated, userPermission('get_profile'), getUserProfile)
userRouter.post('users/logout', isAuthenticated, logoutUser);

// export router
export default userRouter

