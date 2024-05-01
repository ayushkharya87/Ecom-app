import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
// import NodeCache from "node-cache"
// imports routes
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
// port
const port = 3000;
// database
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API working");
});
// use routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
// declare static folder
app.use("/uploads", express.static("uploads"));
// middleware for error handling
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
