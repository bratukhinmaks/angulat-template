const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        ref: 'users',
        type: Schema.Types.ObjectID
    },
    products: [{
        ref: 'products',
        type: Schema.Types.ObjectID
    }],
    orders: [{
        ref: 'orders',
        type: Schema.Types.ObjectID
    }]
})

module.exports = mongoose.model('restaurants', restaurantSchema);
