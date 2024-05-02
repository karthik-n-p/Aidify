
const express = require('express');
//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

const axios = require('axios');
//Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.
const cors = require('cors');

const logger = require('winston');

const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production'){   require('dotenv').config();
}


//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express();
const port = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
require('dotenv').config();


const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create upload middleware
const upload = multer({ storage: storage });



mongoose.connect(process.env.MONGODB_URI,)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));







var generator = require('generate-password');

    //Admin Firebase
    const admin = require('firebase-admin');

   const serviceAccount = {
      "type": process.env.type,
      "project_id": process.env.project_id,
      "private_key_id": process.env.private_key_id,
      "private_key": process.env.private_key.replace(/\\n/g, '\n'),
      "client_email": process.env.client_email,
      "client_id": process.env.client_id,
      "auth_uri": process.env.auth_uri,
      "token_uri": process.env.token_uri,
      "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
      "client_x509_cert_url": process.env.client_x509_cert_url,
      "universe_domain": process.env.universe_domain



   }
 
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





// const Patient = require('./models/Student');











//     const Doctor = require('./models/Bus');
// const Clinic = require('./models/clinic');
   
    // Endpoint to save doctor details in MongoDB





const Product = require('./models/Store');


// Endpoint to save product details in MongoDB

app.post('/save-product', upload.array('attachments', 5), async (req, res) => {
  try {
    const { title, description, seller, price, meetingPoint, email, image, sellersuid } = req.body;

    //upload.array('attachments', 5) is used to upload multiple files with the same name 'attachments' and maximum 5 files can be uploaded
    //req.files contains the uploaded files and req.body contains the text data

    // Create array to store attachment details
    const attachments = req.files.map(file => {
      return {
        filename: file.originalname,
        path: file.path, // Save the file path
        size: file.size,
        mimetype: file.mimetype
      };
    });

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
      attachments,
    });


    console.log("seller ",seller);

    await product.save();


    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error saving product details:', error);

    res.status(500).json({ success: false, error: 'Failed to save product details' });

  }

}

);





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

//endpoint to revert the status of the product to available

app.put('/revert-product', async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("productId",productId);

    const product = await Product .findOne({ _id: productId });

    console.log("product",product);

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


//Endpoint to save grievance details in MongoDB for students it will contain files as attachments

const Grievance = require('./models/Grievance');

app.post('/save-grievance', upload.array('attachments', 5), async (req, res) => {
  try {
    //upload.array('attachments', 5) is used to upload multiple files with the same name 'attachments' and maximum 5 files can be uploaded
    //req.files contains the uploaded files and req.body contains the text data

   

    


    const { type, description, Subject, Date, username } = req.body;

    //save the uploaded in backend folder and save the path in the database

 // Create array to store attachment details
 const attachments = req.files.map(file => {
  return {
    filename: file.originalname,
    path: file.path, // Save the file path
    size: file.size,
    mimetype: file.mimetype
  };
});












  









    // Create a new Grievance document
    const grievance = new Grievance({
      type,
      description,
      Subject,
      Date,
      username,
      attachments,
    });


    await grievance.save();

    res.status(200).json({ success: true });


  } catch (error) {
    console.error('Error saving grievance details:', error);

    res.status(500).json({ success: false, error: 'Failed to save grievance details' });

  }

}

);



app.get('/grievances', async (req, res) => {

  try {
    const grievances = await Grievance.find();

    res.status(200).json(grievances);

  } catch (error) {
    console.error('Error fetching grievances:', error);

    res.status(500).json({ error: 'Failed to fetch grievances' });

  }

}

);



app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Serve the file
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});


//Endpoint to fetch a specific grievance from MongoDB

app.get('/grievance/:grievanceId', async (req, res) => {
  try {

    const { grievanceId } = req.params;

    const grievance = await Grievance.findOne({ _id: grievanceId });


    if (!grievance) {
      return res.status(404).json({ success: false, error: 'Grievance not found' });
    }

    res.status(200).json(grievance);

  } catch (error) {
    console.error('Error fetching grievance:', error);

    res.status(500).json({ error: 'Failed to fetch grievance' });

  }

}

);



