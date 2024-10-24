import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import advertRoutes from './routes/advertRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRouter from './routes/user.js';
import vendorRouter from './routes/vendor.js';
import router from './routes/advertRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(router)
app.use(categoryRoutes);
app.use(userRouter);
app.use(vendorRouter)
app.use(advertRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection error', err));

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
