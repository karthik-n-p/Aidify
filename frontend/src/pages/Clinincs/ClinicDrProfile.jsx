import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { auth } from '../UserPages/firebase-auth';
import { useParams } from 'react-router-dom';


function ClinicDrProfile() {
  const [doctors, setDoctors] = useState([]);
  const uid = auth.currentUser ? auth.currentUser.uid : null;

  const {name} = useParams();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
       
        const response = await axios.get(`http://localhost:3000/doctors/${uid}`);
        console.log(response.data);
        console.log(uid);
        //filtering the data to get the doctor with the name in the url

        setDoctors(response.data.filter((doctor) => doctor.name === name));
        
  
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleRemoveDoctor = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:3000/remove-doctors/${doctorId}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  return (
    <VStack bg={'bg'} w={'100%'} h={'80vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} pl={150}>
      <Heading size="lg" mb={4}>Clinic Doctors</Heading>
      <Grid  gap={4} bg={'gray.100'} borderRadius={'md'}>
        {doctors.map((doctor) => (
          <Box key={doctor._id} borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="md" mb={2}>{doctor.name}</Heading>
            <Text mb={2}>Specialization: {doctor.specialization}</Text>
            <Text mb={2}>Role: {doctor.role}</Text>
            <Text mb={2}>Experience: {doctor.experience}</Text>
            <Text mb={2}>Description: {doctor.description}</Text>
            <Text mb={2}>Number of Appointments: {doctor.numberofAppointments}</Text>
            <Text mb={2}>Number of Offline Appointments: {doctor.numberofofflineAppointments}</Text>
            <Text mb={2}>Number of Online Appointments: {doctor.numberofonlineAppointments}</Text>
            <Button colorScheme="red" onClick={() => handleRemoveDoctor(doctor._id)}>Remove Doctor</Button>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
}

export default ClinicDrProfile;
