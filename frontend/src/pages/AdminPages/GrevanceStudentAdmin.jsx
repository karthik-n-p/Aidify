import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Textarea, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

function GrievanceStudentAdmin() {
  // Dummy data for grievance tickets (replace with actual data)
  const grievanceTickets = [
    { id: 1, userName: 'John Doe', ticketDate: '2024-04-20', subject: 'Issue with billing', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', attachments: ['attachment1.jpg', 'attachment2.pdf'], feedback: '', resolved: true },
    { id: 2, userName: 'Jane Smith', ticketDate: '2024-04-25', subject: 'Problem with service', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', attachments: ['attachment3.png'], feedback: '', resolved: false },
  ];

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
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Update ticket feedback
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
              <Td>{ticket.userName}</Td>
              <Td>{ticket.ticketDate}</Td>
              <Td>{ticket.subject}</Td>
              <Td>{ticket.resolved ? 'Resolved' : 'Not Resolved'}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleViewDetails(ticket)}>View Details</Button>
              </Td>
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
                <Text mb={2}>User Name: {selectedTicket.userName}</Text>
                <Text mb={2}>Ticket Date: {selectedTicket.ticketDate}</Text>
                <Text mb={2}>Subject: {selectedTicket.subject}</Text>
                <Text mb={2}>Resolved: {selectedTicket.resolved ? 'Yes' : 'No'}</Text>
                <Text mb={4}>Description: {selectedTicket.description}</Text>
                <Heading size="md" mb={2}>Attachments</Heading>
                {selectedTicket.attachments.map((attachment, index) => (
                  <Box key={index} mb={2}>
                    <a href={`/${attachment}`} target="_blank" rel="noopener noreferrer">{attachment}</a>
                  </Box>
                ))}
                <form onSubmit={handleFeedbackSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>Feedback</FormLabel>
                    <Textarea name="feedback" />
                  </FormControl>
                  <Button type="submit" colorScheme="blue" mr={2}>Submit Feedback</Button>
                  {!selectedTicket.resolved && (
                    <Button colorScheme="green" onClick={handleResolveTicket}>Resolve Ticket</Button>
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
  