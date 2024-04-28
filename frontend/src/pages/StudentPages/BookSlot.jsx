import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, Text, Toast, VStack } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { auth } from './firebase-auth';
import AuthContext from './AuthContext';


function BookSlot() {
  const name = useParams().name;
  const [slots, setSlots] = useState([]);
  const [availiabledates, setAvailiabledates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(Date);

  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentMode, setAppointmentMode] = useState('online');

  const {  username } = React.useContext(AuthContext);
  //set user name from local storage
  const patientName = username
  console.log("d",username);

  

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-slots/${name}`);
        
        setSlots(response.data);
        console.log("response in booking slot page",response.data);
        var dates = [];
        response.data.map((slot) => {
         
          for(let i=0;i<slot.timeSlots.length;i++){
            console.log("slot",new Date(slot.timeSlots[i].startTime).toLocaleDateString());
            dates.push(new Date(slot.timeSlots[i].startTime).toLocaleDateString());
          }
        
        });
        setAvailiabledates(dates);
        
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
    console.log("response",slots);
  }, [selectedDate]);

  const handleDateChange = (date) => {

    let timeSlots = [];

    console.log("Selected date",date);
    console.log("Selected date",date.toLocaleDateString());
    setSelectedDate(date.toLocaleDateString());


    for(let i=0;i<slots.length;i++){
      const startTime = new Date(slots[i].timeSlots[0].startTime).toLocaleDateString();
      console.log("slotmms",startTime);
      if(startTime === date.toLocaleDateString()){
      for (let j = 0; j < slots[i].timeSlots.length; j++) {
        timeSlots.push(slots[i].timeSlots[j]);
        
      }

      setTimeSlots(timeSlots);

    }
  }


   



   
  
  };

  const tileDisabled = ({ date }) => {

    const dates = availiabledates.map((date) => new Date(date));
   
    return !dates.some((availableDate) =>
      date.getFullYear() === availableDate.getFullYear() &&
      date.getMonth() === availableDate.getMonth() &&
      date.getDate() === availableDate.getDate()
    );
    
  };


  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };


  const handlebooking = async () => {
    if(selectedTimeSlot === null){
      Toast({
        title: "Please select a time slot",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;

    }

    if(appointmentMode === null){
      Toast({
        title: "Please select an appointment mode",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    //console.log all the data to be sent to the backend





    const respone = await axios.post(`http://localhost:3000/book-slot`, {
      doctorName: name,
      date: selectedDate,
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime,
      mode: appointmentMode,
      patientName: patientName,

    });
    console.log(respone.data);
    if(respone.data === "success"){
      Toast({
        title: "Appointment booked successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });


    }else{
      Toast({
        title: "Error booking appointment",
        status: "error",
        duration: 2000,
        isClosable: true,
      });




    }

  






    }




  return (
    <Box bg={'bg'} pt='10px' display="flex" flexDirection={'column'} height={'80vh'} alignItems="center" justifyContent={'center'}>
      <VStack p={10} spacing={4}>
        <Text fontSize={'2xl'} fontWeight={'400'}>Book Appointment</Text>
        <Text fontSize={'1xl'} fontWeight={'200'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit exercitationem facilis, ex eveniet laudantium incidunt officiis?</Text>
        <Text fontSize={'1xl'} fontWeight={'200'}>Choose Date</Text>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileDisabled={tileDisabled}
        />
        <Text fontSize={'1xl'} fontWeight={'200'}>Available Time Slots:</Text>
        <HStack spacing={2}>
          {timeSlots.map((slot, index) => (
            console.log("slonroot",slot),
           


            <Button   
            onClick={() => handleTimeSlotSelection(slot)}
            isDisabled={!slot.availability}
            colorScheme={selectedTimeSlot === slot ? 'blue' : 'bg'}
            variant={selectedTimeSlot === slot ? 'solid' : 'outline'}
              p={5} borderRadius={'md'}
               key={index}>{new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}</Button>
          ))}
        </HStack>

        <Text fontSize={'1xl'} fontWeight={'200'}>Choose Appointment Mode:</Text>

        <HStack spacing={2}>
          <Button
            onClick={() => setAppointmentMode('online')}
            colorScheme={appointmentMode === 'online' ? 'blue' : 'bg'}
            variant={appointmentMode === 'online' ? 'solid' : 'outline'}
            p={5} borderRadius={'md'}>Online</Button>
          <Button
            onClick={() => setAppointmentMode('offline')}
            colorScheme={appointmentMode === 'offline' ? 'blue' : 'bg'}
            variant={appointmentMode === 'offline' ? 'solid' : 'outline'}
            p={5} borderRadius={'md'}>Offline</Button>
        </HStack>
        <Button  onClick={handlebooking} colorScheme={'teal'}>Book Appointment</Button>





      </VStack>
    </Box>
  );
}

export default BookSlot;
