import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // shipping info
    shippingInfo: {
        address: {
            type: String,
            reqired: true
        },
        city: {
            type: String,
            reqired: true
        },
        state: {
            type: String,
            reqired: true
        },
        country: {
            type: String,
            reqired: true
        },
        pinCode: {
            type: Number,
            reqired: true
        },
    },

    // usaer which place a order
    user: {
        type: String,
        ref: "User",
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shippingCharges: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },

    // order items
    orderItems: [
        {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        }
    ]
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);

