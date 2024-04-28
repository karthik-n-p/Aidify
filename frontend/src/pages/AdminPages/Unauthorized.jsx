import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex,Box,CloseButton } from '@chakra-ui/react'
import React from 'react'


function Unauthorized() {
 
  return (
    <div >
      <Flex justifyContent="center" alignItems="center" h="80vh" w="100%" >
      <Box p={4}>

        <Alert status="info" mb={4}>
          <AlertIcon />
       You are not authorized to access this page.        
        </Alert>
   

  
    </Box>

      </Flex>
      
    </div>
  )
}

export default Unauthorized