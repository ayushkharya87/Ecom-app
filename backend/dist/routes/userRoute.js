import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/userController.js";
import { AdminOnly } from "../middlewares/auth.js";
const app = express.Router();
// create new user
app.post("/new", newUser);
// get all users
app.get("/all", AdminOnly, getAllUsers);
// get single user
app.get("/:id", getUser);
// delete user
app.delete("/:id", AdminOnly, deleteUser);
export default app;
