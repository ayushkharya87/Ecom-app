import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "Ecom_24"
    }).then(() => {
        console.log("DB is connected");
    }).catch(error => {
        console.log(error);
    });
};
