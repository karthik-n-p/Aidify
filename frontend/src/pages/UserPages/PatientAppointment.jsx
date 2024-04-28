import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { Box, Button, Input, Select, Text, VStack,HStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

function PatientAppointment() {
    const {name} = useParams();
    const navigate = useNavigate();
    const [pastAppointment, setPastAppointments] = useState([]);
    const [liveAppointment, setPresentAppointments] = useState([]);
    const [futureAppointment, setFutureAppointments] = useState([]);
  


    React.useEffect(() => {
        


    const fetchPatients = async () => {
        try {
          const patientsCollection = await axios.get(`http://localhost:3000/past-appointments-patient/${name}`);
          //divide futrue array into 2 arrays first 4 and last 4 and combine them as array of arrays
          console.log("patientsCollection",patientsCollection.data);
    
    
          if(patientsCollection.data.FutureAppiontments.length > 0){
        //   let future1 = patientsCollection.data.FutureAppiontments.slice(0,4);
        //   let future2 = patientsCollection.data.FutureAppiontments.slice(4,8);
        //   console.log("future",future1);
        //   console.log("future2",future2);
    
        //   const future = [future1,future2];
        //   console.log("future",future);
        //  setFutureAppointments(future);
    
        //divide future appointmetns into slices of 4 and combine them as array of arrays by dividing total length by 4
    
        let future = [];
        let i,j,temparray,chunk = 4;
        for (i=0,j=patientsCollection.data.FutureAppiontments.length; i<j; i+=chunk) {
            temparray = patientsCollection.data.FutureAppiontments.slice(i,i+chunk);
            future.push(temparray);
    
        }
        console.log("future",future);
        setFutureAppointments(future);
     
    
          }
    
    
    
          if(patientsCollection.data.LiveAppointments.length > 0){
            let live = [];
            let i,j,temparray,chunk = 4;
            for (i=0,j=patientsCollection.data.LiveAppointments.length; i<j; i+=chunk) {
                temparray = patientsCollection.data.LiveAppointments.slice(i,i+chunk);
                live.push(temparray);
        
            }
            console.log("live",live);
            setPresentAppointments(live);
        
    
        }
          
    
    
    
    
          if(patientsCollection.data.pastAppointmetns.length > 0)
          {
          let past = [];
          let i,j,temparray,chunk = 4;
          for (i=0,j=patientsCollection.data.pastAppointmetns.length; i<j; i+=chunk) {
              temparray = patientsCollection.data.pastAppointmetns.slice(i,i+chunk);
              past.push(temparray);
          }
          console.log("past",past);
          setPastAppointments(past);
    
    
    
    
         
    
          }
    
    
          
    
    
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };

    fetchPatients();
    
  
    }, [])

    
  const consult = (patientId) => {
    navigate(`/room/${patientId}`);
  };

  

    return (
        <>
        <VStack pl={150} pt={70} gap={'10px'} display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="bg" borderRadius="md" >
    <Text fontSize={'24px'} color={'black'}>Live Appointments</Text>
    <HStack gap={6}>
    {liveAppointment.length === 0 ? ( 
      <Text fontSize="sm">No live appointments</Text>
    ) : (
      liveAppointment.map((appointment) => (
        <Box key={appointment.patientId} borderRadius="sm" overflow="hidden" bg={'whiteAlpha.200'} boxShadow="md" p={4} >
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {appointment[0].startTime}</Text>
          <Text fontSize="sm">Mode: {appointment[2]}</Text>
         {appointment[2] === "online" && <Button onClick={() => consult(appointment[3])} colorScheme="teal">Consult</Button>}
     
        </Box>
      ))
    )}
    </HStack>
    
    <Text fontSize={'24px'} color={'black'}>Future Appointments</Text>
    <HStack gap={6}>
    {futureAppointment.length === 0 ? (
      <Text fontSize="sm">No future appointments</Text>
    ) : (
      futureAppointment.map((appointment) => (
        <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleString()}</Text>
         
        </Box>
      ))
    )}
    
    </HStack>
    
    
    <Text fontSize={'24px'} color={'black'}>Past Appointments</Text>
    <HStack gap={6}>
    {pastAppointment.length === 0 ? (
      <Text fontSize="sm">No past appointments</Text>
    ) : (
      pastAppointment.map((appointment) => (
        <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {appointment[0].startTime}</Text>
          <Button onClick={() => consult(appointment.patientId)} colorScheme="teal">Consult</Button>
        </Box>
      ))
    )}
    </HStack>
           
          </VStack>
        </>
      );
    };

export default PatientAppointment