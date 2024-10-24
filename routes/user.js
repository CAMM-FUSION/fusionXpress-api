import { Router } from "express";
import {  isAuthenticated, userPermission } from "../middlewares/auth.js"
import { getUserProfile, loginUser, logoutUser, signupUser, updateUserProfile } from "../controllers/userController.js";

const userRouter = Router()

// Routes
userRouter.post('/users/signup', signupUser);

userRouter.post('/users/login', loginUser);

userRouter.get('/users/me', isAuthenticated, userPermission('get_profile'), getUserProfile);

userRouter.get('/users/me',isAuthenticated, userPermission('update_profile'), updateUserProfile);

userRouter.post('users/logout', isAuthenticated, logoutUser);

// export router
export default userRouter

