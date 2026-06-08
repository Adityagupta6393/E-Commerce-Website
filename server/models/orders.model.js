const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = mongoose.Schema(
    {
        allProduct: [
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
            required : true
        },

        transactionId : {
            type : String,
            required : true
        },

        address : {
            type : String,
            required : true
        },

        phone : {
            type : String,
            required : true
        },

        status : {
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