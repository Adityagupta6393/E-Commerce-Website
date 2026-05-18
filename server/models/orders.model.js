const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        allProducts: [
            {
                id: {
                    type: ObjectId,
                    ref: "Product"
                },
                quantity: {
                    type: Number
                }

            }
        ],

        user : {
            type : ObjectId,
            ref : "User",
            required : true
        },

        amount : {
            type : Number,
            rquired : true
        },

        transactionId : {
            type : String,
            rquired : true
        },

        address : {
            type : String,
            required : true
        },

        phoneNumber : {
            type : String,
            rquired : true
        },

        orderStatus : {
            type : String,
            default : "Not Processed",
            enum : [
                "Not Processed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ]
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;