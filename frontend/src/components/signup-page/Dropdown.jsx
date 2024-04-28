import React, { useContext } from 'react';
import { Box, IconButton, Text, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { auth } from '../../pages/UserPages/firebase-auth';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../pages/UserPages/AuthContext';

export default function Dropdown({handleToggleDropdown }) {
  
    const { handleSignupSuccess,afterlogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const {isRegistered} = useContext(AuthContext);
  const { username } = useContext(AuthContext); // Get username from the AuthContext

  // Logout function
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Logged out');
      
        handleSignupSuccess(null);
        handleToggleDropdown();
        afterlogout();
        // Additional logout actions if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box
        pos={'absolute'}
        top="80px"
        right="160px"
        borderRadius={'5px'}
        bg="#353440"
        w="210px"
        h="270px"
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap="5px"
        zIndex="100"
      >
        <IconButton
          icon={<FaUser size="25px" />}
          w="85px"
          h="85px"
          borderRadius="100px"
          color="btng"
          bg="#32313B"
          size="md"
        />
        <Text color="black" fontSize={'md'}>
          {username}
        </Text>
        {auth.currentUser && auth.currentUser.email && (
          <Text color="txtg" fontSize={'12px'} mb="10px">
            {isRegistered?auth.currentUser.email: ''}
          </Text>
        )}
       { isRegistered &&
       <>
        <Button w="100px" h="40px" color="black" bg="btng" onClick={() => navigate('/profile')}>
          Profile
        </Button>
      
        <Button w="100px" h="40px" color="black" bg="btng" onClick={handleLogout}>
          Log Out
        </Button>
        </>
}
      </Box>
    </div>
  );
}
