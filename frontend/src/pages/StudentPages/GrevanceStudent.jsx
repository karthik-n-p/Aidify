import React from 'react'
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react'

import { Link } from 'react-router-dom';
import axios from 'axios';

function GrievanceStudent() {

  const [earlierSubmissions, setEarlierSubmissions] = React.useState([{}]);

     React.useEffect(() => {
      fetchcomplaints();
    }, []);


    const fetchcomplaints = async () => {

      const res = await axios.get('http://localhost:3000/grievances');
      console.log(res.data);
      setEarlierSubmissions(res.data);
    }






   
    
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
                  <Td>{submission.Date}</Td>
                  <Td>{submission.type}</Td>
                  <Td>{submission.Subject}</Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      );
}

export default GrievanceStudent
