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
    

// const Patient = require('./models/Student');











//     const Doctor = require('./models/Bus');
// const Clinic = require('./models/clinic');
   
    // Endpoint to save doctor details in MongoDB





const Product = require('./models/Store');


// Endpoint to save product details in MongoDB

app.post('/save-product', async (req, res) => {
  try {
    const { title, description, seller, price, meetingPoint, email, image, sellersuid } = req.body;

    // Create a new Product document
    const product = new Product({
      title,
      description,
      seller,
      price,
      meetingPoint,
      email,
      image,
      sellersuid,
    });

    await product.save();


    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error saving product details:', error);

    res.status(500).json({ success: false, error: 'Failed to save product details' });

  }

}

);

//create a sample json file to test the api in postman
// {
//   "title": "Product 1",
//   "description": "Description 1",
//   "seller": "Seller 1",
//   "price": 100,
//   "meetingPoint": "Meeting Point 1",
//   "email": "
//   "image": "https://via.placeholder.com/150",
//   "sellersuid": "123456"
// }




// Endpoint to fetch all products from MongoDB

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    console.error('Error fetching products:', error);

    res.status(500).json({ error: 'Failed to fetch products' });

  }

}

);


// Endpoint to fetch a specific product from MongoDB

app.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product .findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error('Error fetching product:', error);

    res.status(500).json({ error: 'Failed to fetch product' });

  }

}

);

// Endpoint to update a specific product in MongoDB

app.put('/update-product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, seller, price, meetingPoint, email, image, sellersuid } = req.body;

    const product = await Product .findOne({ _id: productId });

    if (!product) { 
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.title = title;

    product.description = description;

    product.seller = seller;

    product.price = price;

    product.meetingPoint = meetingPoint;

    product.email = email;

    product.image = image;

    product.sellersuid = sellersuid;

    await product.save();

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error updating product:', error);

    res.status(500).json({ success: false, error: 'Failed to update product' });

  }

}

);


// Endpoint to delete a specific product from MongoDB

app.delete('/delete-product/:productId', async (req, res) => {

  try {
    const { productId } = req.params;

    const product = await Product .findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    await Product .deleteOne ({ _id: productId });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error deleting product:', error);

    res.status(500).json({ success: false, error: 'Failed to delete product' });

  }

}

);

//Endpoint to book a product

