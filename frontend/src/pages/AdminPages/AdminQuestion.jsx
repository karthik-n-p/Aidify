import React, { useEffect } from "react";
import { FaArrowLeft, FaBars, FaEdit, FaInfoCircle, FaSearch, FaTrash } from "react-icons/fa";
import { Box, Divider, HStack, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Icon, Flex, Collapse, useOutsideClick } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";





const MenuBar3 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useOutsideClick({
    ref: menuRef,
    handler: handleCloseMenu,
  });

    



return (
  <Flex align="center" ml="25px">
    <Icon
      as={FaInfoCircle}
      boxSize={6}
      cursor="pointer"
      onClick={handleMenuToggle}
    />
    <Collapse in={isMenuOpen} animateOpacity>
      <Box borderWidth={"2px"} borderRadius={5} borderColor={"white"}
        bg="#808191"
        p={4}
        position="absolute"
        top="auto"  // Set top to "auto" to let the box position itself naturally below the icon
        bottom="auto"  // Position the box at the bottom
        right={0}
        zIndex={10}
      >
        {/* Menu content goes here */}
        
        <Text>This is the set of Question in this Competition</Text>
        
      </Box>
    </Collapse>
  </Flex>
);
}

  
  const MenuBar2 = ({questionId}) => {
    const { competitionId } = useParams();

    console.log("Menubar2 question Id",questionId);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef();


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };


  
  const navigate = useNavigate();


  const handleDelete = () => {
  
    axios
    .delete(`https://codespace-iaeh.onrender.com/delete-question/${competitionId}/${questionId}`)
    .then((response) => {
      console.log("response.data", response.data);
    }
    )
    .catch((error) => {
      console.log(error);
    });
   
    setIsMenuOpen(!isMenuOpen);
  }



    const handleEdit = () => {
        navigate(`/editques/${competitionId}/${questionId}`)
        setIsMenuOpen(!isMenuOpen);
    
    };
  
    
      return (
        <Flex align="center" ml="25px">
        <Icon
          as={FaBars}
          boxSize={6}
          cursor="pointer"
          onClick={handleMenuToggle}
        />
        <Collapse in={isMenuOpen} animateOpacity>
          <Box borderWidth={1}
            bg="#353340"
            p={4}
            position="absolute"
            top="auto"  // Set top to "auto" to let the box position itself naturally below the icon
            bottom="auto"  // Position the box at the bottom
            right={0}
            zIndex={10}
          >
            {/* Menu content goes here */}
            <p cursor="pointer" onClick={handleEdit} >Edit</p>
                      <Divider borderColor={"#808191"} width={50}/>
            <p cursor="pointer" onClick={handleDelete} >Delete</p>
            
          </Box>
        </Collapse>
      </Flex>
      );
    }
  
  function Adminquestion(){
    const [questions, setQuestions] = useState([]);
    const { competitionId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`https://codespace-iaeh.onrender.com/get-questions/${competitionId}`)
        .then((response) => {
          setQuestions(response.data.questionsList);
          console.log(response.data.questionsList);
          // setQuestions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const CreatequestionNavigation = () => {
     
      navigate(`/createques/${competitionId}`);
    
    }

  




      return(
          <div>
            <HStack spacing={10}>
           <Link to={"/admincompetition"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="175px"><FaArrowLeft/></Box></Link>
             <Text fontWeight={"semibold"} fontSize={30} color={"white"} ml="280px"> Competitions</Text></HStack>
           <Box w="1200px" h="60px" mt="20px" bg="#353340" ml="280px" borderWidth={2}>
            <HStack w="1200px" pt="8px" spacing={10} ml="20px">
                <HStack w="600px" mb={2}>
                 
                <Box bg="#1A202C" borderWidth={2} w="250px" h="40px" pt="8px" mt="10px" align="center" borderBottom={"none"}>
                    <Text fontWeight={"semibold"}>Manage Questions</Text>
                    
                </Box>
                </HStack>
                <HStack w="600px" justify={"flex-end"}>
                
                <InputGroup w="300px" mb={5}>
            <Input  display="flex"  placeholder="Search Questions" width="240px" ml="10px" h="30px"  mt="0px" bg="#1A202C" borderWidth="2px"  />
            <InputLeftElement ml="10px" pb={3}>
            <FaSearch color="grey" />
            </InputLeftElement>
        </InputGroup>
        </HStack>
            </HStack>
            <HStack w="1200px" spacing="580px" mt="20px">
            <Text fontWeight={"semibold"} fontSize={22} mt="10px" w="380px" >All Questions</Text>
 
            <Box bg="#2EC866" w="220px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"} onClick={CreatequestionNavigation}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Create Question</Text>
                        </Box>
            
            </HStack>

            <Box id="0" w="1200" h="50px" mt="10px">
                <HStack w="1200">
                    <Box bg="#808191" w="270px" h="50px" borderWidth={2} align="center">
                    <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">Question Name</Text>
                    </Box>
                    <Box bg="#808191" w="270px" h="50px" borderWidth={2} align="center">
                    <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">Difficulty</Text>
                    </Box>
                    <Box bg="#808191" w="270px" h="50px" borderWidth={2} align="center">
                    <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">Max Marks</Text>
                    </Box>
                    <Box bg="#808191" w="270px" h="50px" borderWidth={2} align="center">
                    <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">Topic</Text>
                    </Box>
                    <Box bg="#808191" w="70px" h="50px" borderWidth={2} align="center" paddingTop={3}>
                        <MenuBar3/>
    
    
    
                    </Box>
                </HStack>
            </Box>


            {/* question list */}

            {questions.map((question) => (
              <Box key={question.questionId} w="1200" h="50px" mt="3px">
              <HStack w="1200">
                  <Box bg="#353340" w="270px" h="50px" borderWidth={2} align="center">
                  <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">{question.questionName}</Text>
                  </Box>
                  <Box bg="#353340" w="270px" h="50px" borderWidth={2} align="center">
                  <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">{question.Difficulty}</Text>
                  </Box>
                  <Box bg="#353340" w="270px" h="50px" borderWidth={2} align="center">
                  <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">{question.maxMarks}</Text>
                  </Box>
                  <Box bg="#353340" w="270px" h="50px" borderWidth={2} align="center">
                  <Text fontWeight={"semibold"} fontSize={18} mt="10px" w="270px">{question.Tags}</Text>
                  </Box>
                  <Box bg="#353340" w="70px" h="50px" borderWidth={2} align="center" paddingTop={3}>
                      <MenuBar2 questionId={question.questionId}/>
                 

                  </Box>
              </HStack>
          </Box>
            ))}

           </Box>
                




            </div>
    )
}

export default Adminquestion;