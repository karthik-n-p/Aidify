import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Textarea, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

function GrievanceStudentAdmin() {
  // Dummy data for grievance tickets (replace with actual data)

  const [grievanceTickets, setgrievanceTickets] = React.useState([{}]);

  React.useEffect(() => {
   fetchcomplaints();
 }, []);


 const fetchcomplaints = async () => {

   const res = await axios.get('https://aidify.onrender.com/grievances');
   console.log(res.data);
   setgrievanceTickets(res.data);
  
 }

  // State to manage modal for displaying ticket details
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening modal and setting selected ticket
  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Function to handle resolving the ticket
  const handleResolveTicket = () => {
    // Update ticket status to resolved
    setSelectedTicket(prevState => ({ ...prevState, resolved: true }));
    // Close the modal
    setIsModalOpen(false);
  };

  // Function to handle submitting feedback
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    console.log("feedback",e.target.elements.feedback.value);

    try{

      const res = await axios.put(`https://aidify.onrender.com/respond-grievance/${selectedTicket._id}`, {
        response: e.target.elements.feedback.value,
       
      });
      console.log(res.data);

      if (res.status === 200){
        setSelectedTicket(prevState => ({ ...prevState, feedback: e.target.elements.feedback.value }));
        setIsModalOpen(false);
      }




    
    }

    catch (error) {
      console.log(error);
    }

   
    setSelectedTicket(prevState => ({ ...prevState, feedback: e.target.elements.feedback.value }));
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="xl" mb={4}>Grievance Tickets</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User Name</Th>
            <Th>Ticket Date</Th>
            <Th>Subject</Th>
            <Th>Resolved</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {grievanceTickets.map(ticket => (
            <Tr key={ticket.id}>
              {console.log("user  ",ticket.username)}
              <Td>{ticket.username}</Td>
              <Td>{ticket.Date}</Td>
              <Td>{ticket.Subject}</Td>
              <Td>{ticket.status}</Td>
              {ticket.status === 'pending' ? (
              <Td>
                <Button colorScheme="blue" onClick={() => handleViewDetails(ticket)}>Resolve</Button>
              </Td>
              ) : (
                <Td>
                <Button colorScheme="blue" onClick={() => handleViewDetails(ticket)}>View Details</Button>
              </Td>
          
              )}
            </Tr>
         

          ))}
        </Tbody>
      </Table>
      {/* Modal for displaying ticket details */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ticket Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTicket && (
              <>
                <Text mb={2}>User Name: {selectedTicket.username}</Text>
                <Text mb={2}>Ticket Date: {selectedTicket.Date}</Text>
                <Text mb={2}>Subject: {selectedTicket.Subject}</Text>
                <Text mb={2}>Resolved: {selectedTicket.status}</Text>
                <Text mb={4}>Description: {selectedTicket.description}</Text>
                <Heading size="md" mb={2}>Attachments</Heading>
                {selectedTicket.attachments.map((attachment, index) => (
    <Box key={index} mb={2}>
    <Text>{attachment.filename}</Text>
    <Button as="a"
      href={`https://aidify.onrender.com/uploads/${attachment.filename}`}
      target="_blank"
      download
      colorScheme="blue"
      size="sm"
      mt={2}
    >
      Download
    </Button>
  </Box>
))}

                <form onSubmit={handleFeedbackSubmit}>
                  {selectedTicket.status === 'pending' && (
                    <>
                  <FormControl mb={4}>
                    <FormLabel>Feedback</FormLabel>
                    <Textarea name="feedback" />
                  </FormControl>
                  
                  <Button type="submit" colorScheme="green" mr={2}>Resolve Ticket</Button>
                  </>
                  )}
                
                </form>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default GrievanceStudentAdmin;
  