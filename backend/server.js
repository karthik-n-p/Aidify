//I have defined  x='333' in .env file in same folder as server.js
//I have to console.log the value of api key in server.js file
//console.log(process.env.RAPIDAPI_KEY);
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

const express = require('express');
//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// const { GPT } = require('openai');
const axios = require('axios');
//Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.
const cors = require('cors');

const logger = require('winston');

const mongoose = require('mongoose');

const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express();
const port = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
require('dotenv').config();


const api = process.env.x
console.log(api);


mongoose.connect(process.env.MONGODB_URI,)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));


const openaiapi = process.env.OPENAI_API_KEY
console.log(openaiapi);

//to test tessaract-ocr package getting text from image

var generator = require('generate-password');

    //Admin Firebase
    const admin = require('firebase-admin');
    const serviceAccount = require('./pack.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    admin
    .auth()
    .listUsers()
    .then((userRecords) => {
     
      // The Admin SDK is authenticated and the user list was retrieved successfully
      console.log('Firebase Admin SDK is properly set up');
      console.log('Total user:', userRecords.users.length);
    })
    .catch((error) => {
      // There was an error authenticating or retrieving the user list
      console.error('Firebase Admin SDK setup error:', error);
    });
  
  
    const emails = ["code25545@gmail.com", "admin11@gmail.com"]; // Provide the emails of the users to grant admin access
  
  Promise.all(
    emails.map((email) =>
      admin
        .auth()
        .getUserByEmail(email)
        .then((userRecord) => {
          // Add the "admin" custom claim to the user
          const customClaims = {
            admin: true
          };
  
          return admin.auth().setCustomUserClaims(userRecord.uid, customClaims);
        })
        .then(() => {
          const uid = 'y6zzq071ARVhLDWzbSiV4dzIYZK2'; // Replace with the UID of the user you want to check
  
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      const customClaims = userRecord.customClaims;
      if (customClaims && customClaims.admin) {
        console.log('User has admin access');
      } else {
        console.log('User does not have admin access');
      }
    })
    .catch((error) => {
      console.error('Error retrieving user:', error);
    })
        })
        .catch((error) => {
          console.error(`Error granting admin access to ${email}:`, error);
        })
    )
  )
    .then(() => {
      console.log("Admin access granted to all users");
    })
    .catch((error) => {
      console.error("Error granting admin access:", error);
    });


   

    //Firebase post request to verify user is admin or not
    app.post('/admin-status', async (req, res) => {
      const { uid } = req.body;

      try {
        const userRecord = await admin.auth().getUser(uid);
        const customClaims = userRecord.customClaims;
        if (customClaims && customClaims.admin) {
          res.status(200).json({ isAdmin: true });
        } else {
          res.status(200).json({ isAdmin: false });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });



    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    
    app.post('/upload/:uid', upload.single('file'), async (req, res) => {
      const { uid } = req.params;
    
      try {
        const file = req.file;
        
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const formData = new FormData();
        formData.append('file', file.buffer, { filename: file.originalname });
        const pinataMetadata = JSON.stringify({ name: file.originalname });
        formData.append('pinataMetadata', pinataMetadata);
        const pinataOptions = JSON.stringify({ cidVersion: 1 });
        formData.append('pinataOptions', pinataOptions);
    
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${process.env.PINATA_JWT}`,
            },
          }
        );
    
        console.log('File uploaded to Pinata:', response.data.IpfsHash);
    
        const patient = await Patient.findOne({ uid });
    
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
    
        const newFile = {
          filename: file.originalname,
          fileSize: file.size,
          ipfsHash: response.data.IpfsHash,
        };
    
        patient.files.push(newFile);
        await patient.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error uploading file to Pinata:', error);
        res.status(500).json({ error: 'Failed to upload file to Pinata' });
      }
    });
    

const Patient = require('./models/patient');


app.get('/files/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Search for patient with the same uid
    const patient = await Patient.findOne({ uid });

    // If the patient does not exist, return an error
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Extract the IPFS hashes of the patient's files from MongoDB
 // Extract the IPFS hashes of the patient's files from MongoDB
const patientIPFSHashes = patient.files.flatMap(innerArray => innerArray.map(file => file.ipfsHash));


    // Fetch all pinned files from Pinata
    const response = await axios.get(
      'https://api.pinata.cloud/data/pinList?status=pinned',
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`, // Replace with your Pinata JWT
        },
      }
    );
 

    // Filter the pinned files to only include those with IPFS hashes present in both MongoDB and the retrieved list
    const patientFiles = response.data.rows.filter(file => patientIPFSHashes.includes(file.ipfs_pin_hash));

    // Send the filtered files as the response
    res.status(200).json(patientFiles);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});



















    app.post('/create-user/:uid', async (req, res) => {
      try {
        const { email } = req.body;
        const { name } = req.body;
        const { uid } = req.params;
    
        // Generate a random password
        const password = generator.generate({
          length: 6,
          numbers: true,
          uppercase: true,
          symbols: false,
        });
    
        // Create the user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
          email,
          password,
          displayName: name,
        });
    
        // Assign the doctor role to the user
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'doctor' });


        
        

    
        // Return the generated password in the response
        res.status(200).json({ success: true, password });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, error: 'Failed to create user' });
      }
    });






    const Doctor = require('./models/doctors');
