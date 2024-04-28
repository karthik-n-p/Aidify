import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Select, Text, VStack,HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from 'axios';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookSlot = (doctorName) => {
    navigate(`/bookslot/${doctorName}`);
  };

  return (
    <VStack display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="white" p={4} borderRadius="md" >
      <Box borderRadius="sm" overflow="hidden" >
        <img src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
      </Box>
      <Text fontSize={'24px'} color={'black'}>{doctor.name}</Text>
      <Text fontSize="sm">Specialist: {doctor.specialization}</Text>
      <Text fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit exercitationem facilis, ex eveniet laudantium incidunt officiis?</Text>
      <Button onClick={() => handleBookSlot(doctor.name)} colorScheme="teal">Book Meeting</Button>
    </VStack>
  );
};

const PatientCard = ({pastAppointment, futureAppointment,liveAppointment,  consult }) => {

  console.log("pastAppointment inside patient card",pastAppointment);
  console.log("futureAppointment inside patient card",futureAppointment);
  console.log("liveAppointment inside patient card",liveAppointment);



  return (
    <>
    <VStack gap={'10px'} display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="bg" p={4} borderRadius="md" >
<Text fontSize={'24px'} color={'black'}>Live Appointments</Text>
<HStack gap={6}>
{liveAppointment.length === 0 ? ( 
  <Text fontSize="sm">No live appointments</Text>
) : (
  liveAppointment.map((appointment) => (
    <Box key={appointment.patientId} borderRadius="sm" overflow="hidden" bg={'whiteAlpha.200'} boxShadow="md" p={4} >
      <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
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
    <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>
     
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
      <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>
    
    </Box>
  ))
)}
</HStack>
       
      </VStack>
    </>
  );
};





const PracQues = () => {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);
  const [patients, setPatients] = useState([]);
  const { isdoctor } = useContext(AuthContext);

  const [pastAppointments, setPastAppointments] = useState([]);
  const [presentAppointments, setPresentAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);

  useEffect(() => {
    fetchDoctors();

    if (isdoctor) {
      fetchPatients(username);
    }
  }, [isdoctor, username]);

  const fetchDoctors = async () => {
    try {
      const doctorsCollection = await axios.get('http://localhost:3000/doctors');
      setDoctorsData(doctorsCollection.data);
      console.log("doctors",doctorsCollection.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async (doctorName) => {
    try {
      const patientsCollection = await axios.get(`http://localhost:3000/past-appointments/${doctorName}`);
      //divide futrue array into 2 arrays first 4 and last 4 and combine them as array of arrays


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

  const handleConsult = (patientId) => {
    navigate(`/room/${patientId}`);
  };

  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.name.toLowerCase().includes(searchValue.toLowerCase()) &&
    (selectedDisease === "" || doctor.specialization === selectedDisease)
  );

  return (
    <Box bg={'bg'} p={4} pl={"150px"}>
      {!isdoctor ? (
        <>
          <Box mb={4}>
            <Text mb={2} fontSize="lg" fontWeight="bold">Search Doctor:</Text>
            <Input placeholder="Search doctor..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </Box>
          <Box mb={4}>
            <Text mb={2} fontSize="lg" fontWeight="bold">Filter by Disease:</Text>
            <Select placeholder="Select disease" value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
              <option value="">All</option>
              <option value="Cardiology">Cardiologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Dermatologist">Dermatologist</option>
            </Select>
          </Box>
          <HStack gap={6}>
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </HStack>
        </>
      ) : (
        <Box>
          <Text fontSize="lg" fontWeight="bold">Appoinments</Text>
        <HStack templateColumns="repeat(3, 1fr)" gap={6}>
          
          <PatientCard pastAppointment={pastAppointments} futureAppointment={futureAppointments} liveAppointment={presentAppointments} consult={handleConsult} />
          
        </HStack>
        </Box>
      )}
    </Box>
  );
};

export default PracQues;
