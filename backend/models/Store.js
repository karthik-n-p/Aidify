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
        required: false
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
    },
    attachments: [
       
        {
            filename: {
                type: String,
             
            },
            path: {
                type: String,
              
            },
            size: {
                type: String,
               
            },
            mimetype: {
                type: String,
               
            },
            data: {
                type: Buffer, // Store file data as Buffer
                
            }
        }
    ],

});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
