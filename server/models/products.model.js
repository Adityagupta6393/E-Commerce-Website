const mongoose = rquire('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
    {
        pName: {
            type: String,
            rquired: true
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
            required: true
        },

        pQuantity: {
            type: Number,
            required: true
        },

        pCategory: {
            type: ObjectId,
            ref: "Category"
        },

        pImage: {
            type: String,
            default: []
        },

        pOffer: {
            type: String,
            defualt: null
        },

        pRatingsReviews: [
            {
                review: String,
                user: { type: ObjectId, ref: "users" },
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
