import React from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import {  MdFeedback,  MdAdd, MdStoreMallDirectory, MdStore, MdBusAlert, } from 'react-icons/md';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../pages/StudentPages/AuthContext';


import { MdCall } from 'react-icons/md';


import { FaBus, FaHeartbeat } from 'react-icons/fa';



const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedIcon, setHighlightedIcon] = useState('home');
  const { isRegistered } = React.useContext(AuthContext);
  const {isadmin} = useContext(AuthContext);
  const {isdoctor ,username} = useContext(AuthContext);

  console.log("isadmin in sidebar",isadmin);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleIconClick = (iconName) => {
    setHighlightedIcon(iconName);
  };
  
  return (
    <Box ml={'55px'} position={'relative'}   pos={'fixed'} display={isRegistered || isadmin ?'flex':'none'}  flexDirection={'column'}  top="0"  width={isExpanded ? '260px' : '20px'} height="120vh" zIndex={100000} alignItems={'center'} justifyContent={'center'} >
     

      <VStack display={'flex'} spacing="20px" alignItems={isExpanded ? 'left' : 'center'}  borderRadius={'20px'}   bg="white" flexDirection={'column'}  top="0"  width={isExpanded ? '260px' : '25px'}  zIndex={100000} justifyContent={'space-between'}>

      {!isadmin && 
      <Link to={'/store'}>
        <HStack alignSelf={'flex-start'} spacing="20px" onClick={() => handleIconClick("home")}>
          <Box width="60px" height="60px" borderRadius="40px" border='5px solid white'  display="flex" justifyContent="center" alignItems="center" name='home'  bg={highlightedIcon === "home" ? "btng" : "bg"} >
            <MdStore  color={highlightedIcon === "home" ? "white" : "black"}   size="30px" />   
          </Box>
        
         
        
        </HStack>
        </Link>
      }
        
       
        <Link to={isadmin?'/busManagement' :'/appointment'}>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Practice")}>
          <Box  width="60px" height="60px" borderRadius="40px" border='5px solid white'  display="flex" justifyContent="center" alignItems="center"  name='home'  bg={highlightedIcon === "Practice" ? "btng" : "bg"} >
            {isadmin? <FaBus  color={highlightedIcon === "Practice" ? "white" : "black"} size="30px" /> : <FaBus color={highlightedIcon === "Practice" ? "white" : "black"} size="30px" />}
         
          </Box>
        
        </HStack>
        </Link>
        
       
     

       
       
        <Link to={isadmin?'/complaintAdmin' :`/complaint/${username}`}>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Resources")}>
          <Box  width="60px" height="60px" borderRadius="40px" border='5px solid white'  name='Resources'  bg={highlightedIcon === "Resources" ? "btng" : "bg"}   display="flex" justifyContent="center" alignItems="center">
            <MdFeedback color={highlightedIcon === "Resources" ? "white" : "black"} size="30px" />
          </Box>
        
        </HStack>
        </Link>
   
       
      </VStack>
      
       
    </Box>


  );
};

export default Sidebar;
