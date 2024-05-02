import React, { useState, useEffect } from 'react';
import { Box, Select, Button, VStack, Text, HStack, Grid, Image, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { MdError } from 'react-icons/md';

import ticketbg from '../../../assets/th.png';

function Bus() {
  const [buses, setBuses] = useState([]);
  const [route, setRoute] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [busDetails, setBusDetails] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seat, setSeat] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [userhaspass, setUserhaspass] = useState(false);


  useEffect(() => {
    async function fetchBuses() {
      try {
        const response = await axios.get('https://aidify.onrender.com/get-buses');
        console.log("response ",response)


        //filter bus with availiable as true
        const availiablebuses = response.data[0].busDetails.filter((bus) => bus.availiable === true);
        console.log("availiablebuses",availiablebuses)
        setBuses(availiablebuses);
      

        const busdata = response.data[0].busDetails;
        const route = [...new Set(busdata.map((bus) => bus.route))];
        setRoute(route);

        // Check if user has bus pass
        const data = localStorage.getItem('authData');
        var email = JSON.parse(data).email;
        console.log("email",email)
        const userdata  = response.data[0].users;
        console.log("userdata",userdata )
        const user = userdata.find((user) => user.email === email);
        console.log("user",user)
        if (user) {
          console.log('User has bus pass');
          setUserhaspass(true);
        }

        console.log(userhaspass);






      } catch (error) {
        
        console.error('Error fetching buses:', error);
      }
      
      
    }
    fetchBuses();
    
  }, []);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    const selectedBus = buses.filter((bus) => bus.route === event.target.value);
    setBusDetails(selectedBus);
  };


  const [showseat, setShowseat] = useState(false);
  const handleBusSelect = (bus) => {
    setSelectedBus(bus);

    setSeat(bus.seats);

    setShowseat(!showseat);
  };

  const handleBooking = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.post('https://aidify.onrender.com/book-seat', {
        busId: selectedBus._id,
        seatNo: selectedSeat.seatNo,
        email: email
      });
      console.log(response.data);
      console.log("email",email);
      setIsBookingSuccess(true);
      // Generate and display image with seat and email details
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Error booking seat. Please try again later.');
    }
  };

  const handleDownloadImage = () => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 1000; // Adjust as needed
    canvas.height = 500; // Adjust as needed

  // Create a new image element for the background image
  const backgroundImage = document.createElement('img');
  backgroundImage.crossOrigin = 'Anonymous';
    // Set the source of the background image
    backgroundImage.src = ticketbg; // Replace with the path to your background image

    // Once the background image has loaded, draw it onto the canvas
    backgroundImage.onload = () => {
        // Draw the background image onto the canvas
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Set font size and style
        const fontSize = 20; // Custom font size
        ctx.font = `${fontSize}px Arial`; // Set font family and size
        ctx.fillStyle = '#000'; // Set text color

        //today's date
        var today = new Date().toDateString();

        // Generate text dynamically
        const seatNumber = `Seat number ${selectedSeat.seatNo} on ${timesection === 'Morning' ? 'the bus departing at ' + selectedBus.starttime : 'the bus returning at ' + selectedBus.returntime}`;
        const bookingInfo = `Booked by ${localStorage.getItem('username')} on ${today}.`;
        
        const text = `${seatNumber}\n${bookingInfo}`;
        
        // Calculate text width and position
        const textWidth = ctx.measureText(text).width;
        const textX = (canvas.width - textWidth) / 2; // Center text horizontally
        const textY = canvas.height / 2; // Center text vertically

        // Draw text on canvas
        ctx.fillText(text, textX, textY);

        // Convert canvas to data URL
        const imageUrl = canvas.toDataURL('image/png');

        // Create a link element to download the image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'bus_ticket.png';

        // Append link to body and trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };
};




const [timesection, setTimesection] = useState('');

   
    useEffect(() => {
     

      const handleSeatAvailablity = async () => {
        try{
          const res = await axios.put('https://aidify.onrender.com/refresh-seats');
          console.log(res.data);

        }catch(error){
          console.error('Error removing booked seats:', error);



        }
      }
      handleSeatAvailablity();
    }
    ,[timesection])



    //handle time selection

   
    const handletimesection = (event) => {
      setTimesection(event.target.value);
      console.log("timesection",event.target.value)

      //declare a variable to store the time if the section is morning set the time to start time else set the time to return time

      var time = '';

      if(event.target.value === 'morning'){
     //retrive the bus details with route with the selected route 
      const bus = buses.find((bus) => bus.route === selectedRoute);
    

      }
      else{
       

        

       
       
      }
      console.log("inside timesection",busDetails)

     
    };

    const username = localStorage.getItem('username');
    console.log("username",username)



  return (
    userhaspass ? (
    <Box pl={150} pt={50} minHeight="280px" paddingBottom="30px">
      <Heading as="h1" size="xl" mb="20px">
        College Bus Seat Reservation
      </Heading>
      <Select id="time" mb="20px" placeholder="Select Time" value={timesection} onChange={handletimesection}>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </Select>
    
      <Select placeholder="Select Route" onChange={handleRouteChange}>
        {route.map((route) => (
          <option key={route} value={route}>
            {route}
          </option>
        ))}
      </Select>

     
      

      <VStack mt={4} spacing={4}>
        {busDetails.map((bus) => (
          <Box key={bus._id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Bus Name/No: {bus.busNo}</Text>
            {/*if selcted timesection is morning show the start time else show the return time */}
            <Text fontSize="lg" fontWeight="bold" mb={2}>Time: {timesection === 'Morning' ? bus.starttime : bus.returntime}</Text>
            <Grid templateColumns={`repeat(${Math.ceil(Math.sqrt(bus.seats.length))}, 1fr)`} gap={2} mt={4}>
            <Button onClick={() => handleBusSelect(bus)} bg={selectedBus === bus ? "blue.500" : "gray.100"} color={selectedBus === bus ? "white" : "gray.800"} _hover={{ bg: selectedBus === bus ? "blue.600" : "gray.200" }} cursor="pointer">
                Select Seat
              </Button>

              {showseat && selectedBus === bus && bus.seats.map((seat) => (
             
                <Button
                  key={seat.seatNo}
                  bg={seat.isBooked ? "gray.300" : selectedSeat === seat ? "blue.500" : "gray.100"}
                  color={seat.isBooked ? "red" : "green"}
                  _hover={!seat.isBooked && { bg: "gray.200" }}
                  cursor={seat.isBooked ? "not-allowed" : "pointer"}
                  onClick={() => setSelectedSeat(seat)}
                >
                  {seat.seatNo}
                </Button>
              ))}
            </Grid>
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="green" onClick={handleBooking} disabled={!selectedSeat}>Book Seat</Button>
      {isBookingSuccess && selectedSeat && (
        <Box mt={4}>
          <Button colorScheme="blue" onClick={handleDownloadImage}>Download Ticket</Button>
        </Box>
      )}
    </Box>
    
  ) : (

   
    <Box h={'80vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} bg={'bg'}>
      <MdError size={50} color={'red'} />
      <Text fontSize="xl" textAlign="center">You do not have a bus pass. Please contact the admin to get a bus pass.</Text>
    </Box>

    
  )
  );



}

export default Bus;
