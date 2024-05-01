const { response } = require('express');
const mongoose = require('mongoose');

// Define the grievance schema
const grievanceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    },
    username: {
        type: String,
        required: true
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


    response: {
        type: String,
        default: ''
    }

});

// Create model
const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;
