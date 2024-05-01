const mongoose = require('mongoose');

// Define the bus schema


// Define schema for bus with route time and bus number
const busDetails = new mongoose.Schema({
  route: {
      type: String,
      required: true
  },
  starttime : {
      type : String,
      required : true
  },
  returntime : {
      type : String,
      required : true
  },

 
  busNo: {
      type: String,
      required: true
  },
  availiable:{
     type :Boolean,
      default : true
  },
  seats: [{
      seatNo: {
          type: String,
          required: true
      },
      isBooked: {
          type: Boolean,
          default: false
      },
      bookedBy: {
          type: String,
          default: null
      }
  }]
});





const busSchema = new mongoose.Schema({

    //add a array of email who have bus pass 

    users: [{
       email : {
           type: String,
           required: true
       },
        validity: {
            type: String,
            required: true
        },
      }],
      

       busDetails: [busDetails] // Embed the busDetails schema as a field


   



   
   
});




// Create the Bus model

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
