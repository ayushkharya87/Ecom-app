import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
export const connectDB = (uri) => {
    mongoose
        .connect(uri, {
        dbName: "Ecom_24",
    })
        .then(() => {
        console.log("DB is connected");
    })
        .catch((error) => {
        console.log(error);
    });
};
// revalidate Cache function
export const invalidateCache = async ({ product, admin, order, userId, orderId, productId, }) => {
    // -------------- product -------------
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string") {
            productKeys.push(`product-${productId}`);
        }
        if (typeof productId === "object") {
            productId.forEach((i) => productKeys.push(`product-${i}`));
        }
        myCache.del(productKeys);
    }
    // ------------order -------------
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    //------------ admin -----------
    if (admin) {
    }
};
// function for reduce stock
export const reduceStock = async (orderItems) => {
    // run a loop to find product stock
    for (let i = 0; i < orderItems.length; i++) {
        // find a order
        const order = orderItems[i];
        // find a product id
        const product = await Product.findById(order.productId);
        if (!product) {
            throw new Error("Product Not Found");
        }
        product.stock -= order.quantity;
        await product.save();
    }
};
