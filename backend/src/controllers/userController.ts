import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

// create new users
export const newUser = TryCatch(
    async (req: Request<{}, {}, NewUserRequestBody>, 
        res: Response, 
        next: NextFunction) => {
       
            const {name, email, photo, gender, _id, dob} = req.body;
            console.log(name, email, photo, gender, _id, dob);

            // find user by id
            let user = await User.findById(_id);

            if (user) {
                return res.status(200).json({
                    success: true,
                    message: `Welcome ${user.name}`
                })
            }

            // if user are not filled all details
            if (!name || !email || !photo || !gender || !_id || !dob) 
                return next(new ErrorHandler("Please filled all fields", 400))
            
            // user created
             user = await User.create({
                name, 
                email, 
                photo,
                gender, 
                _id, 
                dob: new Date(dob),
            });
            return res.status(201).json({success: true, message: `Welcome ${user.name}`});
    }
)


//  get all users
export const getAllUsers = TryCatch(
    async (req, res, next) => {
        const users = await User.find({});

        return res.status(200).json({
            success: true,
            users
        })
    }
);


//  get single user
export const getUser = TryCatch(
    async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) return next(new ErrorHandler("Invalid Id", 400))

        return res.status(200).json({
            success: true,
            user
        })
    }
);


// delete user
export const deleteUser = TryCatch(
    async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) return next(new ErrorHandler("Invalid Id", 400));

        await user.deleteOne()

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    }
);
