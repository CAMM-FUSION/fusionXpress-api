import { expressjwt } from "express-jwt";
import { VendorModel } from "../models/vendor.js";   // Ensure the default export if it's a single export
import { permissions } from "../utils/rbac.js";
import { UserModel } from "../models/user.js";

// Middleware to check if the user is authenticated
export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ['HS256']
});


export const hasPermission = (action) => {
  return async (req, res, next) => {
    try {
      // Retrieve the authenticated vendor
      const vendor = await VendorModel.findById(req.auth.id);

      // Check if vendor exists first
      if (!vendor) {
        return res.status(404).json({ 
          message: 'Vendor not found' 
        });
      }

      // Check if vendor has a role
      if (!vendor.role) {
        return res.status(400).json({ 
          message: 'Vendor role not defined' 
        });
      }

      console.log('Generated token for vendor:', {
        id: vendor.id,
        role: vendor.role
      })

      // Use the vendor role to define the permission
      const permission = permissions.find(value => value.role === vendor.role);
      if (!permission) {
        return res.status(404).json({ 
          message: `No permissions found for role: ${vendor.role}` 
        });
      }

      // Check if the vendor has the required permission
      if (!permission.actions.includes(action)) {
        return res.status(403).json({ 
          message: `Action '${action}' not allowed for role '${vendor.role}'` 
        });
      }
      
      // If all checks pass, proceed
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({ 
        message: 'Error checking permissions',
        error: error.message 
      });
    }
  };
};


// permission for user
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
    }
}
