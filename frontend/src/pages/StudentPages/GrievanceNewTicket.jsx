import { Box, Heading, Text, Input, Textarea, Button, Select, Alert, AlertIcon } from '@chakra-ui/react'
import axios from 'axios';


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function GrievanceNewTicket() {
  const [ticketType, setTicketType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); 
  const [submitted, setSubmitted] = useState(false);
  const [submissionDateTime, setSubmissionDateTime] = useState('');
  const username  = localStorage.getItem('username');
  const [anonymous, setAnonymous] = useState(false);
  const Navigate = useNavigate();
  
  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleDateString();
    setSubmissionDateTime(currentDateTime);
  
    console.log('Ticket Type:', ticketType);
    console.log('Subject:', subject);
    console.log('Description:', description);
    console.log('Attachment:', file);
    console.log('Submission Date and Time:', currentDateTime);
  
    try {
      const formData = new FormData();
      formData.append('type', ticketType);
      formData.append('Subject', subject);
      formData.append('description', description);
      formData.append('Date', currentDateTime);
      formData.append('username', username);
      formData.append('attachments', file); // Make sure 'file' is a File object
  
      const response = await axios.post('http://localhost:3000/save-grievance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response);
  
      if (response.status === 200) {
        setSubmitted(true);
        Navigate(-1);
      }
    } catch (error) {
      setSubmitted(false);
      console.error('Error:', error);
    }
  
    setTicketType('');
    setSubject('');
    setDescription('');
    setSubmissionDateTime('');
    setFile(null);
  
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  }
  return (
    <Box p={8} maxWidth="550px" mx="auto">
      <Heading as="h2" size="xl" mb={6}>Create Your Grievance Ticket</Heading>
      <Box mb={4}>
        <Text mb={2}>Ticket Type</Text>
        <Select placeholder="Select ticket type" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
          <option value="issue">Issue</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
          <option value="other">Other</option>
        </Select>
      </Box>
      <Box mb={4}>
        <Text mb={2}>Subject</Text>
        <Input placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </Box>
      <Box mb={4}>
        <Text mb={2}>Description</Text>
        <Textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Box>
      <Box mb={4}>
        <Text mb={2}>Attachment</Text>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </Box>
      {/* <input type='checkbox'  onChange={(e) => setAnonymous(e.target.checked)} /> */}
      <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
      <Button colorScheme="red" ml={4} onClick={() => Navigate(-1)}>Cancel</Button>
      {submitted && (
        <Alert status='success' variant='top-accent' mt={4}>
          <AlertIcon />
          Your Grievance Ticket has been sent to the Authorities
        </Alert>
        )}
    </Box>
  )
}

export default GrievanceNewTicket
