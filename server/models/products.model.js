const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
    {
        pName: {
            type: String,
            required: true
        },

        pDescription: {
            type: String,
            required: true
        },

        pPrice: {
            type: Number,
            required: true
        },

        pSold: {
            type: Number,
            default: 0
        },

        pQuantity: {
            type: Number,
            required: true
        },

        pCategory: {
            type: ObjectId,
            ref: "Category"
        },

        pImages: {
            type: Array,
            default: []
        },

        pOffer: {
            type: String,
            default: null
        },

        pRatingsReviews: [
            {
                review: String,
                user: { type: ObjectId, ref: "User" },
                rating: String,
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],

        pStatus: {
            type: String,
            required: true
        },



    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
