import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";

export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "Ecom_24"
    }).then(() => {
        console.log("DB is connected");
    }).catch(error => {
        console.log(error);
    })
}


// revalidate Cache function
export const invalidateCache = async ({
    product, admin, order
}: InvalidateCacheProps) => {
    // product
    if (product) {
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "all-products",
        ];

        // find the id of all products
        const products = await Product.find({}).select("_id");

        products.forEach((i) => {
            productKeys.push(`product-${i._id}`)
        });

        myCache.del(productKeys);
    }
    // order
    if (order) {

    }
    // admin
    if (admin) {

    }
}