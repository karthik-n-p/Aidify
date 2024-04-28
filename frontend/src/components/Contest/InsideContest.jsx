import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaEnvelope, FaInbox, FaList, FaMedal } from "react-icons/fa";

function CompQues(){
    return(
        <Box>
           <Divider mt="100px" color="#808191" borderWidth={1.5}/>
           <Text fontWeight={"semibold"} fontSize={30} color={"white"} ml={280}>Number Mirror</Text>
           <Divider mt="13px" color="#808191" borderWidth={1.5}/>
           <HStack alignItems="top" w="1060px"  height="700px" ml={280} mt="35px" spacing="60px">
                <div w="800px">
                <Text fontWeight={"semibold"} fontSize={20} color={"white"}  w="700px">Questions</Text>
                <Box  h="120px" w="700px" mt="10px" borderRadius={10} borderWidth={2} >
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#2EC866"}  pl="15px" fontSize={22} w="500px">Test Mirror</Text>
                        <div w="195px">
                            <HStack spacing={5} align={"center"} pl={10}>
                            <FaEnvelope color="#808191"/><FaMedal color="#808191"/><FaList color="#808191"/>
                            </HStack>
                        </div>
                        </HStack>
                        <Box bg="#2EC866" w="140px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"} ml="525px">
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Solve Question</Text>
                        </Box>
                        <HStack w="600px" ml="20px" mt="10px" spacing={10}>
                            <Text color="#808191" fontSize={13}>Success Rate : 0.00%</Text>
                            <Text color="#808191" fontSize={13}>Max Score : 20</Text>
                            <Text color="#808191" fontSize={13}>Difficulty : Easy</Text>

                        </HStack>

        
                </Box>
                <Box  h="120px" w="700px" mt="10px" borderRadius={10} borderWidth={2} >
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#2EC866"}  pl="15px" fontSize={22} w="500px">Second Mirror</Text>
                        <div w="195px">
                            <HStack spacing={5} align={"center"} pl={10}>
                            <FaEnvelope color="#808191"/><FaMedal color="#808191"/><FaList color="#808191"/>
                            </HStack>
                        </div>
                        </HStack>
                        <Box bg="#2EC866" w="140px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"} ml="525px">
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Solve Question</Text>
                        </Box>
                        <HStack w="600px" ml="20px" mt="10px" spacing={10}>
                            <Text color="#808191" fontSize={13}>Success Rate : 0.00%</Text>
                            <Text color="#808191" fontSize={13}>Max Score : 40</Text>
                            <Text color="#808191" fontSize={13}>Difficulty : Medium</Text>

                        </HStack>

        
                </Box>

                </div>
                <div>
                <Text fontWeight={"semibold"} fontSize={20} color={"white"}  w="360px">Current Rank : N/A</Text>
                <HStack mt="20px" spacing={10} w="300px">
                <FaMedal color="#808191" w="59px"/>
                <Text color={"#2C5DBC"} fontWeight={"semibold"} w="301px"> Current Leaderboard</Text>
                </HStack>
                <HStack mt="20px"  w="300px">
                <Text color="#808191" fontWeight={"bold"} w="59px">V/S</Text>
                <Text color={"#2C5DBC"} fontWeight={"semibold"} w="301px"> Compare Progress</Text>
                </HStack>
                <HStack mt="20px" spacing={10} w="300px">
                <FaList color="#808191" w="59px"/>
                <Text color={"#2C5DBC"} fontWeight={"semibold"} w="301px"> Review Submissions</Text>
                </HStack>
                </div>
            </HStack>

        
        </Box> 
        
    )

    
}

export default CompQues;