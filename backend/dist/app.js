import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
// imports routes
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
// give the path of env file
config({
    path: "./.env",
});
// port
const port = process.env.PORT || 3000;
// database
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
// node-cache
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("API working");
});
// use routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
// declare static folder
app.use("/uploads", express.static("uploads"));
// middleware for error handling
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
