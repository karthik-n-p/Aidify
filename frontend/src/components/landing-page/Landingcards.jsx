import React from 'react';
import { Box, Flex, Heading, Text, Button, Grid,Image } from '@chakra-ui/react';
import {Link} from 'react-router-dom'

//import all images from assets folder
import Grievance from '../../../assets/grievance.png';
import Collegebus from '../../../assets/collegebus.png';
import Marketplace from '../../../assets/marketplace.png';


function Landingcards() {
  return (
    <Flex align={'center'} justifyContent={'center'}>
    {/* Left Section */}
    <Box flex="1" p="4" ml="15%" marginTop={'10%'}>
      <Heading 
       as="h1"
       size="xl"
       mb="4"
       style={{
         fontSize: '17px',
         fontWeight: 500,
         textTransform: 'uppercase',
         paddingLeft: '10px',
         color: '#4582ff',
         fontFamily: '"Rubik", sans-serif',
         position: 'relative',
         marginBottom: '33px',
         zIndex: 2
       }}
      >WELCOME TO AIDIFY</Heading>
      <Heading as="h2" size="2xl" mb="3"  style={{fontFamily: '"Montserrat", sans-serif', color: 'black'}}>One Stop Platform for</Heading>
      <Heading as="h2" size="2xl" mb="8"  style={{fontFamily: '"Montserrat", sans-serif', color: 'black'}}>College Routines!</Heading>
      <Text fontSize="l" color="grey">
      Our website helps college students to deal with every college related matter with extra ease.
      </Text>
      <Link to="/login">
          <Button variant="solid" borderRadius="full" size="lg" colorScheme="blue" mt="8">
            Get Started
          </Button>
        </Link>
    </Box>

    {/* Right Section (Image) */}
    <Box flex="1" p="4" mt="-40px">
    <Flex>
      {/* <img src="./assets/grievance.png" alt="Image 1" style={{ width: '100%', height: 'auto', maxWidth: '230px', marginLeft: "18%" }} /> */}
      <Image src={Grievance} alt="Image 1" style={{ width: '100%', height: 'auto', maxWidth: '230px', marginLeft: "18%" }} />
      </Flex>
      <Flex flexDirection="row">
        {/* <img src="./assets/collegebus.png" alt="Image 2" style={{ width: '100%', height: 'auto', maxWidth: '200px' }} />
        <img src="./assets/marketplace.png" alt="Image 3" style={{ width: '100%', marginLeft: '30px' , height: 'auto', maxWidth: '200px' }} /> */}
        <Image src={Collegebus} alt="Image 2" style={{ width: '100%', height: 'auto', maxWidth: '200px' }} />
        <Image src={Marketplace} alt="Image 3" style={{ width: '100%', marginLeft: '30px' , height: 'auto', maxWidth: '200px' }} />
      </Flex>
    
      </Box>
  </Flex>
  );
}

export default Landingcards;
