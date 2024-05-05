import express from "express"
import { AdminOnly } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/orderController.js";


const app = express.Router();

// create new order
app.post("/new", newOrder);
// my orders
app.get("/my", myOrders);
// all orders for admin can see
app.get("/all", AdminOnly, allOrders);
// get single product
app.route("/:id").get(getSingleOrder)
// process order for status update
app.route("/:id").put(AdminOnly, processOrder)
// delete order
app.route("/:id").delete(AdminOnly, deleteOrder)

export default app;