import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { json } from "stream/consumers";
import { invalidateCache } from "../utils/features.js";


// get latest product -- using cache
export const getLatestProducts = TryCatch(
    async ( req, res, next) => {

        // check if the data is in memory so pass data from memory 
        let products;

        if (myCache.has("latest-products")) {
             products = JSON.parse(myCache.get("latest-products") as string);
        } else {
            // find latest product
             products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
            // save the data on memory
            myCache.set("latest-products", JSON.stringify(products));
        }



        return res.status(200).json({
            success: true,
            products
        });
    }
);


// get categories -- using cache
export const getAllCategories = TryCatch(
    async ( req, res, next) => {

         // check if the data is in memory so pass data from memory 
         let categories;

         if (myCache.has("categories")) {
            categories = JSON.parse(myCache.get("categories") as string);
         } else {
              categories = await Product.distinct("category");
             // save the data on memory
            myCache.set("categories", JSON.stringify(categories));
         }


        return res.status(200).json({
            success: true,
            categories
        });
    }
);


// get Admin product -- using cache
export const getAdminProducts = TryCatch(
    async ( req, res, next) => {

        // check if the data is in memory so pass data from memory 
        let products;

        if (myCache.has("all-products")) {
           products = JSON.parse(myCache.get("all-products") as string);
        } else{
            // find products from database
            products = await Product.find({});
             // save the data on memory
             myCache.set("all-products", JSON.stringify(products));
        }


        return res.status(200).json({
            success: true,
            products
        });
    }
);


// get single product -- using cache
export const getSingleProduct = TryCatch(
    async ( req, res, next) => {

         // check if the data is in memory so pass data from memory 
         let product;
         const id = req.params.id

         if (myCache.has(`product-${id}`)) {
            product = JSON.parse(myCache.get(`product-${id}`) as string);
         } else {
            //  find product by id
              product = await Product.findById(id);
             // if product does not exist
             if (!product) {
                 return next(new ErrorHandler("Invalid Product Id", 404));
             }
              // save the data on memory
              myCache.set(`product-${id}`, JSON.stringify(product));
         }


        return res.status(200).json({
            success: true,
            product
        });
    }
);


// create new product
export const newProduct = TryCatch(
    async ( req: Request<{}, {}, NewProductRequestBody>, res, next) => {
        const {name, price, stock, category} = req.body;
        const photo = req.file;

        // if photo are not added
        if (!photo) return next(new ErrorHandler("Please add Photo", 400));

        // if product details are not added
        if (!name || !price || !stock || !category) {
            // deleted photo 
            rm(photo.path, () => {
                console.log("deleted!");
            })
            return next(new ErrorHandler("Please enter all details", 400));
        }

        await Product.create({
            name, 
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo?.path
        });

        // invalidate cache
        await invalidateCache({ product: true });

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully"
        });
    }
);


// update product
export const updateProduct = TryCatch(
    async (req, res, next) => {

        // get id
        const {id} = req.params;
        // extract all details of product
        const {name, price, stock, category} = req.body;
        const photo = req.file;
        // find product
        const product = await Product.findById(id)
        // if product does not exist
        if (!product) {
            return next(new ErrorHandler("Invalid Product Id", 404));
        }

        // if photo are exist
        if (photo) {
            // remove old photo 
            rm(product.photo, () => {
                console.log("Old photo deleted!");
            })
            // add new photo
            product.photo = photo.path;
        }

        // if details are exist change the name
        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (category) product.category = category;

        // save the product 
        await product.save();

        // invalidate cache
        await invalidateCache({ product: true });

        return res.status(200).json({
            success: true,
            message: "Product Update Successfully"
        });
    }
);


// delete product
export const deleteProduct = TryCatch(
    async ( req, res, next) => {
        const id = req.params.id
        const product = await Product.findById(id)

        // if product does not exist
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        // delete photo
        rm(product.photo, () => {
            console.log("Product Photo Deleted");
        });

        await Product.deleteOne();

        // invalidate cache
        await invalidateCache({ product: true });

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    }
);


// search products
export const searchProducts = TryCatch(
    async ( req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
         
        const {search, sort, category, price} = req.query;

        const page = Number(req.query.page) || 1;

        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;
        
        // query for search products
        const baseQuery: BaseQuery = {};

        // for search by name
        if (search) {
            baseQuery.name = {
                $regex: search,
                $options: "i",
            }
        }
        // base query for price
        if (price) {
            baseQuery.price = {
                $lte: Number(price)
            }
        }

        // base query category
        if ( category) {
            baseQuery.category = category
        };

        // sort by price by asc or dsc
        const productsPromise = Product.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

        const [products, filteredProduct] = await Promise.all([
            productsPromise,
         // show only filtered product in pages
        Product.find(baseQuery)
        ])

        // show total pages
        const totalPage = Math.ceil(filteredProduct.length / limit);

        return res.status(200).json({
            success: true,
           products,
           totalPage
        });
    }
);
