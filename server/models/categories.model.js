const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        cName : {
            type : String,
            required : true,
        },

        cDescription : {
            type : String,
            required : true
        },

        cImage : {
            type : String
        },

        cStatus : {
            type : String,
            required : true
        }
    },

    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;