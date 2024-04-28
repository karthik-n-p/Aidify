import { Box, Divider, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaArrowRight } from "react-icons/fa";

const PracQues = () => {
    return (
        <HStack alignItems="top" justify={"center"} w="1060px" height="300px" ml="165px">
        <div>
        <Text fontSize={20} fontWeight={"normal"} mt="110px" ml="175px">Topics</Text>
       <Box pos={'flex'} mt="20px" ml="175px" bg="#1D1E23" boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.25)" width="260px" height="36.5em" zIndex={200000} >
       <InputGroup>
            <Input  display="flex"  placeholder="Search Problems" width="240px" ml="10px" h="25px"  mt="10px" bg="#1D1E23" borderWidth="2px"  />
            <InputLeftElement ml="5px">
            <FaSearch color="grey"/>
            </InputLeftElement>
        </InputGroup>
        <Text mt="10px" fontSize={22} ml="20px" fontWeight={"semibold"}> Select Topic</Text>
        <RadioGroup >
        <Stack direction="column" spacing={3} mt="15px" ml="10px">
            <Radio value="option1">Basic Programming</Radio>
            <Radio value="option2">Arrays</Radio>
            <Radio value="option3">Strings</Radio>
            <Radio value="option4">Math</Radio>
            <Radio value="option5">Sorting</Radio>
            <Radio value="option6">Binary Search</Radio>
            <Radio value="option7">Data Structures</Radio>
            <Radio value="option8">Greedy Algorithms</Radio>
            <Radio value="option9">Dynamic Programming</Radio>
            <Radio value="option10">Graphs</Radio>
            <Radio value="option11">Segment Trees</Radio>
            </Stack>       
         </RadioGroup>

        </Box> 
       </div>
       <div>
        <Box bg="#47CF73" w="850px"  h="45px" align="center" mt="110px" >
            <HStack spacing={20} w="805px" paddingTop={1} paddingLeft={3} h="45px">
                <Text fontSize={16} ml="10px"> Topic</Text>
                <Text  fontSize={16} ml="10px"> Name</Text>
                <Text  fontSize={16} ml="10px"> Submission</Text>
                <Text  mr={2} >Difficulty<ChevronDownIcon /></Text>
                <Text  fontSize={16} ml="10px"> Avg Time</Text>
            </HStack>
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3} h="45px" >
                <Text fontSize={15} ml="10px" w="20px"> 01</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingLeft={0} w="200px" >Number Mirror</Text>
                <Text  fontSize={15} ml="px" paddingLeft={0} w="200px"> 383056</Text>
                <Text  mr={2} w="200px">Easy</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 10 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 02</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" w="200px"> Good Turn</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 83477</Text>
                <Text  mr={2} w="200px">Easy</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 15 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 03</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px">Add Two Numbers</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 626663</Text>
                <Text  mr={2} w="200px">Easy</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 15 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 04</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px"> Age Limit</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 137116</Text>
                <Text  mr={2} w="200px">Easy</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 02 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3} h="45px" >
                <Text fontSize={15} ml="10px" w="20px"> 05</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingLeft={0} w="200px" >Squats</Text>
                <Text  fontSize={15} ml="px" paddingLeft={0} w="200px"> 94164</Text>
                <Text  mr={2} w="200px">Medium</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px">02 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 06</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" w="200px"> Saving Taxes</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 66576</Text>
                <Text  mr={2} w="200px">Medium</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 02 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 07</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px">Water Consumption</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 88242</Text>
                <Text  mr={2} w="200px">Medium</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 02 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 08</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px"> Masterchef finals
New</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 24151</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 62 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3} h="45px" >
                <Text fontSize={15} ml="10px" w="20px"> 09</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingLeft={0} w="200px" >Biryani classes</Text>
                <Text  fontSize={15} ml="px" paddingLeft={0} w="200px"> 113502</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 48 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px"size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 10</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" w="200px"> Fitness</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 110473</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 55 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 11</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px">Chef Plays Ludo</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 61465</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 38 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 12</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px"> Boundary Marker</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 179486</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 82 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" >
            <HStack spacing={90} w="805px" paddingTop={1} paddingLeft={3}  h="45px">
                <Text fontSize={15} ml="10px" w="20px"> 13</Text>
                <Text  fontSize={12} ml="10px" color="#5780B0" paddingRight={0} w="200px"> Turtle Catching</Text>
                <Text  fontSize={15} ml="10px" paddingRight={0} w="200px"> 246116</Text>
                <Text  mr={2} w="200px">Hard</Text>
                <Text  fontSize={15} ml="10px" paddingLeft={0} w="50px"> 71 Mins</Text>
                <FaArrowRight color="#5780B0" ml="15px" size={22}/>
            </HStack>
            <Divider />
        </Box>
        <Box bg="#1D1E23" w="850px"  h="45px" align="justify" mt="0px" display="flex">
            <HStack w="550px" ml="300px">
                <Text fontSize={12} color={"grey"} w="105px" >Jump to Page:</Text>
                <Select placeholder="01" w="50px"  display={"flex"} color={"grey"} size={12}>
            <option value="option1">02</option>
            <option value="option2">03</option>
            <option value="option3">04</option>
            </Select>
            <Text fontSize={12} color={"grey"} w="110px" paddingLeft={3} >Rows per page:</Text>
            <Select placeholder="13" w="50px"  display={"flex"} color={"grey"} size={12}>
            <option value="option1">12</option>
            <option value="option2">11</option>
            <option value="option3">10</option>
            </Select>
            <Text fontSize={12} color={"grey"} w="105px" paddingLeft={5} >01-13 of 100</Text>
            <Box w="40px" ><ChevronLeftIcon size="50px"/></Box>
            <Box w="40px" ><ChevronRightIcon size="50px"/></Box>
            </HStack>
            
        </Box>
        <Divider />
       </div>
       </HStack>
        );
};



export default PracQues