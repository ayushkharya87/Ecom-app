import { NextFunction, Request, Response, query } from "express";

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

// query for search
export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

// base query for search 
export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    },
    price?: {
        $lte: number;
    },
    category?: string;
}

// invalidate cache
export type InvalidateCacheProps = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
}