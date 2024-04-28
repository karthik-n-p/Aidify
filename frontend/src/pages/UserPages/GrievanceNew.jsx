import { Box, Heading, Text, Input, Textarea, Button, Select, Alert, AlertIcon } from '@chakra-ui/react'

import React, { useState } from 'react'

function GrievanceNew() {
  const [ticketType, setTicketType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); 
  const [submitted, setSubmitted] = useState(false);
  const [submissionDateTime, setSubmissionDateTime] = useState('');
  
  const handleSubmit = () => {

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

    console.log('Ticket Type:', ticketType);
    console.log('Subject:', subject);
    console.log('Description:', description);
    console.log('Attachment:', file);
    console.log('Submission Date and Time:', formattedDateTime);
    

    setTicketType('');
    setSubject('');
    setDescription('');
    setSubmitted(true);
    setSubmissionDateTime(formattedDateTime);
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
      <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
      {submitted && (
        <Alert status='success' variant='top-accent' mt={4}>
          <AlertIcon />
          Your Grievance Ticket has been sent to the Authorities
        </Alert>
        )}
    </Box>
  )
}

export default GrievanceNew
