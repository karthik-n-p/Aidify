const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  fileSize: Number,
  ipfsHash: String,
});





const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  uid: String,
  appointments : [{
    doctorName: String,
    bookedSlot: [{ date: String, startTime: String, endTime: String }],
    status: String,
    mode: String,
    meetingLink: String,

  }],
  
  files: [[fileSchema]], // Array of arrays of files

  sharedFiles: [{
    doctorName: String,
   
  }],

  
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
