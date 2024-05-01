import React, { useState, useEffect } from 'react';
import { Box, Select, Button, VStack, Text, HStack, Grid, Image, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { MdError } from 'react-icons/md';

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
        const response = await axios.get('http://localhost:3000/get-buses');
        console.log("response ",response)
        setBuses(response.data[0].busDetails);


        const busdata = response.data[0].busDetails;
        const route = [...new Set(busdata.map((bus) => bus.route))];
        setRoute(route);

        // Check if user has bus pass
        const data = localStorage.getItem('authData');
        const email = JSON.parse(data).email;
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
      const response = await axios.post('http://localhost:3000/book-seat', {
        busId: selectedBus._id,
        seatNo: selectedSeat.seatNo,
        email: email
      });
      console.log(response.data);
      setIsBookingSuccess(true);
      // Generate and display image with seat and email details
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Error booking seat. Please try again later.');
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = `https://via.placeholder.com/300?text=Seat+${selectedSeat.seatNo}+on+Bus+No/Name+${selectedBus.busNo}+Booked+by+${localStorage.getItem('email')}`;
    link.download = 'bus_ticket.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




    //automatically set availiablity of seat isbooked to flase after 12 am

    useEffect(() => {

      const handleSeatAvailablity = async () => {
        try{
          const res = await axios.put('http://localhost:3000/refresh-seats');
          console.log(res.data);

        }catch(error){
          console.error('Error removing booked seats:', error);



        }
      }
      handleSeatAvailablity();
    }
    ,[buses]);


  return (
    userhaspass ? (
    <Box pl={150} pt={50} minHeight="300px">
      <Heading as="h1" size="xl" mb="20px">
        College Bus Seat Reservation
      </Heading>
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
            <Text>Start Time: {bus.starttime}</Text>
            <Text>Return Time: {bus.returntime}</Text>
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