const Clinic = require('./models/clinic');
   
    // Endpoint to save doctor details in MongoDB

    app.post('/save-doctor/:id', async (req, res) => {
      try {
        const { name, specialization, availability, description,experience, institutionalEmail } = req.body;
        const { id } = req.params;
        console.log("id",id);

        let  numberofAppointments = 0;
        let  numberofofflineAppointments = 0;
        let  numberofonlineAppointments = 0;
        
        // Find the clinic document with the clinic ID
        const clinic = await Clinic
        .findOne ({ id: id });

        if (!clinic) {
          return res.status(404).json({ success: false, error: 'Clinic not found' });
        }


    
        // Create a new Doctor document
        const doctor = new Doctor({
          name,
          specialization,
          availability,
          description,
          institutionalEmail,
          clinicId: id,
          ClinicName: clinic.name,
          role: 'doctor',
          experience,
          experience,
          numberofAppointments,
          numberofofflineAppointments,
          numberofonlineAppointments,

        });

        // save the doctor details inside the colection Doctors if the doctor is created in mongodb database console log the message

        await doctor.save();

        if (doctor){
          console.log("doctor created in mongodb database");
        }

        // Update the clinic document to save the doctor's ID

        clinic.doctors.push(doctor._id);
        await clinic.save();

        
    
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error saving doctor details:', error);
        res.status(500).json({ success: false, error: 'Failed to save doctor details' });
      }
    }
    );



    // Endpoint to fetch all doctors from MongoDB

    app.get('/doctors', async (req, res) => {
      try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
      }
    }
    );


    // Endpoint to save patient details in MongoDB
    app.post('/save-patient/:doctorName', async (req, res) => {
      
    
      try {
        const { doctorName } = req.params;
      const { patientName, bookedSlot } = req.body;

      console.log("doctorName",patientName, "bookedSlot",bookedSlot);
        // Find the doctor document with the doctor name

        const doctor = await Doctor.findOne({ name: doctorName });


        
    
        if (!doctor) {
          console.log("doctor not found");
          return res.status(404).json({ success: false, error: 'Doctor not found' });
         
        }
    
        // Update the doctor's document to save patient details
        doctor.appointment.push({ name: patientName, bookedSlot: bookedSlot, status: 'booked'});
  
        await doctor.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error saving patient details:', error);
        res.status(500).json({ success: false, error: 'Failed to save patient details' });
      }
    });


    // Endpoint to fetch patients for a specific doctor from MongoDB

    app.get('/patients/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.status(200).json(doctor.appointments);
      } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
      }
    }
    );



    // endpoint to save patient details in MongoDB

    app.post('/create-patient', async (req, res) => {
      try {
        const { username, email, uid } = req.body;
    
        // Create a new Patient document if the patient does not exist
        const patient = await Patient
        .findOne({ uid });

        if (patient) {

          console.log("patient already exists");
          return res.status(400).json({ success: false, error: 'Patient already exists' });
        }

        const newPatient = new Patient({
          name: username,
          email,
          uid,
        });

        await newPatient.save();


    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ success: false, error: 'Failed to create patient' });
      }
    }
    );


    //end point to share patient details with doctor

    app.post('/share', async (req, res) => {
      const {  patientname, fileId } = req.body;
      console.log("patientname",patientname, "fileId",fileId);
      try {
       

    
        // Find the doctor document with the doctor ID
        const doctor = await Doctor.findOne({ name: fileId });
    
        if (!doctor) {
          console.log("Doctor not found");
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
    
        // Find the patient document with the patient name
        const patient = await Patient.findOne({ name: patientname });
        console.log("patient",patient);
    
        if (!patient) {
          console.log("Patient not found");
          return res.status(404).json({ success: false, error: 'Patient not found' });
        }
     // Extract file information from the patient's files array
     const sharedFiles = patient.files.map(file => ({
      filename: file[0].filename,
      fileSize: file[0].fileSize,
      ipfsHash: file[0].ipfsHash,
    }));

    const shared =1;
   //if the inside shared doucments array of the doctor the patient name is already present then update the shared files array with the new file
    for (let i = 0; i < doctor.sharedDocuments.length; i++) {
      if (doctor.sharedDocuments[i].patientName === patientname) {
        doctor.sharedDocuments[i].files.push(...sharedFiles);
        shared = 0;
        await doctor.save();
        break;
      }
    }
    if(shared === 1){
      doctor.sharedDocuments.push({ patientName: patientname, files: sharedFiles });
      await doctor.save();

    }



    //push the name of the doctor to the patient's sharedDoctors array if the doctor name is not already present in the array
    if (!patient.sharedFiles.some(file => file.doctorName === fileId)) {

    patient.sharedFiles.push({ doctorName: fileId });
    await patient.save();
  }


   

   

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error sharing documents:', error);
        res.status(500).json({ success: false, error: 'Failed to share documents' });
      }
    });


    //Endpoints to fetch the details of the doctors who have access to the shared documents

    app.get('/shared-doctors/:patientName', async (req, res) => {
      try {
        const { patientName } = req.params;
    
        // Find the patient document with the patient name
        const patient
          = await Patient .findOne({ name: patientName });

        if (!patient) { 
          return res.status(404).json({ success: false, error: 'Patient not found' });
        }

        const sharedDoctors = patient.sharedFiles;
        res.status(200).json(sharedDoctors);
      } catch (error) {
        console.error('Error fetching shared doctors:', error);
        res.status(500).json({ error: 'Failed to fetch shared doctors' });
      }
    }
    );



    // Endpoint to fetch shared documents for a specific doctor from MongoDB

    app.get('/shared-documents/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.status(200).json(doctor.sharedDocuments);
      } catch (error) {
        console.error('Error fetching shared documents:', error);
        res.status(500).json({ error: 'Failed to fetch shared documents' });
      }

    }

    );

    // Endpoint to remove shared documents for a specific doctor from MongoDB

    app.post('/remove-shared', async (req, res) => {

      try {
        const { doctorName, patientName } = req.body;

        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        // Find the patient document with the patient name

        const patient = await Patient
        .findOne({ name: patientName });

        if (!patient) {
          return res.status(404).json({ success: false, error: 'Patient not found' });
        }

        console.log("doctor name",doctorName, "patient name",patientName);

        // Remove the patient's name from the doctor's sharedDocuments array
        doctor.sharedDocuments = doctor.sharedDocuments.filter(doc => doc.patientName !== patientName);
        console.log("doctor shared documents",doctor.sharedDocuments);

        // Remove the doctor's name from the patient's sharedDoctors array
        patient.sharedFiles = patient.sharedFiles.filter(file => file.doctorName !== doctorName);
        console.log("patient shared files",patient.sharedFiles);


        await doctor.save();
        await patient.save();

        res.status(200).json({ success: true });

      } catch (error) {
        console.error('Error removing shared documents:', error);
        res.status(500).json({ success: false, error: 'Failed to remove shared documents' });
      }

    }

    );
    








    //end point to create slot for doctor
    app.post('/create-slot', async (req, res) => {
      try {
        const { doctorName,startTime, endTime } = req.body;
        console.log("doctorName",doctorName, "startTime",startTime, "endTime",endTime);


        
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne({ name: doctorName });
        console.log("doctor",doctor);
        
    
        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
        console.log("length of availability",doctor.availability.length);
        for (let i = 0; i < doctor.availability.length ; i++) {
          const timeSlot = doctor.availability[i].timeSlots[0]; // Assuming timeSlots is an array
       
          const startTime1 = new Date(timeSlot.startTime);
          const endTime1 = new Date(timeSlot.endTime);


          const startTime2 = new Date(startTime);
          const endTime2 = new Date(endTime);

          
        
          console.log("Start Time1:", startTime1, "start time2",startTime2);
        // check wether the slot already exists

          if (startTime1.getTime() === startTime2.getTime() && endTime1.getTime() === endTime2.getTime()) {
            return res.status(400).json({ success: false, error: 'Slot already exists' });
          }
        

          //checks wether the slot clash with the existing slot that is start time is less than the existing end time and end time is greater than the existing start time 

          if ((startTime2.getTime() < endTime1.getTime() && endTime2.getTime() > startTime1.getTime())  ) {
            return res.status(400).json({ success: false, error: 'Slot clash with existing slot' });
          }



        
        }
        
       
          // Create a new date with the new time slot
          doctor.availability.push({ timeSlots: [{ startTime, endTime, availability: true }] });
        
    
        await doctor.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ success: false, error: 'Failed to create slot' });
      }
    });


    // Endpoint to fetch available slots for a specific doctor from MongoDB

    app.get('/get-slots/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        //set availability false if the slot time has already passed
        for(let i = 0; i < doctor.availability.length; i++){
          const timeSlot = doctor.availability[i].timeSlots;
          for(let j = 0; j < timeSlot.length; j++){
            const slot = timeSlot[j];
            const startTime = new Date(slot.startTime);
            const endTime = new Date(slot.endTime);
            const currentDate = new Date();

            if(currentDate.getTime() > startTime.getTime() || currentDate.getTime() > endTime.getTime()){
              slot.availability = false;
            }
          }
        }

        res.status(200).json(doctor.availability);
      } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch slots' });
      }
    }
    );


    // Endpoint to remove a slot for a specific doctor from MongoDB 

    app.post('/remove-slot', async (req, res) => {
      try {
        const { doctorName, startTime, endTime } = req.body;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

       
     //if the start time and end time matches with the existing start time and end time then remove the slot
     for (let i = 0; i < doctor.availability.length ; i++) {
      const timeSlot = doctor.availability[i].timeSlots[0]; // Assuming timeSlots is an array

      const startTime1 = new Date(timeSlot.startTime);
      const endTime1 = new Date(timeSlot.endTime);


      const startTime2 = new Date(startTime);
      const endTime2 = new Date(endTime);

      if (startTime1.getTime() === startTime2.getTime() && endTime1.getTime() === endTime2.getTime()) {
        doctor.availability.splice(i, 1);
        break;
      }
    }

        await doctor.save();

        res.status(200).json({ success: true });

      } catch (error) {
        console.error('Error removing slot:', error);
        res.status(500).json({ success: false, error: 'Failed to remove slot' });
      }

    }

    );




    // Endpoint to book a slot for a specific doctor from MongoDB

    app.post('/book-slot', async (req, res) => {

      try {

        let { doctorName, startTime, endTime, patientName, mode ,meetingLink } = req.body;
        console.log("doctorName",doctorName, "startTime",startTime, "endTime",endTime, "patientName",patientName, "mode",mode, "meetingLink",meetingLink)

        
        
        // Find the doctor document with the doctor name

        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        // Find the patient document with the patient name

        const patient = await Patient
        .findOne({ name: patientName });

        if (!patient) {
          return res.status(404).json({ success: false, error: 'Patient not found' });
        }

         // Find the date with the specified start and end times

         for (let i = 0; i < doctor.availability.length ; i++) {  
          const timeSlot = doctor.availability[i].timeSlots; // Assuming timeSlots is an array
       

          for(let j = 0; j < timeSlot.length; j++){
            const slot = timeSlot[j];
        
            const startTime1 = new Date(slot.startTime).toLocaleString();
            console.log("startTime1",startTime1);
            const endTime1 = new Date(slot.endTime).toLocaleString();
            console.log("endTime1",endTime1);

            const startTime2 = new Date(startTime).toLocaleString();
            console.log("startTime2",startTime2);
            const endTime2 = new Date(endTime).toLocaleString();
            console.log("endTime2",endTime2);

            if (startTime1 === startTime2 && endTime1 === endTime2) {
              console.log("slot available",slot.availability);
              if (!slot.availability) {
                return res.status(400).json({ success: false, error: 'Slot is not available' });
              }
              slot.availability = false;
              break;
            }
          }
        }


        





        



      





          // Update the doctor's document to save patient details 

          //if mode is online then save the meeting link else save the mode as offline 

          if(mode === 'online'){
           //set meeting link with unique id for each meeting
           const meetingLink = generator.generate({
            length: 6,
            numbers: true,
            uppercase: true,
            symbols: false,
          });
          //upate the number of online appointments for the doctor
          doctor.numberofonlineAppointments = doctor. numberofonlineAppointments + 1;

          doctor.appointment.push({ patientName, bookedSlot: {  startTime, endTime }, status: 'booked', mode: 'online', meetingLink });
          patient.appointments.push({ doctorName, bookedSlot: {  startTime, endTime }, status: 'booked', mode: 'online', meetingLink });

          }
          else{
            //upate the number of offline appointments for the doctor
            doctor.numberofofflineAppointments = doctor. numberofofflineAppointments + 1;
            doctor.appointment.push({ patientName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });
            patient.appointments.push({ doctorName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });

          }

          await doctor.save();

          await patient.save();


          //upate the patient details in the patient collection

       

         



          res.status(200).json({ success: true });


      } catch (error) {

        console.error('Error booking slot:', error);

        res.status(500).json({ success: false, error: 'Failed to book slot' });

      }

      

    }
      
      );

      // Endpoint to fetch booked slots for a specific doctor from MongoDB

      app.get('/booked-slots/:doctorName', async (req, res) => {

        try {
            
            const { doctorName } = req.params;
  
            // Find the doctor document with the doctor name
  
            const doctor = await Doctor.findOne
            ({ name: doctorName });

            if (!doctor) {
              return res.status(404).json({ success: false, error: 'Doctor not found' });
            }

            res.status(200).json(doctor.appointment);

        } catch (error) {
            
              console.error('Error fetching booked slots:', error);
  
              res.status(500).json({ error: 'Failed to fetch booked slots' });
  
          }

      }
        
        );


        // Endpoint to fetch booked slots for a specific patient from MongoDB

        app.get('/booked-slots-patient/:patientName', async (req, res) => {

          try {
              
              const { patientName } = req.params;
    
              // Find the patient document with the patient name
    
              const patient = await Patient.findOne
              ({ name: patientName });

              if (!patient) {
                return res.status(404).json({ success: false, error: 'Patient not found' });
              }

              res.status(200).json(patient.appointments);

          } catch (error) {
              
                console.error('Error fetching booked slots:', error);
    
                res.status(500).json({ error: 'Failed to fetch booked slots' });
    
            }

        }
            
            );





        // Endpoint to cancel a booked slot for a specific doctor from MongoDB

        app.post('/cancel-slot', async (req, res) => {

          try {

            const { doctorName, date, startTime, endTime, patientName } = req.body;


            // Find the doctor document with the doctor name

            const doctor = await Doctor.findOne
            ({ name: doctorName });

            if (!doctor) {
              return res.status(404).json({ success: false, error: 'Doctor not found' });
            }

            // Find the date with the specified date

            const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());

            if (!existingDate) {
              return res.status(404).json({ success: false, error: 'Date not found' });
            }


            // Find the time slot with the specified start and end times

            const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);

            if (!existingSlot) {
              return res.status(404).json({ success: false, error: 'Slot not found' });
            }

            // Check if the slot is already booked

            if (existingSlot.availability) {
              return res.status(400).json({ success: false, error: 'Slot is not booked' });
            }

            // Update the slot to mark it as available

            existingSlot.availability = true;

            // Find the patient document with the patient name

            const patient = await Patient
            .findOne({ name: patientName });

            if (!patient) {
              return res.status(404).json({ success: false, error: 'Patient not found' });
            }

            // Remove the appointment from the doctor's document

            doctor.appointment = doctor.appointment.filter(appointment => appointment.patientName !== patientName);

            // Remove the appointment from the patient's document

            patient.appointments = patient.appointments.filter(appointment => appointment.doctorName !== doctorName);

            await doctor.save();


            await patient.save();

            res.status(200).json({ success: true });

          } catch (error) {

            console.error('Error canceling slot:', error);

            res.status(500).json({ success: false, error: 'Failed to cancel slot' });

          }

        }



        );


        //end point to save clinic details in MongoDB

   

        app.post('/save-clinic/:id', async (req, res) => {
          try {
            const { name, location } = req.body;
            const { id } = req.params;
            let totalAppointments = 0;
            let totalOnlineAppointments = 0;
            let totalOfflineAppointments = 0;

        
            // Create a new Clinic document
            const clinic = new Clinic({
              name,
              location,
              id,
              totalAppointments,
              totalOnlineAppointments,
              totalOfflineAppointments,

            });
        
            await clinic.save();
        
            res.status(200).json({ success: true });
          } catch (error) {
            console.error('Error saving clinic details:', error);
            res.status(500).json({ success: false, error: 'Failed to save clinic details' });
          }
        }
        );


        // Endpoint to fetch the clinic details from MongoDB

        app.get('/clinics/:uid', async (req, res) => {
          try {
            uid = req.params.uid;
            const clinic = await Clinic.findOne({id: uid });

            if (!clinic) {
              return res.status(404).json({ success: false, error: 'Clinic not found' });
            }

            res.status(200).json(clinic);
          
          } catch (error) {
            console.error('Error fetching clinics:', error);
            res.status(500).json({ error: 'Failed to fetch clinics' });
          }
        }


        );



        //End point to fetch details about a specific doctor from MongoDB

        app.get('/doctor/:doctorName', async (req, res) => {
          try {
            const { doctorName } = req.params;


            // Find the doctor document with the doctor name

            const doctor = await Doctor.findOne({ name: doctorName });

            if (!doctor) {
              return res.status(404).json({ success: false, error: 'Doctor not found' });
            }

            res.status(200).json(doctor);

          } catch (error) {

              console.error('Error fetching doctor:', error);

              res.status(500).json({ error: 'Failed to fetch doctor' });

            }

        }
        
        );





        //end point to fetch doctors for a specific clinic from MongoDB

        app.get('/doctors/:clinicId', async (req, res) => {

          try {

            const { clinicId } = req.params;

            // Find the doctor document with the clinic ID

            const doctors = await Doctor.find({ clinicId });

            if (!doctors) {
              return res.status(404).json({ success: false, error: 'Doctors not found' });
            }

            res.status(200).json(doctors);

          } catch (error) {
              
              console.error('Error fetching doctors:', error);
  
              res.status(500).json({ error: 'Failed to fetch doctors' });
  
            }



        }

      );


    //endpoint to remove doctor from clinic and remove mail from firebase

    app.delete('/remove-doctors/:doctorId', async (req, res) => {

      try {
          
          const { doctorId } = req.params;

          
  
          // Find the doctor document with the doctor ID
          
          const doctor = await Doctor.findOne({ _id: doctorId });

          



          if (!doctor) {
            return res.status(404).json({ success: false, error: 'Doctor not found' });
          }

          // Find the clinic document with the clinic ID

          const clinic = await Clinic.findOne({email: doctor.email});

          if (!clinic) {
            return res.status(404).json({ success: false, error: 'Clinic not found' });
          }

          // Remove the doctor from the clinic

          clinic.doctors = clinic.doctors.filter(doc => doc.toString() !== doctorId);

          await clinic.save();

          // Delete the doctor document

          await Doctor.deleteOne({ _id: doctorId });




          // Delete the doctor from firebase
          console.log('doctor.institutionalEmail', );

          admin.auth().getUserByEmail(doctor.institutionalEmail)
          .then((userRecord) => {
            // User found, delete user
            return admin.auth().deleteUser(userRecord.uid);
          })
          .then(() => {
            console.log(`Successfully deleted user with email: ${email}`);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });

          res.status(200).json({ success: true });


      } catch (error) {

          console.error('Error removing doctor:', error);

          res.status(500).json({ success: false, error: 'Failed to remove doctor' });

      }

    }
      
      );


      //endpoint to retrieve past appointments for a specific doctor from MongoDB

      app.get('/past-appointments/:doctorName', async (req, res) => {

        try {

          const { doctorName } = req.params;

          // Find the doctor document with the doctor name

          const doctor = await Doctor.findOne({ name: doctorName });

          if (!doctor) {
            return res.status(404).json({ success: false, error: 'Doctor not found' });
          }
            

          const currentDate = new Date();

          const pastAppointmetns =[ ];

          const FutureAppiontments = [];

          const LiveAppointments = [];

          for (let i = 0; i < doctor.appointment.length ; i++) {  
            const timeSlot = doctor.appointment[i].bookedSlot; // Assuming timeSlots is an array
            console.log("timeSlot",doctor.appointment[i]);
         
  
            for(let j = 0; j < timeSlot.length; j++){
              const slot = timeSlot[j];
          
              const startTime1 = new Date(slot.startTime);
              console.log("startTime1",startTime1);
              const endTime1 = new Date(slot.endTime);
              console.log("endTime1",endTime1);

              if (currentDate.getTime()>endTime1.getTime()) {
                //if slot is already present in the past appointment then continue
                if(pastAppointmetns.includes(slot)){
                  continue;
                }
                else{
                  //also push the current 
                  pastAppointmetns.push(slot);

                  if(pastAppointmetns.includes(doctor.appointment[i].patientName) && pastAppointmetns.includes(doctor.appointment[i].mode) && pastAppointmetns.includes(doctor.appointment[i].meetingLink)){
                    continue;
                  }
                  else{
                  pastAppointmetns.push(doctor.appointment[i].patientName);
                  pastAppointmetns.push(doctor.appointment[i].mode);
                  pastAppointmetns.push(doctor.appointment[i].meetingLink);


                }
              }
                
              }

              else if(currentDate.getTime() < startTime1.getTime() && currentDate.getTime() < endTime1.getTime()){
                if(FutureAppiontments.includes(slot)){
                  break;
                }
                else{
                  //also push other details in the future appointment like patient name, meeting link , mode of appointment only once 
                  FutureAppiontments.push(slot);
                  if(FutureAppiontments.includes(doctor.appointment[i].patientName) && FutureAppiontments.includes(doctor.appointment[i].mode) && FutureAppiontments.includes(doctor.appointment[i].meetingLink)){
                    continue;
                  }
                  else{
                  FutureAppiontments.push(Name = doctor.appointment[i].patientName);
                  FutureAppiontments.push(Mode =doctor.appointment[i].mode);
                  FutureAppiontments.push(meetingLink = doctor.appointment[i].meetingLink);
                  }
                  

                }
             
              }

              else if(currentDate.getTime() > startTime1.getTime() && currentDate.getTime() < endTime1.getTime()){
                if(LiveAppointments.includes(slot)){
                  continue;
                }
                else{
                  LiveAppointments.push(slot);
                  if(LiveAppointments.includes(doctor.appointment[i].patientName) && LiveAppointments.includes(doctor.appointment[i].mode) && LiveAppointments.includes(doctor.appointment[i].meetingLink)){
                    continue;
                  }
                  else{
                 
                  LiveAppointments.push(doctor.appointment[i].patientName);
                  LiveAppointments.push(doctor.appointment[i].mode);
                  LiveAppointments.push(doctor.appointment[i].meetingLink);

                  }
                  

                  
                  
                }
               
              }

            }
            

          

          } 
          console.log("pastAppointmetns",pastAppointmetns);
          console.log("FutureAppiontments",FutureAppiontments);
          console.log("LiveAppointments",LiveAppointments);

          //create a key value pair for past, future and live appointments

          const allAppointments = {
            pastAppointmetns,
            FutureAppiontments,
            LiveAppointments
          };

          console.log("allAppointments",allAppointments);

          //return the key value pair
          res.status(200).json(allAppointments);



       


         

        } catch (error) {
              
                console.error('Error fetching past appointments:', error);
    
                res.status(500).json({ error: 'Failed to fetch past appointments' });
    
              }

      }

    );


    // Endpoint to fetch past,present,live appointments for a specific patient from MongoDB as above

    app.get('/past-appointments-patient/:patientName', async (req, res) => {
        
        try {
  
          const { patientName } = req.params;
  
          // Find the patient document with the patient name
  
          const patient = await Patient
          .findOne({ name: patientName });


          if (!patient) {
            return res.status(404).json({ success: false, error: 'Patient not found' });
          }

          const currentDate = new Date();

          const pastAppointmetns =[ ];
          const FutureAppiontments = [];
          const LiveAppointments = [];

          for (let i = 0; i < patient.appointments.length ; i++) {
            const timeSlot = patient.appointments[i].bookedSlot; // Assuming timeSlots is an array
            console.log("timeSlot",patient.appointments[i]);
         
            for(let j = 0; j < timeSlot.length; j++){
              const slot = timeSlot[j];
          
              const startTime1 = new Date(slot.startTime);
              console.log("startTime1",startTime1);
              const endTime1 = new Date(slot.endTime);
              console.log("endTime1",endTime1);

              if (currentDate.getTime()>endTime1.getTime()) {
                //if slot is already present in the past appointment then continue
                if(pastAppointmetns.includes(slot)){
                  continue;
                }
                else{
                  //also push the current 
                  pastAppointmetns.push(slot);

                  if(pastAppointmetns.includes(patient.appointments[i].doctorName) && pastAppointmetns.includes(patient.appointments[i].mode) && pastAppointmetns.includes(patient.appointments[i].meetingLink)){
                    continue;
                  }
                  else{
                  pastAppointmetns.push(patient.appointments[i].doctorName);
                  pastAppointmetns.push(patient.appointments[i].mode);
                  pastAppointmetns.push(patient.appointments[i].meetingLink);


                }
              }
                
              }

              else if(currentDate.getTime() < startTime1.getTime() && currentDate.getTime() < endTime1.getTime()){
                if(FutureAppiontments.includes(slot)){
                  break;
                }
                else{
                  //also push other details in the future appointment like patient name, meeting link , mode of appointment only once 
                  FutureAppiontments.push(slot);
                  if(FutureAppiontments.includes(patient.appointments[i].doctorName) && FutureAppiontments.includes(patient.appointments[i].mode) && FutureAppiontments.includes(patient.appointments[i].meetingLink)){
                    continue;
                  }
                  else{
                  FutureAppiontments.push(Name = patient.appointments[i].doctorName);
                  FutureAppiontments.push(Mode =patient.appointments[i].mode);
                  FutureAppiontments.push(meetingLink = patient.appointments[i].meetingLink);
                  }
                  

                }
             
              }

              else if(currentDate.getTime() > startTime1.getTime() && currentDate.getTime() < endTime1.getTime()){
                if(LiveAppointments.includes(slot)){
                  continue;
                }
                else{
                  LiveAppointments.push(slot);
                  if(LiveAppointments.includes(patient.appointments[i].doctorName) && LiveAppointments.includes(patient.appointments[i].mode) && LiveAppointments.includes(patient.appointments[i].meetingLink)){
                    continue;
                  }
                  else{
                 
                  LiveAppointments.push(patient.appointments[i].doctorName);
                  LiveAppointments.push(patient.appointments[i].mode);
                  LiveAppointments.push(patient.appointments[i].meetingLink);

                  }
                  

                  
                  
                }
               
              }

            }


          }

          console.log("pastAppointmetns",pastAppointmetns);
          console.log("FutureAppiontments",FutureAppiontments);
          console.log("LiveAppointments",LiveAppointments);

          //create a key value pair for past, future and live appointments

          const allAppointments = {
            pastAppointmetns,
            FutureAppiontments,
            LiveAppointments
          };

          console.log("allAppointments",allAppointments);

          //return the key value pair

          res.status(200).json(allAppointments);

        } catch (error) {
                
                console.error('Error fetching past appointments:', error);
    
                res.status(500).json({ error: 'Failed to fetch past appointments' });
    
              } 

    }
      
      );






       








        

















  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



