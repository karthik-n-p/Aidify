import React, { useState } from 'react';
import { Box, Flex, Spacer, IconButton, Input, InputGroup, InputRightElement, Circle, useColorMode, Avatar, Button, HStack, Image, Heading, Text } from '@chakra-ui/react';
import { FaArrowDown, FaBell, FaChevronDown, FaSearch, FaSortDown, FaSun, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../pages/UserPages/AuthContext';
import { MdArrowDropDown, MdOutlineArrowDropDown, MdPinDrop } from 'react-icons/md';
import ProfileSection from '../signup-page/Dropdown';


const Header = () => {
  const { setIsRegistered } = useContext(AuthContext);
  const { isRegistered, username } = React.useContext(AuthContext);
  console.log("authcontext ", isRegistered);

  const location = useLocation();
  const path = location.pathname;

  const shouldRenderOtherElements = path !== '/login' && path !== '/signup'; // If path is not login or signup, render other elements

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  

  return (
    <Box pos="static" display="flex" top="0" width="100%" zIndex={20} bg={'bg'}  px={'40px'} py='20px'>
      <Flex align="center" justifyContent={'space-between'}  width="100%">
        {/* Logo */}
        <Flex w={'70px'} h={'70px'}  alignItems={'center'} justifyContent={'center'} borderRadius={'50%'}    bg={'white'}>
          <Image mb={'10px'} ml={'6px'}  src={Logo} alt="Logo" width={'50px'} />
         
        </Flex>

        <Flex ml={'20px'} borderRadius={'20px'} fontStyle={'bold'} px="4" py="2"  textAlign={'center'} border={'3px solid white'}>
          MediBlock
        </Flex>
        <Flex borderRadius={'20px'} fontStyle={'bold'} px="4" py="2"  textAlign={'center'} border={'3px solid white'}>
          We Care 
        </Flex>

        {/* Search bar */}
       
        <Spacer />

        {shouldRenderOtherElements && (
          <>
            

            <Flex alignItems="center" gap="5px"  onClick={handleToggleDropdown} cursor={'pointer'}>
              {isRegistered &&
              <IconButton
                icon={<FaUser size="25px" />}
                w="45px"
                h="45px"
                borderRadius="100px"
                color="btng"
                bg="white"
                size="md"
                mr="5px"
              
              />
}
              {isRegistered ? (
                <Flex gap="10px">
                  <Text
                    color="black"
                    fontSize="13px"
                    letterSpacing={'1px'}
                    lineHeight={"13px"}
                    fontWeight={'400'}
                    fontStyle={'normal'}
                    fontFamily={'Poppins'}
                   
                    
                  >
                    {username}
                  </Text>
                  <FaChevronDown size="15px" color="#808191" />
           
                 
                </Flex>
              ) : (
                <></>
              )}
            </Flex>

          </>
        )}
               {isRegistered ? (
              <IconButton

                icon={<FaBell size="25px" />}
                w="45px"
                h="45px"
                borderRadius="100px"
                color="btng"
                bg="white"
                size="md"
                mx={'30px'}
              />
            ) : (
              <></>
            )}
             {isDropdownOpen && <ProfileSection  handleToggleDropdown={handleToggleDropdown}/>}
          
        <Box>
          <HStack spacing={2}>
            <>
            
           

              {path !== '/login' && !isRegistered && (
                <Link to="/login">
                  <Button color="white" bg="btng" ml="30px"  >
                    Login
                  </Button>
                </Link>
              )}
                 {path !== '/signup' && !isRegistered && (
                <Link to="/signup">
                  <Button color="back" bg="white" mx="5">
                    SignUp
                  </Button>
                </Link>
              )}
            </>
           
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;