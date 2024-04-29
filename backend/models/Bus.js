// doctor.js

const mongoose = require('mongoose');
const { cli } = require('winston/lib/winston/config');
const Clinic = require('./clinic');

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  role: String,
  clinicId: String,
  ClinicName: String,
  experience: String,
  description: String,
  institutionalEmail: String,

  numberofAppointments: {
    type: Number,
    default: 0,
  },
  numberofofflineAppointments: {
    type: Number,
    default: 0,
  },
  numberofonlineAppointments: {
    type: Number,
    default: 0,
  },
  

  availability : [{
   
    timeSlots: [{ 
      startTime:Date,
      endTime: Date,
      availability: Boolean
    }]
  }],

  



  
appointment: [{ 
    patientId: String,
    patientName: String,
    bookedSlot: [{  startTime: String, endTime: String }],
    status: String,
    meetingLink: String,
    mode: String,
  }],


  sharedDocuments: [{ 
    patientName: String,
    files: [{ 
      filename: String,
      fileSize: Number,
      ipfsHash: String,
    }]
  }],

  





});

// Create and export the Doctor model
module.exports = mongoose.model('Doctor', doctorSchema);
