import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Heading } from '@chakra-ui/react';

function Bus() {

  const [bus, setBus] = useState('');
  const [time, setTime] = useState('');
  const [route, setRoute] = useState('');

  const handleBook = () => {

    console.log("Sending booked bus details to admin:", { route, time, bus });
    
  };


  const buses = {
    Kannur: {
      Morning: ["Bus No 4 (8:10 AM)", "Bus No 5  (8:15 AM)", "Bus No 3  (8:20 AM)"],
      Evening: ["Bus No 4  (4:35 PM)", "Bus No 5  (4:40 PM)", "Bus No 3  (4:45 PM)"]
    },
    Thalassery: {
      Morning: ["Anvitha (8:55 AM)", "Amritham (9:00 AM)"],
      Evening: ["Anvitha (4:47 PM)", "Amritham (4:50 PM)"]
    },
    MeleChovva: {
        Morning: ["Bus No 6 (8:17 AM)"],
        Evening: ["Bus No 6 (4:45 PM)"]
    },
    Chalode: {
        Morning: ["Bus No 1 (8:35 AM)"],
        Evening: ["Bus No 1 (4:45 PM)"]
    },
    Mattanur: {
        Morning: ["Bus No 2 (8:35 AM)"],
        Evening: ["Bus No 2 (4:45 PM)"]
    },
  };

  return (
    <Box p={4} ml="10%" w="80%">
      <Heading as="h1" size="xl" mb="20px">Reserve Your College Bus Seat</Heading>

      <FormControl mt={4}>
          <FormLabel>Time</FormLabel>
          <Select placeholder="Select time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </Select>
        </FormControl>

      <FormControl mt={4}>
        <FormLabel>Route</FormLabel>
        <Select placeholder="Select Route" value={route} onChange={(e) => setRoute(e.target.value)}>
          <option value="Kannur">Kannur</option>
          <option value="Thalassery">Thalassery</option>
          <option value="MeleChovva">MeleChovva</option>
          <option value="Chalode">Chalode</option>
          <option value="Mattanur">Mattanur</option>
        </Select>
      </FormControl>

        

      {time && route && (
        <FormControl mt={4}>
          <FormLabel>Bus</FormLabel>
          <Select placeholder="Select Bus" value={bus} onChange={(e) => setBus(e.target.value)}>
            {buses[route][time].map((routeOption, index) => (
              <option key={index} value={routeOption}>{routeOption}</option>
            ))}
          </Select>
        </FormControl>
      )}

      <Button mt={4} colorScheme="blue" onClick={handleBook} disabled={!location || !time || !route}>Book Bus</Button>
    </Box>
  );
}

export default Bus;
