const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    date: {
        required: true,
        type: Date,
    },
    isDeleted: {
        required: true,
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('products', productSchema);
