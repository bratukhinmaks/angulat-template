const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    price: {
        type: Number
    },
    address: {
        type: String
    },
    payment: {
        type: String
    },
    date: {
        type: Date
    },
    status: {
        type: String
    },
    delivery: {
        type: String
    },
    products: [{
        ref: 'products',
        type: Schema.Types.ObjectID
    }]
})

module.exports = mongoose.model('orders', orderSchema);

