// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { VendorModel } from "../models/vendor.js";
import { permissions } from "../utils/rbac.js";
import { UserModel } from "../models/user.js";


export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256'] 
});

export const hasPermission = (action) => {
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