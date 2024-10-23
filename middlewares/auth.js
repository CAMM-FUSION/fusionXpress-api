import { expressjwt } from "express-jwt";
import { VendorModel } from "../models/vendor.js";   // Ensure the default export if it's a single export
import { permissions } from "../utils/rbac.js";
import { UserModel } from "../models/user.js";

// Middleware to check if the user is authenticated
export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ['HS256']
  // userProperty: 'auth',
});

// Function to check if a vendor has the required permission for a specific action
// const checkPermission = (vendor, action) => {
//   const permission = permissions.find((permission) => permission.role === vendor.role);
//   return permission ? permission.actions.includes(action) : false;
// };

// Middleware to check if the vendor has permission to perform an action
export const hasPermission = (action) => {
<<<<<<< HEAD
  return async (req, res, next) => {
    try {
            // Retrieve the authenticated vendor
      const vendor = await VendorModel.findById(req.auth.id);

      // Use the user role to define the permission
      const permission = permissions.find(value => value.role === vendor.role);
      if (!permission) {
        return res.status(404).json({ message: 'No permission found!' });
      }
      // Check if the vendor has the required permission
      if (permission.actions.includes(action)) {
        return res.status(403).json('Action not allowed!');
      }
      next(); // Proceed to the next middleware/route handler if permitted
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
=======
    return async (req, res, next) => {
        try{
            // find vendor from database
            const vendor = await VendorModel.findById(req.auth.id);
            // use the vendor role to find their permission
            const permission = permissions.find((value )=> value.role === vendor.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            // check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');
            }
        } catch (error) {
            next(error);
        }
    }
}

export const userPermission = (action) => {
    return async (req, res, next) => {
        try{
            // find user from database
            const user = await UserModel.findById(req.auth.id);
            // use the vendor role to find their permission
            const permission = permissions.find((value )=> value.role === user.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            // check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');
            }
        } catch (error) {
            next(error);
        }
>>>>>>> main
    }
  };
};
