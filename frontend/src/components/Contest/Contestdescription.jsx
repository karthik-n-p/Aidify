import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function CompDesc(){
    return(
        <Box>
            <HStack alignItems="top" w="1230px"  height="700px" ml={280} mt="105px" >
                <Box h="695px" w="470px" bg="#353340">
                    <Text color="white" fontWeight={"bold"} fontSize={30} align="center" mt="150px">Number Mirror</Text>
                    <HStack w="550px" ml="30px" mt="30px">
                        <Text w="200px" fontSize={12} color={"#808191"}>Competition Duration</Text>
                        <Text w="230px"fontSize={12} color={"#808191"}>No. of questions</Text>
                    </HStack>
                    <HStack w="550px" ml="30px" >
                        <Text w="200px" fontSize={15} color={"#808191"}>120 minutes</Text>
                        <Text w="230px"fontSize={15} color={"#808191"}>2 questions</Text>
                    </HStack>
                    <HStack w="550px" ml="30px" mt="30px">
                        <Text w="200px" fontSize={12} color={"#808191"}>Starts at</Text>
                        <Text w="230px"fontSize={12} color={"#808191"}>Ends at</Text>
                    </HStack>
                    <HStack w="550px" ml="30px" >
                        <Text w="200px" fontSize={15} color={"#808191"}>21-May-2023 - 9:30AM</Text>
                        <Text w="230px"fontSize={15} color={"#808191"}>25-May-2023 - 4:00PM</Text>
                    </HStack>
                    <Text ml="30px" mt={190} w="200px" fontSize={15} color={"#808191"} fontWeight={"bold"}>Conducted by</Text>
                    <VStack  ml="30px" mt="20px" align={"left"}>
                        <Text fontWeight={"bold"}>Coding Committee</Text>
                        <Text fontWeight={"bold"} fontSize={12}>College Of Engineering, Thalassery</Text>
                    </VStack>
                    <HStack w="560px" mt={8} spacing={1}>
                    <Text ml="30px" w="75px"  color={"#2C5DBC"} fontSize="11px">Platform Help </Text>
                    <Text color="#808191" w="10px" fontSize={17}>|</Text>
                    <Text ml="30px" w="125px"  color={"#2C5DBC"} fontSize="11px">Execution Environment </Text>
                    <Text color="#808191" fontSize={17}>|</Text>
                    <Text ml="30px" w="200px"  color={"#2C5DBC"} fontSize="11px">FAQ</Text>
                    </HStack>
                </Box>
                <Box h="695px" w="760px" borderWidth={2}>
                    <Text fontSize={25} fontWeight={"semibold"} mt="30px" ml="25px"> Welcome!</Text>
                    <Box ml="30px" mt="30px">
                        <Image src="https://media.geeksforgeeks.org/wp-content/uploads/sevenSegmentDisplay-2.png" alt="Image description"   w="200px" borderRadius={5000}/> 
                    </Box>
                    <Text fontSize={11} mt="30px" ml="30px"> Mirror numbers are numerical sequences that appear as symmetrical or palindromic patterns, such as 11:11, 22:22, or 13:31. Many believe that repeatedly encountering these patterns is more than just a mere coincidence; instead, it is seen as a sign or message from the universe, guiding us towards a deeper understanding of ourselves and our purpose. </Text>
                    <Text fontSize={11} mt="8px" ml="30px"> Mirror numbers are numerical sequences that appear as symmetrical or palindromic patterns, such as 11:11, 22:22, or 13:31. Many believe that repeatedly encountering these patterns is more than just a mere coincidence; instead, it is seen as a sign or message from the universe, guiding us towards a deeper understanding of ourselves and our purpose. </Text>
                    <Text fontSize={18} mt="30px" ml="30px" color="#2EC866"> Prizes </Text>
                    <Box ml="30px" mt="15px">
                        <Image src="https://i.pcmag.com/imagery/articles/02Boj6tZ4b9aVICwGA9btmc-15.fit_lim.size_1600x900.v1649966738.jpg" alt="Image description"   w="200px" borderRadius={5000}/> 
                    </Box>
                    <Text fontSize={11} mt="25px" ml="30px"><b>First Prize:</b> Alienware m17 R4 Gaming Laptop</Text>
                    <Text fontSize={11}  ml="30px"><b>Second Prize:</b> Apple Airpods Max</Text>
                    <Text fontSize={11} mt="5px" ml="30px"><i>The top 20 competitors will also receive Coding Club swag.</i></Text>
                    <HStack ml="30px" mt="30px" spacing={10}>
                    <Box bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Start</Text>
                    </Box>
                    <Box bg="white" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                        <Text color="#808191" fontWeight={"bold"} paddingTop={1}>Leaderboard</Text>
                    </Box>
                    </HStack>
                </Box>
            </HStack>


        </Box>

    )
}

export default CompDesc1;