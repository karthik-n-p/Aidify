import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Grid,
  GridItem,
  Select,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { auth } from './firebase-auth';
import { MdInsertDriveFile } from 'react-icons/md';
import AuthContext from './AuthContext';

const PatientModule = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [drdocs, setDrdocs] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const {isdoctor} = React.useContext(AuthContext);

  const [sharedDoctors, setSharedDoctors] = useState([]);

  //if uid is null then set it to ''
  
  const uid = auth.currentUser ? auth.currentUser.uid : localStorage.getItem('uid') || '';

  // Rest of the code remains the same
  
const { username } = React.useContext(AuthContext);
  console.log("username",username); 
  console.log("uid",uid);
  useEffect(() => {
    const fetchData = () => {
      // Fetch list of doctors from the backend
      axios.get('http://localhost:3000/doctors')
        .then(response => {
          setDoctors(response.data);
          console.log("doctors",response.data);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });

        //fetch the names of doctors who have access to the patient data
        axios.get(`http://localhost:3000/shared-doctors/${username}`)
        .then(response => {
          setSharedDoctors(response.data);
          console.log("shared doctors",response.data);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });


        
  
      // Fetch shared files for doctor from the backend
      axios.get(`http://localhost:3000/shared-documents/${username}`)
        .then(response => {
          setDrdocs(response.data);
          console.log("uploaded files inside dr",response.data);
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
  
      // Fetch previously uploaded files from the backend
      axios.get(`http://localhost:3000/files/${uid}`)
        .then(response => {
          setUploadedFiles(response.data);
          console.log("uploaded files ",response.data);
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    };
  
    const fetchDataInterval = setInterval(fetchData, 2000);
  
    // Cleanup function to clear the interval
    return () => clearInterval(fetchDataInterval);
  }, [uploadedFiles]);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`http://localhost:3000/upload/${uid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      // Refresh list of uploaded files
      setUploadedFiles([...uploadedFiles, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleViewDocument = async (file) => {
    try {
      // Fetch the document content from Pinata or any other source based on the file's IPFS hash
      const response = await axios.get(`https://ipfs.io/ipfs/${file.ipfs_pin_hash}`, {
        responseType: 'blob', // Ensure response is treated as a blob (binary data)
      });
  
      // Create a blob URL for the fetched content
      const blob = new Blob([response.data]);
      const objectUrl = URL.createObjectURL(blob);
  
      // Open the blob URL in a new tab
      window.open(objectUrl, '_blank');
    } catch (error) {
      console.error('Error viewing document:', error);
    }
  };

  const handleShare = async (fileId) => {
    if (!selectedDoctor) {
      console.log('Please select a doctor');
      return;
    }
    else{
      console.log("fileId",fileId);
    }

    try {
      const response = await axios.post('http://localhost:3000/share', {
        patientname : username,
        fileId: fileId
      });
      console.log('File shared successfully:', response.data);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleRemoveShare = async (doctorName) => {
    try {
      const response = await axios.post('http://localhost:3000/remove-shared', {
        patientName : username,
        doctorName
      });
      console.log('File unshared successfully:', response.data);
    }
    catch (error) {
      console.error('Error unsharing file:', error);
    }
  }

  return (
    <Box pl={'150px'} pt='10px' bg={'bg'} height={'80vh'} width="100%" mt="0px">

      
{isdoctor ? (
        <VStack alignItems={'left'}   spacing="4" >
       
        <VStack alignItems={'left'}   gap={6}>
          {drdocs && drdocs.length > 0 ? (
            
            drdocs.map(file => (
              

              <VStack alignItems={'left'}  key={file.id} >
                 <Heading mb="10">Shared Documents {file.patientName}</Heading>
              <Grid   templateColumns={"repeat(3, 1fr)"}>
                {file.files.map(f => (
                  <Box >
                    <MdInsertDriveFile size={32} />
                    <Text key={f.id}>{f.filename}</Text>
                    <Button onClick={() => window.open(`https://ipfs.io/ipfs/${f.ipfsHash}`, '_blank')}>View</Button>
                  </Box >
                ))}
                </Grid>
              </VStack>
            ))
          ) : (
            <Text>No documents shared</Text>
          )}
        </VStack>
      </VStack>
      )


      : (

      <VStack spacing="4" align="stretch" display={{isdoctor:"none"}}>
        <Heading mb="4">Upload Medical Record</Heading>
        <Input type="file" onChange={handleFileChange} mb="2" />
        <Button onClick={handleUpload} mb="2">Upload</Button>
        <Heading mb="4">Previously Uploaded Documents</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {uploadedFiles && uploadedFiles.length > 0 ? (
  uploadedFiles.map(file => (
    <GridItem key={file.id}>
       <MdInsertDriveFile size={32} /> 
       <Text>{file.metadata && file.metadata.name}</Text> {/* Add null check */}
      <Button onClick={() => window.open(`https://ipfs.io/ipfs/${file.ipfs_pin_hash}`, '_blank')}>View</Button>

     
    </GridItem>
  ))
) : (
  <Text>No documents uploaded</Text>
)}

</Grid>
        <Heading mb="4">Share Document with Doctor</Heading>
        <Select onChange={(e) => setSelectedDoctor(e.target.value)} mb="2">
  <option value="">Select Doctor</option>
  {doctors.map(doctor => (
    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
  ))}
</Select>
        <Button onClick={() => handleShare( selectedDoctor)} mt="2">Share</Button>


        <Heading mb="4">Doctors with access</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {sharedDoctors && sharedDoctors.length > 0 ? (
  sharedDoctors.map(file => (
    <GridItem key={file.id} display={'flex'} gap={'12px'} alignItems={'center'}>
      <Text>{file.doctorName}</Text> {/* Add null check */}
      <Button onClick={() => handleRemoveShare(file.doctorName)}>Remove access</Button>
    </GridItem>
  ))
) : (
  <Text>No doctors shared</Text>
)}
</Grid>
      
      </VStack>

      )}


    </Box>


  );

};

export default PatientModule;
