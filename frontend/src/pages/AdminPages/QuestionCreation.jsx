import React, { useRef } from 'react';
import { Box, Heading, Text, Button, Input, Flex, Grid, HStack, Textarea } from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
const CreateQuestionForm = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const questionNameRef = useRef();
  const TagsRef = useRef();
  const problemStatementRef = useRef();
  const inputFormatRef = useRef();
  const outputFormatRef = useRef();
  const constraintsRef = useRef();
  const DifficultyRef = useRef();
  const maxMarksRef = useRef();

  const handleCreate = () => {
    const questionName = questionNameRef.current.value;
    const Tags = TagsRef.current.value;
    const problemStatement = problemStatementRef.current.value;
    const inputFormat = inputFormatRef.current.value;
    const outputFormat = outputFormatRef.current.value;
    const constraints = constraintsRef.current.value;
    const Difficulty = DifficultyRef.current.value;
    const maxMarks = maxMarksRef.current.value;

    axios
      .post(`https://codespace-iaeh.onrender.com/create-question/${competitionId}`, {
        questionName,
        Tags,
        problemStatement,
        inputFormat,
        outputFormat,
        constraints,
        Difficulty,
        maxMarks,
      })
      .then((response) => {
        console.log(response);
        navigate(`/adminquestion/${competitionId}`);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex ml="150px" direction="column" gap="10px">
     <HStack spacing={10}>
           <Link to={"/adminquestion/:competitionId"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="0px"><FaArrowLeft/></Box></Link>
     <Heading fontWeight="bold" color="txtw" fontSize="4xl">
        Create Question
      </Heading></HStack>

      <Text color="grey1" fontSize={15} fontStyle="italic">
        Get started by providing the initial details needed to create a challenge.
      </Text>
      <Grid  templateColumns={{ base: '1fr', md: '1fr 5fr' }} rowGap={10} mt="30px">
        <Flex>
          <Heading  color="txtw" fontSize="2xl" fontWeight="semibold">
            Challenge Name
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={questionNameRef}
          bg="#494853" 
          borderWidth="0px"
           w={400}>
          </Textarea>

      

        {/* Problem Statement */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Problem Statement
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
      ref={problemStatementRef}
      bg="#494853"
      borderWidth="0px"
      w={400}
      h={300}
      resize="vertical"
      overflowY="auto"
    />

        {/* Input Format */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Input Format
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={inputFormatRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
        ></Textarea>

        {/* Output Format */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Output Format
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={outputFormatRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
        ></Textarea>
        
        {/* Constraints */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Constraints
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={constraintsRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
        ></Textarea>


          {/* Tags */}
          <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Topics
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={TagsRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={100}
        ></Textarea>

        {/* Difficulty */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Difficulty
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={DifficultyRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={100}
        ></Textarea>
        

        {/* Max Marks */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Max Marks
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={maxMarksRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={50}
        ></Textarea>

        {/* Buttons */}
        <HStack gap={5} mb={10}>
    
          <Button bg="btng" color="txtw" onClick={handleCreate}>
            Save
          </Button>
 
        <Link to={`/adminquestion/${competitionId}`}>
          <Button bg="gray.500" color="white" >
            Cancel
          </Button>
        </Link>


        </HStack>




     


      </Grid>
     
    </Flex>
  );
};

export default CreateQuestionForm;
