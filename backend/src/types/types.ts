import { NextFunction, Request, Response } from "express";

// usercontroller types

// for new user
export interface NewUserRequestBody {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}


// for error handling
export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response <any, Record<string, any>>>


// for new product
export interface NewProductRequestBody {
    name: string;
    category: string;
    price: number;
    stock: number;
}