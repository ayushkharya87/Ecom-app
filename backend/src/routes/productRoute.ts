import express from "express"
import { AdminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, searchProducts, updateProduct } from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// new product
app.post("/new", AdminOnly, singleUpload, newProduct);
// search products
app.get("/all", searchProducts)
// latest product
app.get("/latest", getLatestProducts);
// categories
app.get("/categories", getAllCategories);
// get all products for admin
app.get("/admin-products", AdminOnly, getAdminProducts);

// get single product
app.get("/:id", getSingleProduct)
// update product
app.put("/:id", AdminOnly, singleUpload, updateProduct)
// delete product
app.delete("/:id", AdminOnly, deleteProduct)


export default app;