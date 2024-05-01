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
      const bookedSeatsData = ["A1", "A3", "B2", "C4"];
      setBookedSeats(bookedSeatsData);
    }, 1000);
  };

  // Fetch booked seats on component mount
  useEffect(() => {
    fetchBookedSeats();
  }, []);

  // Function to render seat grid
  const renderSeatGrid = () => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const cols = [1, 2, 3, 4, 5, 6, 7];

    return (
      <Grid templateColumns="repeat(7, 1fr)" gap={4}>
        {rows.map(row => {
          return cols.map(col => {
            const seat = `${row}${col}`;
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeat === seat;
            return (
              <Button
                key={seat}
                onClick={() => handleSeatSelection(seat)}
                bg={isBooked ? "gray.300" : isSelected ? "blue.500" : "gray.100"}
                color={isBooked ? "gray.600" : isSelected ? "white" : "gray.800"}
                disabled={isBooked}
                _hover={!isBooked && { bg: isSelected ? "blue.600" : "gray.200" }}
                cursor={isBooked ? "not-allowed" : "pointer"}
              >
                {seat}
              </Button>
            );
          });
        })}
      </Grid>
    );
  };

  return (
    <Box p={4} w="60%" ml="20%">
      <Text fontSize="xl" fontWeight="bold" mb={6}>Select Your Seat</Text>
      <Box border="1px solid #ccc" borderRadius="md" p={4}>
        {renderSeatGrid()}
      </Box>
      <Box mb={2}>
        <Text fontSize="md" fontWeight="bold">Selected Seat: {selectedSeat || "-"}</Text>
        <Text fontSize="md" fontWeight="bold">Booked Seats: {bookedSeats.join(', ')}</Text>
      </Box>
      <Button mt={4} colorScheme="blue" onClick={() => console.log("Selected seat:", selectedSeat)}>Confirm Seat</Button>
    </Box>
  );
}

export default SeatSelection;
