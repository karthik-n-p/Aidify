import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { auth } from '../UserPages/firebase-auth';

const CreateDr = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [institutionalEmail, setInstitutionalEmail] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const toast = useToast();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

 
  const handleSubmit = async () => {
    if (!name || !specialization || !institutionalEmail || !description || !experience) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate email format
    if (!institutionalEmail.endsWith("@med.com")) {
      toast({
        title: "Error",
        description: "Please enter a valid institutional email (ending with @med.com)",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const createUserResponse = await axios.post(`http://localhost:3000/create-user/${uid}`, { email: institutionalEmail , name: name });

      if (createUserResponse.data.success) {
        // Doctor creation successful, proceed to save details in Firestore
        const doctorData = {
          name,
          institutionalEmail,
          specialization,
          description,
          experience,
          role: "doctor",
        };

        const saveDoctorResponse = await axios.post(`http://localhost:3000/save-doctor/${uid}`, doctorData);

        if (saveDoctorResponse.data.success) {
          toast({
            title: "Success",
            description: "Doctor details added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }

        // Reset form fields after successful submission
        setName("");
        setSpecialization("");
        setDescription("");
        setExperience("");
    
        
        // Set the generated password to display to the user
        setGeneratedPassword(createUserResponse.data.password);
      } else {
        toast({
          title: "Error",
          description: "Failed to create doctor",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding doctor details:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding doctor details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

  
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setInstitutionalEmail(emailValue);

    // Validate email format
    if (!emailValue.endsWith("@med.com")) {
      setEmailError("Email must end with @med.com");
    } else {
      setEmailError("");
    }
  };

  return (
    <Box pl={150} bg="#ECECEC" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Clinic Dashboard
      </Text>
      <Grid templateColumns="1fr" gap={4}>
        <FormControl w="500px">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            border={'1px solid #0059b3'}
          />
        </FormControl>
        <FormControl w="500px" >
          <FormLabel>Specialization</FormLabel>
          <Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            border={'1px solid #0059b3'}
          >
            <option value="">Select specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrician">Pediatrics</option>
            <option value="Dermatologist">Dermatology</option>
          </Select>
        </FormControl>
        <FormControl w="500px">
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            border={'1px solid #0059b3'}
          />
        </FormControl>
        <FormControl w="500px">
          <FormLabel>Experience</FormLabel>
          <Input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            border={'1px solid #0059b3'}
          />
        </FormControl>
        <FormControl w="500px">
          <FormLabel>Institutional Email</FormLabel>
          <Input
            type="email"
            value={institutionalEmail}
            onChange={e => setInstitutionalEmail(e.target.value)}
          
            border={'1px solid #0059b3'}
          />
          {emailError && (
            <Text color="red" fontSize="sm">
              * {emailError}
            </Text>
          )}
        </FormControl>
        <Button
         w={'500px'}
          colorScheme="blue"
          bg="#0080FF"
          _hover={{ bg: "#0059b3" }}
          onClick={handleSubmit}
        >
          Add Doctor
        </Button>
      </Grid>
      {generatedPassword && (
        <Text mt={4} fontWeight="bold" color={'black'}>
         
          Generated Password: {generatedPassword} <br />
          <Text color="red" fontSize="sm">
            Please note this password for future reference
          </Text>
        </Text>
      )}
    </Box>
  );
};

export default CreateDr;