app.post('/book-product', async (req, res) => {

  try {
    const { productId, buyer } = req.body;

    const product = await Product .findOne({ _id: productId });

    if (!product) { 
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.status = 'sold';

    product.buyer = buyer;

    await product.save();

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error booking product:', error);

    res.status(500).json({ success: false, error: 'Failed to book product' });

  }

}

);


//Endpoint to fetch products by seller

app.get('/products/:sellermail', async (req, res) => {
  try {
    const { sellermail } = req.params;

    const products = await Product .find({ email: sellermail });

    res.status(200).json(products);

  } catch (error) {
    console.error('Error fetching products:', error);

    res.status(500).json({ error: 'Failed to fetch products' });

  }

}

);


//enpoint to convert sold product to available

app.put('/available-product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const product
      = await Product .findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.status = 'available';

    product.buyer = '';

    await product.save();

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error updating product:', error);

    res.status(500).json({ success: false, error: 'Failed to update product' });

  }

}

);





















    // //end point to create slot for doctor
    // app.post('/create-slot', async (req, res) => {
    //   try {
    //     const { doctorName,startTime, endTime } = req.body;
    //     console.log("doctorName",doctorName, "startTime",startTime, "endTime",endTime);


        
    
    //     // Find the doctor document with the doctor name
    //     const doctor = await Doctor.findOne({ name: doctorName });
    //     console.log("doctor",doctor);
        
    
    //     if (!doctor) {
    //       return res.status(404).json({ success: false, error: 'Doctor not found' });
    //     }
    //     console.log("length of availability",doctor.availability.length);
    //     for (let i = 0; i < doctor.availability.length ; i++) {
    //       const timeSlot = doctor.availability[i].timeSlots[0]; // Assuming timeSlots is an array
       
    //       const startTime1 = new Date(timeSlot.startTime);
    //       const endTime1 = new Date(timeSlot.endTime);


    //       const startTime2 = new Date(startTime);
    //       const endTime2 = new Date(endTime);

          
        
    //       console.log("Start Time1:", startTime1, "start time2",startTime2);
    //     // check wether the slot already exists

    //       if (startTime1.getTime() === startTime2.getTime() && endTime1.getTime() === endTime2.getTime()) {
    //         return res.status(400).json({ success: false, error: 'Slot already exists' });
    //       }
        

    //       //checks wether the slot clash with the existing slot that is start time is less than the existing end time and end time is greater than the existing start time 

    //       if ((startTime2.getTime() < endTime1.getTime() && endTime2.getTime() > startTime1.getTime())  ) {
    //         return res.status(400).json({ success: false, error: 'Slot clash with existing slot' });
    //       }



        
    //     }
        
       
    //       // Create a new date with the new time slot
    //       doctor.availability.push({ timeSlots: [{ startTime, endTime, availability: true }] });
        
    
    //     await doctor.save();
    
    //     res.status(200).json({ success: true });
    //   } catch (error) {
    //     console.error('Error creating slot:', error);
    //     res.status(500).json({ success: false, error: 'Failed to create slot' });
    //   }
    // });


    // // Endpoint to fetch available slots for a specific doctor from MongoDB

    // app.get('/get-slots/:doctorName', async (req, res) => {
    //   try {
    //     const { doctorName } = req.params;
    
    //     // Find the doctor document with the doctor name
    //     const doctor = await Doctor.findOne
    //     ({ name: doctorName });

    //     if (!doctor) {
    //       return res.status(404).json({ success: false, error: 'Doctor not found' });
    //     }

    //     //set availability false if the slot time has already passed
    //     for(let i = 0; i < doctor.availability.length; i++){
    //       const timeSlot = doctor.availability[i].timeSlots;
    //       for(let j = 0; j < timeSlot.length; j++){
    //         const slot = timeSlot[j];
    //         const startTime = new Date(slot.startTime);
    //         const endTime = new Date(slot.endTime);
    //         const currentDate = new Date();

    //         if(currentDate.getTime() > startTime.getTime() || currentDate.getTime() > endTime.getTime()){
    //           slot.availability = false;
    //         }
    //       }
    //     }

    //     res.status(200).json(doctor.availability);
    //   } catch (error) {
    //     console.error('Error fetching slots:', error);
    //     res.status(500).json({ error: 'Failed to fetch slots' });
    //   }
    // }
    // );


    // // Endpoint to remove a slot for a specific doctor from MongoDB 

    // app.post('/remove-slot', async (req, res) => {
    //   try {
    //     const { doctorName, startTime, endTime } = req.body;
    
    //     // Find the doctor document with the doctor name
    //     const doctor = await Doctor.findOne
    //     ({ name: doctorName });

    //     if (!doctor) {
    //       return res.status(404).json({ success: false, error: 'Doctor not found' });
    //     }

       
    //  //if the start time and end time matches with the existing start time and end time then remove the slot
    //  for (let i = 0; i < doctor.availability.length ; i++) {
    //   const timeSlot = doctor.availability[i].timeSlots[0]; // Assuming timeSlots is an array

    //   const startTime1 = new Date(timeSlot.startTime);
    //   const endTime1 = new Date(timeSlot.endTime);


    //   const startTime2 = new Date(startTime);
    //   const endTime2 = new Date(endTime);

    //   if (startTime1.getTime() === startTime2.getTime() && endTime1.getTime() === endTime2.getTime()) {
    //     doctor.availability.splice(i, 1);
    //     break;
    //   }
    // }

    //     await doctor.save();

    //     res.status(200).json({ success: true });

    //   } catch (error) {
    //     console.error('Error removing slot:', error);
    //     res.status(500).json({ success: false, error: 'Failed to remove slot' });
    //   }

    // }

    // );




    // // Endpoint to book a slot for a specific doctor from MongoDB

    // app.post('/book-slot', async (req, res) => {

    //   try {

    //     let { doctorName, startTime, endTime, patientName, mode ,meetingLink } = req.body;
    //     console.log("doctorName",doctorName, "startTime",startTime, "endTime",endTime, "patientName",patientName, "mode",mode, "meetingLink",meetingLink)

        
        
    //     // Find the doctor document with the doctor name

    //     const doctor = await Doctor.findOne
    //     ({ name: doctorName });

    //     if (!doctor) {
    //       return res.status(404).json({ success: false, error: 'Doctor not found' });
    //     }

    //     // Find the patient document with the patient name

    //     const patient = await Patient
    //     .findOne({ name: patientName });

    //     if (!patient) {
    //       return res.status(404).json({ success: false, error: 'Patient not found' });
    //     }

    //      // Find the date with the specified start and end times

    //      for (let i = 0; i < doctor.availability.length ; i++) {  
    //       const timeSlot = doctor.availability[i].timeSlots; // Assuming timeSlots is an array
       

    //       for(let j = 0; j < timeSlot.length; j++){
    //         const slot = timeSlot[j];
        
    //         const startTime1 = new Date(slot.startTime).toLocaleString();
    //         console.log("startTime1",startTime1);
    //         const endTime1 = new Date(slot.endTime).toLocaleString();
    //         console.log("endTime1",endTime1);

    //         const startTime2 = new Date(startTime).toLocaleString();
    //         console.log("startTime2",startTime2);
    //         const endTime2 = new Date(endTime).toLocaleString();
    //         console.log("endTime2",endTime2);

    //         if (startTime1 === startTime2 && endTime1 === endTime2) {
    //           console.log("slot available",slot.availability);
    //           if (!slot.availability) {
    //             return res.status(400).json({ success: false, error: 'Slot is not available' });
    //           }
    //           slot.availability = false;
    //           break;
    //         }
    //       }
    //     }


        





        



      





    //       // Update the doctor's document to save patient details 

    //       //if mode is online then save the meeting link else save the mode as offline 

    //       if(mode === 'online'){
    //        //set meeting link with unique id for each meeting
    //        const meetingLink = generator.generate({
    //         length: 6,
    //         numbers: true,
    //         uppercase: true,
    //         symbols: false,
    //       });
    //       //upate the number of online appointments for the doctor
    //       doctor.numberofonlineAppointments = doctor. numberofonlineAppointments + 1;

    //       doctor.appointment.push({ patientName, bookedSlot: {  startTime, endTime }, status: 'booked', mode: 'online', meetingLink });
    //       patient.appointments.push({ doctorName, bookedSlot: {  startTime, endTime }, status: 'booked', mode: 'online', meetingLink });

    //       }
    //       else{
    //         //upate the number of offline appointments for the doctor
    //         doctor.numberofofflineAppointments = doctor. numberofofflineAppointments + 1;
    //         doctor.appointment.push({ patientName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });
    //         patient.appointments.push({ doctorName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });

    //       }

    //       await doctor.save();

    //       await patient.save();


    //       //upate the patient details in the patient collection

       

         



    //       res.status(200).json({ success: true });


    //   } catch (error) {

    //     console.error('Error booking slot:', error);

    //     res.status(500).json({ success: false, error: 'Failed to book slot' });

    //   }

      

    // }
      
    //   );

    //   // Endpoint to fetch booked slots for a specific doctor from MongoDB

    //   app.get('/booked-slots/:doctorName', async (req, res) => {

    //     try {
            
    //         const { doctorName } = req.params;
  
    //         // Find the doctor document with the doctor name
  
    //         const doctor = await Doctor.findOne
    //         ({ name: doctorName });

    //         if (!doctor) {
    //           return res.status(404).json({ success: false, error: 'Doctor not found' });
    //         }

    //         res.status(200).json(doctor.appointment);

    //     } catch (error) {
            
    //           console.error('Error fetching booked slots:', error);
  
    //           res.status(500).json({ error: 'Failed to fetch booked slots' });
  
    //       }

    //   }
        
    //     );


    //     // Endpoint to fetch booked slots for a specific patient from MongoDB

    //     app.get('/booked-slots-patient/:patientName', async (req, res) => {

    //       try {
              
    //           const { patientName } = req.params;
    
    //           // Find the patient document with the patient name
    
    //           const patient = await Patient.findOne
    //           ({ name: patientName });

    //           if (!patient) {
    //             return res.status(404).json({ success: false, error: 'Patient not found' });
    //           }

    //           res.status(200).json(patient.appointments);

    //       } catch (error) {
              
    //             console.error('Error fetching booked slots:', error);
    
    //             res.status(500).json({ error: 'Failed to fetch booked slots' });
    
    //         }

    //     }
            
    //         );





    //     // Endpoint to cancel a booked slot for a specific doctor from MongoDB

    //     app.post('/cancel-slot', async (req, res) => {

    //       try {

    //         const { doctorName, date, startTime, endTime, patientName } = req.body;


    //         // Find the doctor document with the doctor name

    //         const doctor = await Doctor.findOne
    //         ({ name: doctorName });

    //         if (!doctor) {
    //           return res.status(404).json({ success: false, error: 'Doctor not found' });
    //         }

    //         // Find the date with the specified date

    //         const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());

    //         if (!existingDate) {
    //           return res.status(404).json({ success: false, error: 'Date not found' });
    //         }


    //         // Find the time slot with the specified start and end times

    //         const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);

    //         if (!existingSlot) {
    //           return res.status(404).json({ success: false, error: 'Slot not found' });
    //         }

    //         // Check if the slot is already booked

    //         if (existingSlot.availability) {
    //           return res.status(400).json({ success: false, error: 'Slot is not booked' });
    //         }

    //         // Update the slot to mark it as available

    //         existingSlot.availability = true;

    //         // Find the patient document with the patient name

    //         const patient = await Patient
    //         .findOne({ name: patientName });

    //         if (!patient) {
    //           return res.status(404).json({ success: false, error: 'Patient not found' });
    //         }

    //         // Remove the appointment from the doctor's document

    //         doctor.appointment = doctor.appointment.filter(appointment => appointment.patientName !== patientName);

    //         // Remove the appointment from the patient's document

    //         patient.appointments = patient.appointments.filter(appointment => appointment.doctorName !== doctorName);

    //         await doctor.save();


    //         await patient.save();

    //         res.status(200).json({ success: true });

    //       } catch (error) {

    //         console.error('Error canceling slot:', error);

    //         res.status(500).json({ success: false, error: 'Failed to cancel slot' });

    //       }

    //     }



    //     );


    //     //end point to save clinic details in MongoDB

   

    //     app.post('/save-clinic/:id', async (req, res) => {
    //       try {
    //         const { name, location } = req.body;
    //         const { id } = req.params;
    //         let totalAppointments = 0;
    //         let totalOnlineAppointments = 0;
    //         let totalOfflineAppointments = 0;

        
    //         // Create a new Clinic document
    //         const clinic = new Clinic({
    //           name,
    //           location,
    //           id,
    //           totalAppointments,
    //           totalOnlineAppointments,
    //           totalOfflineAppointments,

    //         });
        
    //         await clinic.save();
        
    //         res.status(200).json({ success: true });
    //       } catch (error) {
    //         console.error('Error saving clinic details:', error);
    //         res.status(500).json({ success: false, error: 'Failed to save clinic details' });
    //       }
    //     }
    //     );


    //     // Endpoint to fetch the clinic details from MongoDB

    //     app.get('/clinics/:uid', async (req, res) => {
    //       try {
    //         uid = req.params.uid;
    //         const clinic = await Clinic.findOne({id: uid });

    //         if (!clinic) {
    //           return res.status(404).json({ success: false, error: 'Clinic not found' });
    //         }

    //         res.status(200).json(clinic);
          
    //       } catch (error) {
    //         console.error('Error fetching clinics:', error);
    //         res.status(500).json({ error: 'Failed to fetch clinics' });
    //       }
    //     }


    //     );



    //     //End point to fetch details about a specific doctor from MongoDB

    //     app.get('/doctor/:doctorName', async (req, res) => {
    //       try {
    //         const { doctorName } = req.params;


    //         // Find the doctor document with the doctor name

    //         const doctor = await Doctor.findOne({ name: doctorName });

    //         if (!doctor) {
    //           return res.status(404).json({ success: false, error: 'Doctor not found' });
    //         }

    //         res.status(200).json(doctor);

    //       } catch (error) {

    //           console.error('Error fetching doctor:', error);

    //           res.status(500).json({ error: 'Failed to fetch doctor' });

    //         }

    //     }
        
    //     );





    //     //end point to fetch doctors for a specific clinic from MongoDB

    //     app.get('/doctors/:clinicId', async (req, res) => {

    //       try {

    //         const { clinicId } = req.params;

    //         // Find the doctor document with the clinic ID

    //         const doctors = await Doctor.find({ clinicId });

    //         if (!doctors) {
    //           return res.status(404).json({ success: false, error: 'Doctors not found' });
    //         }

    //         res.status(200).json(doctors);

    //       } catch (error) {
              
    //           console.error('Error fetching doctors:', error);
  
    //           res.status(500).json({ error: 'Failed to fetch doctors' });
  
    //         }



    //     }

    //   );


    // //endpoint to remove doctor from clinic and remove mail from firebase

    // app.delete('/remove-doctors/:doctorId', async (req, res) => {

    //   try {
          
    //       const { doctorId } = req.params;

          
  
    //       // Find the doctor document with the doctor ID
          
    //       const doctor = await Doctor.findOne({ _id: doctorId });

          



    //       if (!doctor) {
    //         return res.status(404).json({ success: false, error: 'Doctor not found' });
    //       }

    //       // Find the clinic document with the clinic ID

    //       const clinic = await Clinic.findOne({email: doctor.email});

    //       if (!clinic) {
    //         return res.status(404).json({ success: false, error: 'Clinic not found' });
    //       }

    //       // Remove the doctor from the clinic

    //       clinic.doctors = clinic.doctors.filter(doc => doc.toString() !== doctorId);

    //       await clinic.save();

    //       // Delete the doctor document

    //       await Doctor.deleteOne({ _id: doctorId });




    //       // Delete the doctor from firebase
    //       console.log('doctor.institutionalEmail', );

    //       admin.auth().getUserByEmail(doctor.institutionalEmail)
    //       .then((userRecord) => {
    //         // User found, delete user
    //         return admin.auth().deleteUser(userRecord.uid);
    //       })
    //       .then(() => {
    //         console.log(`Successfully deleted user with email: ${email}`);
    //       })
    //       .catch((error) => {
    //         console.error('Error deleting user:', error);
    //       });

    //       res.status(200).json({ success: true });


    //   } catch (error) {

    //       console.error('Error removing doctor:', error);

    //       res.status(500).json({ success: false, error: 'Failed to remove doctor' });

    //   }

    // }
      
    //   );












  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



