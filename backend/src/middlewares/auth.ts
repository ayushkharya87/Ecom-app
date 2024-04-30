import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";


//  middleware for admin is allowed
export const AdminOnly = TryCatch(
    async (req, res, next) => {
        const {id} = req.query;
        // if user was not login
        if (!id) return next(new ErrorHandler("Please Login!", 401));
        // find user and if id was wrong
        const user = await User.findById(id);
        if (!user) return next(new ErrorHandler("User Id was not Exist!", 401));
        // if user was not a admin
        if (user.role !== "admin") 
            return next(new ErrorHandler("You are not a Admin!", 401));

        next();
    }
)