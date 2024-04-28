import React from 'react'
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react'

import { Link } from 'react-router-dom';

function GrievanceStudent() {
    const earlierSubmissions = [
        { id: 1, status: 'Resolved', ticketDate: '2024-04-20', ticketType: 'Complaint', subject: 'Issue with billing' },
        { id: 2, status: 'Not Resolved', ticketDate: '2024-04-25', ticketType: 'Issue', subject: 'Problem with service' },
      ];
    
      return (
        <Box p={8} width="80%" ml="10%" >
          <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
            <Heading as="h2" size="xl">Earlier Submissions</Heading>
            <Button as={Link} to="/create-ticket/null" colorScheme="blue">Create New Ticket</Button>
          </Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Ticket Date</Th>
                <Th>Ticket Type</Th>
                <Th>Subject</Th>
              </Tr>
            </Thead>
            <Tbody>
              {earlierSubmissions.map(submission => (
                <Tr key={submission.id}>
                  <Td>{submission.status}</Td>
                  <Td>{submission.ticketDate}</Td>
                  <Td>{submission.ticketType}</Td>
                  <Td>{submission.subject}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      );
}

export default GrievanceStudent
