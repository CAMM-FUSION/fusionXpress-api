import { Router } from "express";
import { loginUser, signupUser, logoutUser } from "../controllers/user.js";
import { userAvartarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"

const userRouter = Router()

// Routes
userRouter.post('/users/signup', signupUser);
userRouter.post('/users/login', loginUser);
userRouter.post('users/logout', isAuthenticated, logoutUser);

// export router
export default userRouter
