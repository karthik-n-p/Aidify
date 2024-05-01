import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';

function SeatSelection() {
  // State to store selected seat
  const [selectedSeat, setSelectedSeat] = useState(null);
  // State to store booked seats (dummy data for demonstration)
  const [bookedSeats, setBookedSeats] = useState([]);

  // Function to handle seat selection
  const handleSeatSelection = (seat) => {
    // Check if the seat is available
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
    } else {
      // Seat is already booked, so show a message or handle accordingly
      alert("This seat is already booked. Please select another seat.");
    }
  };

  // Dummy function to simulate fetching booked seats from server
  const fetchBookedSeats = () => {
    // Simulating API call delay
    setTimeout(() => {
      // Dummy data for booked seats
      const bookedSeatsData = ["1"];
      setBookedSeats(bookedSeatsData);
    }, 1000);
  };

  // Fetch booked seats on component mount
  useEffect(() => {
    fetchBookedSeats();
  }, []);

  // Function to render seat grid
  const renderSeatGrid = () => {

    const totalRows = 5;
    const totalColumns = 10;
    const totalSeats = totalRows * totalColumns;
    const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

    return (
      <Grid templateColumns={`repeat(${totalColumns}, 1fr)`} gap={1}>
        {seats.map(seatNumber => (
          <Button
            key={seatNumber}
            onClick={() => handleSeatSelection(seatNumber.toString())}
            width="20px"
            bg={bookedSeats.includes(seatNumber.toString()) ? "gray.300" : selectedSeat === seatNumber.toString() ? "blue.500" : "gray.100"}
            color={bookedSeats.includes(seatNumber.toString()) ? "gray.600" : selectedSeat === seatNumber.toString() ? "white" : "gray.800"}
            disabled={bookedSeats.includes(seatNumber.toString())}
            _hover={!bookedSeats.includes(seatNumber.toString()) && { bg: selectedSeat === seatNumber.toString() ? "blue.600" : "gray.200" }}
            cursor={bookedSeats.includes(seatNumber.toString()) ? "not-allowed" : "pointer"}
          >
            {seatNumber}
          </Button>
        ))}
      </Grid>
    );
  };

  return (
    <Box p={4} w="60%" ml="20%">
      <Text fontSize="xl" fontWeight="bold" mb={6}>Select Your Seat</Text>
      <Box border="1px solid #ccc" borderRadius="md" p={4}>
        {renderSeatGrid()}
      </Box>
      <Box mb={2} mt={4}>
        <Text fontSize="md" fontWeight="bold">Selected Seat No: {selectedSeat || "-"}</Text>
      </Box>
      <Button mt={4} colorScheme="blue" onClick={() => console.log("Selected seat:", selectedSeat)}>Confirm Seat</Button>
    </Box>
  );
}

export default SeatSelection;