//Endpoint to give response to a specific grievance from MongoDB

app.put('/respond-grievance/:grievanceId', async (req, res) => {
  try {
    const { grievanceId } = req.params;
    const { response } = req.body;

    console.log("response",response);
    console.log("grievanceId",grievanceId);

    const grievance = await Grievance.findOne({ _id: grievanceId });
    console.log("grievance",grievance);

    if (!grievance) {
      return res.status(404).json({ success: false, error: 'Grievance not found' });
    }

    grievance.response = response;

    grievance.status = 'resolved';

    await grievance.save();

    res.status(200).json({ success: true });

  } catch (error) {

    console.error('Error responding to grievance:', error);

    res.status(500).json({ success: false, error: 'Failed to respond to grievance' });

  }

}

);

//sample json file to test the api in postman

// {
//   "response": "Response 1"
// }




const Bus = require('./models/Bus');

// Endpoint to save users with bus pass
app.post('/bus-add-user', async (req, res) => {
  try {
    const { email, validity } = req.body;

    // Find the existing bus document
    const bus = await Bus.findOne();

    // If no bus document exists, create a new one with the user
    if (!bus) {
      const newBus = new Bus({
        users: [{ email, validity }]
      });
      await newBus.save();
    } else {
      // If bus document exists, push the new user into the existing users array
      bus.users.push({ email, validity });
      await bus.save();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ success: false, error: 'Failed to save user details' });
  }
});


//fetch registered users with bus pass

app.get('/bus-users', async (req, res) => {
  try {
    const bus = await Bus.find();

    const users = bus.map(bus => bus.users).flat();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
);


//endpoint to delete a specific user automatically when the validity of the bus pass is expired

app.delete('/delete-user', async (req, res) => {

  try {

    const bus = await Bus.findOne();

    // Select users array from the bus document

    bus.users = bus.users.filter(user => {
      // Check if the user's validity is expired
      const currentDate = new Date();
      const validityDate = new Date(user.validity);

      return currentDate.getTime() < validityDate.getTime();
    }
    );

    await bus.save();

    res.status(200).json({ success: true });

  } catch (error) {
      
      console.error('Error deleting user:', error);
  
      res.status(500).json({ success: false, error: 'Failed to delete user' });
  
    }

}

);


//END POINT TO BOOK A SEAT IN THE BUS

app.post('/book-seat', async (req, res) => {

  try {
    const { busId, seatNo, email } = req.body;
    console.log("busId",busId, "seatNo",seatNo, "email",email);

    const bus = await Bus.findOne();

    // Select busdetails array from the bus document and update the seat with the busId

    bus.busDetails = bus.busDetails.map(bus => {

      if (bus._id == busId) {

        // Select seats array from the bus details

        bus.seats = bus.seats.map(seat => {

          if (seat.seatNo == seatNo) {

            seat.isBooked = true;

            seat.bookedBy = email;

          }

          return seat;

        });

      }

      return bus;

    });

    await bus.save();

    res.status(200).json({ success: true });

  } catch (error) {

    console.error('Error booking seat:', error);

    res.status(500).json({ success: false, error: 'Failed to book seat' });

  }

}

);


//END POINT TO refresh booked seats in the bus when a day is passed

app.put('/refresh-seats', async (req, res) => {

  try {

    const bus = await Bus.findOne();

    //refresh the booked seats in the bus when a day is passed to false and bookedBy to null at 12 am and 12 pm

     const currentDate = new Date();
     console.log("currentDate",currentDate.getHours(),currentDate.getMinutes(),currentDate.getSeconds());


    if (currentDate.getHours() == 0 && currentDate.getMinutes() == 0 || currentDate.getHours() == 12 && currentDate.getMinutes() == 0 && currentDate.getSeconds() == 0) {

      bus.busDetails = bus.busDetails.map(bus => {

        bus.seats = bus.seats.map(seat => {

          seat.isBooked = false;

          seat.bookedBy = null;

          return seat;

        });

        return bus;

      });
      await bus.save(); 

    }


   


   

  

    res.status(200).json({ success: true });

  } catch (error) {

    console.error('Error refreshing seats:', error);

    res.status(500).json({ success: false, error: 'Failed to refresh seats' });

  }


}

);

















//sample json file to test the api in postman with email knp5826@gmail.com and validity date

// {
//   "email": "knp5826@gmail.com"
//   "validity": "Date 1"
// }



//endpoint to save bus details in MongoDB

app.post('/save-bus', async (req, res) => {
  try {
    const { busNo, route,starttime, returntime,capacity} = req.body;

    console.log("busNo",busNo, "route",route, "starttime",starttime, "returntime",returntime, "capacity",capacity);


    //find the existing bus document
    const bus = await Bus.findOne();


    console.log("bus",bus);

    //if no bus document exists, create a new one with the bus details
    if (!bus) {
      const newBus = new Bus({
        busDetails: [{ busNo, route, starttime, returntime, capacity }]
      });
      await newBus.save();
    } else {
      //if bus document exists, push the new bus details into the existing bus details array
      //create a array of seats in the bus with isBooked as false and bookedBy as null
      seats=[];
      for(let i = 1; i <= capacity; i++){
        seats.push({ seatNo: i, isBooked: false, bookedBy: null });
       
      }


      bus.busDetails.push({ busNo, route, starttime, returntime, capacity,seats });
   
      await bus.save();
    }

    //for seats in the bus we can create a loop to add the seats in the bus with isBooked as false and bookedBy as null

   


    
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error saving bus details:', error);

    res.status(500).json({ success: false, error: 'Failed to save bus details' });

  }

}

);



//end point to fetch all buses from MongoDB

app.get('/get-buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    console.log("buses= ",buses);

    res.status(200).json(buses);

  } catch (error) {
    console.error('Error fetching buses:', error);

    res.status(500).json({ error: 'Failed to fetch buses' });

  }

}

);


