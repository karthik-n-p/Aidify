import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegCalendarPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorDashboard = () => {
  const [pendingAppointments, setPendingAppointments] = useState([
    {
      id: 1,
      timeSlot: "10:00 AM",
      patientName: "John Doe",
      reason: "Checkup",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      timeSlot: "11:00 AM",
      patientName: "Jane Smith",
      reason: "Follow-up",
      paymentStatus: "Pending",
    },
    {
      id: 3,
      timeSlot: "12:00 PM",
      patientName: "Alice Johnson",
      reason: "Consultation",
      paymentStatus: "Paid",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleReschedule = (appointmentId) => {
    console.log("Reschedule appointment with ID:", appointmentId);
  };

  const handleViewDetails = (appointmentId) => {
    console.log("View details of appointment with ID:", appointmentId);
  };

  const handleAddAppointmentSlot = () => {
    console.log("Adding new appointment slot");
  };

  const handlePrescribeMedication = (patientId) => {
    console.log("Prescribe medication for patient with ID:", patientId);
  };

  const handleAddTimeSlot = () => {
    if (selectedDate) {
      const slots = [];
      let startTime = new Date(selectedDate);
      startTime.setHours(9); // Start time: 9:00 AM
      startTime.setMinutes(0);

      for (let i = 0; i < 24; i++) {
        slots.push(new Date(startTime.getTime() + i * 30 * 60 * 1000)); // Add 30 minutes to the start time
      }
      setTimeSlots(slots);
    }
  };

  const handleSaveSlots = () => {
    console.log("Saving time slots:", timeSlots);
    // Add logic to save the time slots
  };

  return (
    <Center h="100vh">
      <Box p="6" w="80%" bg="black" color="white" borderRadius="lg">
        <Heading mb="6" textAlign="center">
          Doctor Dashboard
        </Heading>
        <Tabs isLazy>
          <TabList>
            <Tab>Pending Appointments</Tab>
            <Tab>Appointed Patients</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing="4">
                {pendingAppointments.map((appointment) => (
                  <Box
                    key={appointment.id}
                    p="4"
                    bg="gray.800"
                    boxShadow="md"
                    borderRadius="md"
                  >
                    <Text fontWeight="bold">Patient: {appointment.patientName}</Text>
                    <Text>Time Slot: {appointment.timeSlot}</Text>
                    <Text>Reason: {appointment.reason}</Text>
                    <Text>Payment Status: {appointment.paymentStatus}</Text>
                    <Button
                      colorScheme="blue"
                      mt="2"
                      onClick={() => handleViewDetails(appointment.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      colorScheme="yellow"
                      mt="2"
                      onClick={() => handleReschedule(appointment.id)}
                    >
                      Reschedule
                    </Button>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing="4">
                <Box p="4" bg="gray.800" boxShadow="md" borderRadius="md">
                  <Heading size="md">Create Appointment Slot</Heading>
                  <Box mb="4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      placeholderText="Select Date"
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                    />
                  </Box>
                  <Button
                    colorScheme="green"
                    onClick={handleAddTimeSlot}
                    disabled={!selectedDate}
                    mb="4"
                  >
                    Add Time Slots
                  </Button>
                  {timeSlots.length > 0 && (
                    <>
                      <Heading size="sm">Time Slots</Heading>
                      {timeSlots.map((slot, index) => (
                        <Text key={index}>{slot.toLocaleTimeString()}</Text>
                      ))}
                      <Button colorScheme="blue" mt="4" onClick={handleSaveSlots}>
                        Save Time Slots
                      </Button>
                    </>
                  )}
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Center mt="6">
          <Button
            colorScheme="green"
            leftIcon={<FaRegCalendarPlus />}
            onClick={handleAddAppointmentSlot}
          >
            Add Appointment Slot
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default DoctorDashboard;
