const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    meetingPoint: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    sellersuid: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        default: ''
    }

});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