//end point to delete a specific bus from MongoDB

app.delete('/delete-bus/:busId', async (req, res) => {

  try {
    const { busId } = req.params;
    console.log("busId",busId);

    const bus = await Bus.findOne();

    console.log("bus",bus);

    //select busdetails array from the bus document and delete the bus with the busId

    bus.busDetails = bus.busDetails.filter(bus => bus._id != busId);

    await bus.save();

    res.status(200).json({ success: true });




  } catch (error) {

    console.error('Error deleting bus:', error);

    res.status(500).json({ success: false, error: 'Failed to delete bus' });

  }

}

);


//end point to mark unavailable a spefic bus from MongoDB

app.put('/mark-unavailable/:busId', async (req, res) => {

  try {
    const { busId } = req.params;

    const bus = await Bus.findOne();

    //select busdetails array from the bus document and update the status of the bus with the busId to unavailable

    bus.busDetails = bus.busDetails.map(bus => {

      if (bus._id == busId) {
       //toogle the availiability of the bus
        bus.availiable = !bus.availiable;
      }

      return bus;

    });

    await bus.save();

    res.status(200).json({ success: true });

  } catch (error) {

    console.error('Error marking bus unavailable:', error);

    res.status(500).json({ success: false, error: 'Failed to mark bus unavailable' });

  }

}

);


//end point to edit a specific bus from MongoDB

app.put('/edit-bus/:busId', async (req, res) => {

  try {
    const { busId } = req.params;
    const { busNo, route, starttime, returntime, capacity } = req.body;

    const bus = await Bus.findOne();

    //select busdetails array from the bus document and update the bus with the busId

    bus.busDetails = bus.busDetails.map(bus => {

      if (bus._id == busId) {

        bus.busNo = busNo;

        bus.route = route;

        bus.starttime = starttime;

        bus.returntime = returntime;

        bus.capacity = capacity;

      }

      return bus;

    });

    await bus.save();

    res.status(200).json({ success: true });

  } catch (error) {

    console.error('Error updating bus:', error);

    res.status(500).json({ success: false, error: 'Failed to update bus' });

  }

}

);








  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
   
  });



